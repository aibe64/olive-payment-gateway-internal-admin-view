/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Response } from "../../../models/client/apiResponse";
import { Request } from "../../../models/client/apiRequest";
import apiConfig from "../../../service/apiConfig";
import { GET, POST } from "../../../service/apiService";
import DateTime from "../../../shared/functions/DateTime";
import MerchantFilterTabs from "./components/merchantFilterTabs";
import { DataTable } from "../../../shared/components/datatable";
import { DataTableUtil } from "../../../shared/functions/dataTableUtil";
import SearchDatatable from "../../../shared/functions/searchDatatable";
import { Button, Tooltip } from "antd";
import MerchantDetailsPage from "./components/merchantModal";
import AlertModal from "../../../shared/components/alertModal";
import { Props } from "../../../models/application/props";
import { PagePermission } from "../../../shared/functions/pagePermission";
import UnAuthorizePage from "../../../shared/components/unAuthorizePage";
import MerchantApprovalIcon from "../../../images/icons/MerchantApprovalIcon.svg";
import DisapproveIcon from "../../../images/icons/DisapproveIcon.svg";
import PendingIcon from "../../../images/icons/PendingIcon.svg";
import { Notification } from "../../../shared/components/notification";
import { XpressLayout } from "../../../shared/layout";

export const MerchantSetup: React.FC = () => {
  const [rows, setRow] = useState([] as any);
  const [originalRows, setOriginalRows] = useState([] as any);
  const [column, setColumn] = useState([] as any);
  console.log("first")
  const [merchant, setMerchant] = useState(
    new Request.RegisteredMerchantRequest()
  );
  const [isError, setIsError] = useState(false);
  const [transactionLimit, setTransactionLimit] = useState(
    new Response.TransactionLimitResponse()
  );
  const [state, setState] = useState({
    isViewDetails: false,
    executing: false,
    openModal: false,
    loading: false,
    errorMessage: "",
    openAlertModal: false,
    message: "",
    isSuccess: false,
  });
  const [accessPage, setAccessPage] = useState(true);
  const [excelData, setExcelData] = useState(new Props.ExcelData());
  const [showModal, setModal] = useState(false);
  const [processMapping, setProcessingMapping] = useState(false);
  const [validating, setValidating] = useState(false);
  async function SetColumn() {
    let col = {
      title: "Update",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_: any, record: Response.MerchantDetails) => (
        <Tooltip
          placement="leftTop"
          title={
            !PagePermission.IsUserActionPermitted("CanViewMerchant")
              ? "Not Authorized"
              : ""
          }
          color={"orange"}
          key={"orange"}
        >
          <Button
            disabled={!PagePermission.IsUserActionPermitted("CanViewMerchant")}
            onClick={() => ViewMerchantDetails(record)}
            style={{
              background: "white",
              borderRadius: "5px",
              width: "58px",
              height: "35px",
              border: "1px solid #2B872B",
            }}
          >
            <span style={{ color: "#2B872B" }}>Edit</span>
          </Button>
        </Tooltip>
      ),
    };
    let columns = column;
    columns = [
      "key",
      "Date Profiled",
      "Business Name",
      "Business Email",
      "Business Number",
      "Business Type",
      "Date Updated",
      "Status",
    ];
    columns = DataTableUtil.SetColumn(columns);
    columns.push(col);
    await setColumn(columns);
  }
  async function Search(value: string) {
    let merchants = await SearchDatatable.Search(originalRows, value);
    await setRow(merchants);
  }

  async function ViewMerchantDetails(merchant: Response.MerchantDetails) {
    await setMerchant(merchant);
    await setMerchant({
      ...merchant,
      isActive: merchant.isActive,
      isKeysVisible: merchant.isKeysVisible,
      receiveInternationalPayment: merchant.receiveInternationalPayment,
      ussdPayment: merchant.ussdPayment === null ? false : merchant.ussdPayment,
      whoToCharge: merchant.isChargeTransferedToCustomer
        ? "Customer"
        : "Merchant",
      qrPayment: merchant.qrPayment === null ? false : merchant.qrPayment,
      bankTrasferPayment:
        merchant.bankTrasferPayment === null
          ? false
          : merchant.bankTrasferPayment,
      accountPayment:
        merchant.accountPayment === null ? false : merchant.accountPayment,
      cardPayment: merchant.cardPayment === null ? false : merchant.cardPayment,
      walletPayment:
        merchant.walletPayment === null ? false : merchant.walletPayment,
      eNaira: merchant.eNaira === null ? false : merchant.eNaira,
      tokenization:
        merchant.tokenization === null ? false : merchant.tokenization,
      merchantId: merchant.id,
      disapprovedComment: merchant.disapprovedComment,
      approvalStatus: merchant.approvalStatus,
      isPaymentPageCustomizationEnabled:
        merchant.isPaymentPageCustomizationEnabled,
      oldMerchantExist: merchant.oldMerchantId !== null,
      oldMerchantId: merchant.oldMerchantId,
      oldMerchantIdForPayload: merchant.oldMerchantId,
    });
    await setIsError(false);
    await setState({
      ...state,
      errorMessage: "",
    });
    await setModal(true);
  }
  async function UpdateMerchant() {
    await setState({ ...state, loading: true });
    let request = merchant;
    request.transactionLimit = request.transactionLimit?.toString();
    request.chargeValue = request.chargeValue?.replace("%", "");
    const response = await POST(apiConfig.SetUp.UpdateMerchant, request);
    if (response.success) {
      await setModal(false);
      await GetMerchantKYC(false);
      await setState({
        ...state,
        message: `Merchant details have successfully been updated awaiting approval`,
        loading: false,
        openAlertModal: true,
        isSuccess: true,
      });
    } else {
      await setRow([]);
      await setOriginalRows([]);
      await setIsError(true);
      await setState({
        ...state,
        loading: false,
        errorMessage: response.responseMessage as string,
      });
    }
  }
  async function MapMerchant() {
    await setProcessingMapping(true);
    const request = {
      oldMerchantId: merchant.oldMerchantIdForPayload,
      merchantId: merchant.merchantId,
    };
    const response = await POST(apiConfig.SetUp.MapMerchant, request);
    if (response.success) {
      await GetMerchantKYC(false);
      await setProcessingMapping(false);
      Notification(
        "Old Merchant Id Mapped successfully. Awaiting approval",
        true
      );
      await setMerchant({ ...merchant, oldMerchantId: request.oldMerchantId });
    } else {
      await setIsError(true);
      await setProcessingMapping(false);
      Notification(response.responseMessage as string, false);
    }
  }
  async function GetTransactionLimit() {
    const response = await GET(apiConfig.SetUp.TransactionLimit);
    if (response.success) {
      let data: Response.TransactionLimitResponse = response.data;
      await setTransactionLimit(data);
    }
  }
  async function SetExcel(merchants: Response.MerchantDetails[]) {
    let excelColumn = [] as any;
    let excelRows = [] as any;
    excelColumn = [
      "Unique Key",
      "key",
      "oldMerchantId",
      "name",
      "email",
      "supportEmail",
      "chargeBackEmail",
      "settlementAccountNumber",
      "accountName",
      "bankCode",
      "businessPhoneNumber",
      "businessAddress",
      "status",
      "businessType",
      "merchantType",
      "businessNumber",
      "businessNumberType",
      "receiveInternationalPayment",
      "cardPayment",
      "accountPayment",
      "qrPayment",
      "ussdPayment",
      "isMerchantBearer",
      "walletPayment",
      "transactionLimit",
      "fileName",
      "file",
      "createdAt",
      "updatedAt",
      "settlementMerchantId",
      "emailCustomerStatus",
      "emailMerchantStatus",
      "bankTransferPayment",
      "logo",
      "webHookUrl",
      "tranzwareMerchantId",
    ];
    merchants.forEach(function (element: Response.MerchantDetails) {
      excelRows.push({
        "Unique Key": element.id,
        key: element.merchantID,
        oldMerchantId: "",
        name: element.businessName,
        email: element.businessEmail,
        supportEmail: element.supportEmail,
        chargeBackEmail: element.disputeEmail,
        settlementAccountNumber: element.settlementAccountNumber,
        accountName: element.accountName,
        bankCode: element.bankCode,
        businessPhoneNumber: element.businessNumber,
        businessAddress: element.businessAddress,
        status: element.isActive ? "ACTIVE" : "INACTIVE",
        businessType: element.businessType,
        merchantType: element.merchantCategory,
        businessNumber: element.bvn,
        businessNumberType: "BVN",
        receiveInternationalPayment: element.receiveInternationalPayment
          ? "ACTIVE"
          : "INACTIVE",
        cardPayment: element.cardPayment ? "ACTIVE" : "INACTIVE",
        accountPayment: element.accountPayment ? "ACTIVE" : "INACTIVE",
        qrPayment: element.qrPayment ? "ACTIVE" : "INACTIVE",
        ussdPayment: element.ussdPayment ? "ACTIVE" : "INACTIVE",
        isMerchantBearer: "ACTIVE",
        walletPayment: element.walletPayment ? "ACTIVE" : "INACTIVE",
        transactionLimit: element.transactionLimit,
        fileName: "",
        file: "",
        createdAt: new DateTime().ConvertDateToFieldDateAndTime(
          element.dateProfiled as string
        ),
        updatedAt: new DateTime().ConvertDateToFieldDateAndTime(
          element.dateUpdated as string
        ),
        settlementMerchantId: element.merchantID,
        emailCustomerStatus: "",
        emailMerchantStatus: "",
        bankTransferPayment: element.bankTrasferPayment ? "ACTIVE" : "INACTIVE",
        logo: "",
        webHookUrl: element.webHookUrl,
        tranzwareMerchantId: "",
      });
    });
    await setExcelData({
      ...excelData,
      column: DataTableUtil.SetExcelColumn(excelColumn),
      title: "Merchant KYC",
      fileName: "xpressPay_merchant_kyc",
      rows: excelRows,
    });
  }

  const validateAccountNumber = async () => {
    const request = {
      bankCode: merchant.bankCode,
      accountNumber: merchant.settlementAccountNumber,
    };
    await setValidating(true);
    const response = await POST(
      apiConfig.Users.ValidateSettlementAccount,
      request
    );
    if (response.success) {
      await setMerchant({
        ...merchant,
        accountName: response.data?.accountName,
      });
      await setValidating(false);
      Notification("Account number is valid", true);
    } else {
      await setValidating(false);
      Notification(
        "Sorry, we couldn't find account with the account number. Please make sure the account number belongs to the selected bank",
        false
      );
    }
  };

  async function GetMerchantKYC(isLoading: boolean = true) {
    const accessPage = (await PagePermission.IsUserPermitted(
      "CanViewMerchant"
    )) as boolean;
    await setAccessPage(accessPage);
    await setState({ ...state, loading: isLoading });
    const response = await GET(apiConfig.SetUp.GetAllMerchant);
    if (response.success) {
      let merchants: Array<Response.MerchantDetails> = response.data?.$values;
      let sn = 1;
      await merchants.forEach(function (element: Response.MerchantDetails) {
        element.key = sn++;
        element.dateUpdated = new DateTime().ConvertAPItoFieldDate(
          element.dateUpdated as string
        );
        element.dateProfiled = new DateTime().ConvertAPItoFieldDate(
          element.dateProfiled as string
        );
        element.status = (
          <React.Fragment>
            {element.approvalStatus === 2 ? (
              <img src={MerchantApprovalIcon} alt={""} />
            ) : element.approvalStatus === 1 ? (
              <img src={PendingIcon} alt={""} />
            ) : element.approvalStatus === 3 ? (
              <img src={DisapproveIcon} alt={""} />
            ) : (
              ""
            )}
          </React.Fragment>
        );
      });

      await setRow(merchants);
      await setOriginalRows(merchants);
      await setState({ ...state, loading: false });
      await SetExcel(merchants);
    } else {
      await setState({ ...state, loading: false });
    }
  }

  useEffect(() => {
    SetColumn();
    GetMerchantKYC();
    GetTransactionLimit();
  }, []);
  return (
    <XpressLayout>
      <AlertModal
        message={state.message}
        show={state.openAlertModal}
        isSuccess={state.isSuccess}
        isApproved={true}
        handleClose={() => {
          setState({ ...state, openAlertModal: false });
        }}
      />
      {accessPage ? (
        <section className="admin-kyc-container">
          <MerchantDetailsPage
            ValidateAccountNumber={validateAccountNumber}
            validating={validating}
            setModal={setModal}
            showModal={showModal}
            UpdateMerchant={UpdateMerchant}
            MapMerchant={MapMerchant}
            setMerchantRequest={setMerchant}
            merchantRequest={merchant}
            loading={state.loading}
            processingMapping={processMapping}
            errorMessage={state.errorMessage}
            isError={isError}
            transactionLimits={transactionLimit}
          />
          <main>
            <MerchantFilterTabs
              Search={Search}
              excelData={excelData}
              OpenCreateModal={function () {}}
            />
          </main>
          <main style={{ marginLeft: 20, marginRight: 20 }}>
            <DataTable rows={rows} columns={column} loading={state.loading} />
          </main>
        </section>
      ) : (
        <UnAuthorizePage />
      )}
    </XpressLayout>
  );
};
