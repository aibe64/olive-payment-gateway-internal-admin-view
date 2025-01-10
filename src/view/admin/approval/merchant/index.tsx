/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Response } from "../../../../models/client/apiResponse";
import { Request } from "../../../../models/client/apiRequest";
import apiConfig from "../../../../service/apiConfig";
import { GET, POST } from "../../../../service/apiService";
import DateTime from "../../../../shared/functions/DateTime";
import MerchantFilterTabs from "../../merchants/components/merchantFilterTabs";
import { DataTable } from "../../../../shared/components/datatable";
import { DataTableUtil } from "../../../../shared/functions/dataTableUtil";
import SearchDatatable from "../../../../shared/functions/searchDatatable";
import { Button, Tooltip } from "antd";
import MerchantDetailsPage from "./components/merchantModal";
import AlertModal from "../../../../shared/components/alertModal";
import { Props } from "../../../../models/application/props";
import { PagePermission } from "../../../../shared/functions/pagePermission";
import UnAuthorizePage from "../../../../shared/components/unAuthorizePage";
import MerchantApprovalIcon from "../../../../images/icons/MerchantApprovalIcon.svg";
import RejectItemsIcon from "../../../../images/icons/RejectItems.svg";
import PendingIcon from "../../../../images/icons/PendingIcon.svg";
import DisapproveIcon from "../../../../images/icons/DisapproveIcon.svg";
import { XpressLayout } from "../../../../shared/layout";

export const MerchantDetailsApproval: React.FC = (props) => {
  const [rows, setRow] = useState([] as any);
  const [originalRows, setOriginalRows] = useState([] as any);
  const [column, setColumn] = useState([] as any);
  const [merchant, setMerchant] = useState(new Request.MerchantApproval());
  const [isError, setIsError] = useState(false);
  const [state, setState] = useState({
    isViewDetails: false,
    executing: false,
    openModal: false,
    loading: false,
    dissaprovalLoading:false,
    errorMessage: "",
    openAlertModal: false,
    message: "",
    isSuccess: false,
  });
  const [accessPage, setAccessPage] = useState(true);
  const [showModal, setModal] = useState(false);
  async function SetColumn() {
    let col = {
      title: "Update",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_: any, record: Response.MerchantApproval) => (
        <Tooltip
          placement="leftTop"
          title={
            !PagePermission.IsUserActionPermitted("CanViewMerchantApproval")
              ? "Not Authorized"
              : ""
          }
          color={"orange"}
          key={"orange"}
        >
          <Button
            disabled={
              !PagePermission.IsUserActionPermitted(
                "CanApproveMerchantChargeSetup"
              )
            }
            onClick={() => ViewMerchantDetails(record)}
            style={{
              background: "white",
              borderRadius: "5px",
              width: "58px",
              height: "35px",
              border: "1px solid #2B872B",
            }}
          >
            <span style={{ color: "#2B872B" }}>View</span>
          </Button>
        </Tooltip>
      ),
    };
    let columns = column;
    columns = [
      "key",
      "Business Name",
      "Card",
      "Account",
      "Bank",
      "ussd",
      "Wallet",
      "Qr",
      "Charge Type",
      "Charge Value",
      "Date Created",
    ];
    columns = DataTableUtil.SetColumn(columns);
    columns.push(col);
    await setColumn(columns);
  }
  async function Search(value: string) {
    let merchants = await SearchDatatable.Search(originalRows, value);
    await setRow(merchants);
  }

  async function ViewMerchantDetails(merchants: Response.MerchantApproval) {
    await setMerchant({
      ...merchant,
      isActive: merchants.isActive,
      businessNumber: merchants.businessNumber,
      bankCode: merchants.bankCode,
      receiveInternationalPayment: merchants.receiveInternationalPayment,
      accountName:merchants.accountName,
      settlementAccountNumber:merchants.settlementAccountNumber,
      tokenization: merchants.tokenization,
      isKeysVisible: merchants.isKeysVisible,
      ussdPayment:
        merchants.ussdPayment === null ? false : merchants.ussdPayment,
      isChargeTransferedToCustomer: merchants.isChargeTransferedToCustomer,
      qrPayment: merchants.qrPayment === null ? false : merchants.qrPayment,
      bankTrasferPayment:
        merchants.bankTrasferPayment === null
          ? false
          : merchants.bankTrasferPayment,
      accountPayment:
        merchants.accountPayment === null ? false : merchants.accountPayment,
      cardPayment:
        merchants.cardPayment === null ? false : merchants.cardPayment,
      chargeType: merchants.chargeType,
      chargeValue: merchants.chargeValue,
      walletPayment:
        merchants.walletPayment === null ? false : merchants.walletPayment,
      merchantId: merchants.merchantId,
      transactionLimit: merchants.transactionLimit,
      businessType: merchants.businessType,
      businessName: merchants.businessName,
      disapprovedComment: "",
      createdByUserId: merchants.createdByUserId,
      eNaira:merchants.eNaira
    });
    await setIsError(false);
    await setState({
      ...state,
      errorMessage: "",
    });
    await setModal(true);
  }
  async function ApproveMerchant() {
    await setState({ ...state, loading: true });
    await setModal(true)
    let request = merchant;
    request.isApproved = true;
    const response = await POST(
      apiConfig.Approvals.ApproveMerchantCharge,
      request
    );
    if (response.success) {
      await GetMerchantKYC(false);
      await setModal(false);
      await setState({
        ...state,
        message: `Merchant details approved successfully`,
        loading: false,
        openAlertModal: true,
        isSuccess: true,
      });
    } else {
      await GetMerchantKYC(false);
      await setIsError(true);
      await setState({
        ...state,
        loading: false,
        errorMessage: response.responseMessage as string,
      });
    }
  }
  async function DisapproveMerchant() {
    if (
      !merchant.disapprovedComment ||
      merchant.disapprovedComment.length <= 0
    ) {
      await setState({
        ...state,
        errorMessage: "Please input disapproval reason",
      });
      return;
    }
    await setState({ ...state, loading: true });
    let request = merchant;
    request.isDisapproved = true;
    const response = await POST(
      apiConfig.Approvals.DisapproveMerchantCharge,
      request
    );
    if (response.success) {
      await GetMerchantKYC(false);
      await setModal(false);
      await setState({
        ...state,
        message: `Merchant details disappoved successfully`,
        loading: false,
        openAlertModal: true,
        isSuccess: true,
      });
    } else {
      await setIsError(true);
      await setState({
        ...state,
        loading: false,
        errorMessage: response.responseMessage as string,
      });
    }
  }
  const SetPaymentTypeStatus = (paymentType: boolean) => {
    return (
      <React.Fragment>
        {paymentType ? (
          <img src={MerchantApprovalIcon} alt={""} />
        ) : (
          <img src={DisapproveIcon} alt={""} />
        )}
      </React.Fragment>
    );
  };

  async function GetMerchantKYC(
    isLoading: boolean = true,
    reload: boolean = false
  ) {
    const accessPage = (await PagePermission.IsUserPermitted(
      "CanViewMerchantApproval"
    )) as boolean;
    await setAccessPage(accessPage);
    await setState({ ...state, loading: isLoading });
    const response = await GET(
      apiConfig.Approvals.GetAllMerchantChargePendingApproval
    );
    if (response.success) {
      let merchants: Array<Response.MerchantApproval> = response.data?.$values;
      if(response.data !== null){
        let sn = 1;
        await merchants.forEach(function (element: Response.MerchantApproval) {
          element.key = sn++;
          element.card = SetPaymentTypeStatus(element.cardPayment as boolean);
          element.qr = SetPaymentTypeStatus(element.qrPayment as boolean);
          element.account = SetPaymentTypeStatus(
            element.accountPayment as boolean
          );
          element.wallet = SetPaymentTypeStatus(element.walletPayment as boolean);
          element.bank = SetPaymentTypeStatus(
            element.bankTrasferPayment as boolean
          );
          element.ussd = SetPaymentTypeStatus(element.ussdPayment as boolean);
          element.approvalDate = new DateTime().ConvertAPItoFieldDate(
            element.isApproved
              ? (element.dateApproved as string)
              : element.isDisapproved
              ? (element.dateDisapproved as string)
              : (element.dateCreated as string)
          );
          element.dateCreated = new DateTime().ConvertAPItoFieldDate(
            element.dateCreated as string
          );
          element.approvalStatus = (
            <React.Fragment>
              {element.isApproved ? (
                <img src={MerchantApprovalIcon} alt={""} />
              ) : element.isDisapproved ? (
                <img src={RejectItemsIcon} alt={""} />
              ) : (
                <img src={PendingIcon} alt={""} />
              )}
            </React.Fragment>
          );
        });
      await setRow(merchants);
      await setOriginalRows(merchants);
      }else{
       setRow([]);
       await setRow([]);
       await setOriginalRows([]);
      }
      await setState({ ...state, loading: false });
    } else {
      await setRow([]);
      await setOriginalRows([]);
      await setState({ ...state, loading: false });
    }
  }

  useEffect(() => {
    SetColumn();
    GetMerchantKYC(true);
  }, []);
  return (
    <XpressLayout>
      {accessPage ? (
        <>
          <AlertModal
            message={state.message}
            show={state.openAlertModal}
            isSuccess={state.isSuccess}
            isApproved={true}
            handleClose={() => {
              setState({ ...state, openAlertModal: false });
            }}
          />
          <MerchantDetailsPage
            setModal={setModal}
            showModal={showModal}
            ApproveMerchant={ApproveMerchant}
            DisapproveMerchant={DisapproveMerchant}
            merchantRequest={merchant}
            setMerchantRequest={setMerchant}
            loading={state.loading}
            errorMessage={state.errorMessage}
            isError={isError}
            loadingDisapproval={state.dissaprovalLoading}
          />
          <section className="admin-kyc-container">
            <main>
              <MerchantFilterTabs
                Search={Search}
                excelData={new Props.ExcelData()}
                OpenCreateModal={function () {}}
              />
            </main>
            <main style={{ marginLeft: 20, marginRight: 20 }}>
              <DataTable rows={rows} columns={column} loading={state.loading} />
            </main>
          </section>
        </>
      ) : (
        <UnAuthorizePage />
      )}
    </XpressLayout>
  );
};
