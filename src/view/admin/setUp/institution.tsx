/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import apiUrl from "../../../service/apiConfig";
import { GET, POST } from "../../../service/apiService";
import { Response } from "../../../models/client/apiResponse";
import { Request } from "../../../models/client/apiRequest";
import { DataTable } from "../../../shared/components/datatable";
import { Button, Tooltip } from "antd";
import { DataTableUtil } from "../../../shared/functions/dataTableUtil";
import DateTime from "../../../shared/functions/DateTime";
import ProviderHeader from "./components/providerHeader";
import SearchDatatable from "../../../shared/functions/searchDatatable";
import InstitutionModal from "./components/InstitutionModal";
import AlertModal from "../../../shared/components/alertModal";
import "./style.css";
import MerchantApprovalIcon from "../../../images/icons/MerchantApprovalIcon.svg";
import DisapproveIcon from "../../../images/icons/DisapproveIcon.svg";
import { PagePermission } from "../../../shared/functions/pagePermission";
import UnAuthorizePage from "../../../shared/components/unAuthorizePage";
import { XpressLayout } from "../../../shared/layout";

export const Institution: React.FC = (props) => {
  const [state, setState] = useState({
    providers: new Array<Response.ProviderResponse>(),
    loading: false,
    openAlertModal: false,
    message: "",
    isSuccess: false,
    isEdit: false,
    isError: false,
    errorMessage: "",
  });
  const [accessPage, setAccessPage] = useState(true);
  const [institutionRequest, setInstitutionRequest] = useState(
    new Request.BankRequest()
  );
  const [showModal, setModal] = useState(false);
  const [rows, setRow] = useState([] as any);
  const [originalRows, setOriginaRows] = useState([] as any);
  const [column, setColumn] = useState([] as any);
  async function SetColumn() {
    let col = {
      title: "Action",
      key: "operation",
      fixed: "center",
      width: 100,
      render: (_: any, record: Response.Banks) => (
        <Tooltip
          placement="leftTop"
          title={
            !PagePermission.IsUserActionPermitted("CanViewInstitutions")
              ? "Not Authorized"
              : ""
          }
          color={"orange"}
          key={"orange"}
        >
          <Button
            disabled={
              !PagePermission.IsUserActionPermitted("CanViewInstitutions")
            }
            onClick={() => OpenEditProviderModal(record)}
            style={{
              background: "white",
              borderRadius: "5px",
              width: "58px",
              height: "35px",
              border: "1px solid #2B872B",
              color: "white",
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
      "Bank Name",
      "Visible on Payment",
      "Bvn Required",
      "Name Required",
      "Date Of Birth Required",
      "Narration Required",
      "PhoneNumber Required",
      "Pin Required",
      "Processor",
    ];
    columns = DataTableUtil.SetColumn(columns);
    columns.push(col);
    await setColumn(columns);
  }
  async function Search(value: string) {
    let institution = await SearchDatatable.Search(originalRows, value);
    await setRow(institution);
  }

  async function OpenEditProviderModal(bank: Response.Banks) {
    await setInstitutionRequest({
      ...institutionRequest,
      id: bank.id,
      bankName: bank.bankName,
      bankCode: bank.bankCode,
      isVisibleToMerchantForPayment: bank.isVisibleToMerchantForPayment,
      isNameRequired: bank.isNameRequired,
      isBvnRequired: bank.isBvnRequired,
      isDateOfBirthRequired: bank.isDateOfBirthRequired,
      isNarrationRequired: bank.isNarrationRequired,
      isPhoneNumberRequired: bank.isPhoneNumberRequired,
      isPinRequired: bank.isPinRequired,
      provider: bank.provider,
    });
    await setState({ ...state, isEdit: true });
    await setModal(true);
  }

  async function OpenCreateProviderModal() {
    await setState({
      ...state,
      isEdit: false,
      isError: false,
      errorMessage: "",
    });
    await setInstitutionRequest({});
    await setModal(true);
  }

  async function UpdateInstitution() {
    await setState({ ...state, loading: true });
    const response = await POST(apiUrl.SetUp.UpdateBanks, institutionRequest);
    if (response.success) {
      await GetAllBanks();
      await setModal(false);
      await setState({
        ...state,
        message: `Institution details have successfully been updated.`,
        loading: false,
        openAlertModal: true,
        isSuccess: true,
      });
    } else {
      await setState({ ...state, loading: false });
    }
  }
  function SetBankStatus(status: any) {
    return (
      <React.Fragment>
        {status ? (
          <img src={MerchantApprovalIcon} alt={""} />
        ) : (
          <img src={DisapproveIcon} alt={""} />
        )}
      </React.Fragment>
    );
  }
  async function GetAllBanks() {
    const accessPage = (await PagePermission.IsUserPermitted(
      "CanViewAllInstitutions"
    )) as boolean;
    await setAccessPage(accessPage);
    const response = await GET(apiUrl.SetUp.GetBanks);
    if (response.success) {
      let banks: Array<Response.Banks> = response.data.$values;
      let sn = 0;
      await banks.forEach(function (element: Response.Banks) {
        sn = sn + 1;
        element.key = sn;
        element.processor = element.provider;
        element.bvnRequired = SetBankStatus(element.isBvnRequired);
        element.visibleonPayment = SetBankStatus(
          element.isVisibleToMerchantForPayment
        );
        element.phoneNumberRequired = SetBankStatus(
          element.isPhoneNumberRequired
        );
        element.narrationRequired = SetBankStatus(element.isNarrationRequired);
        element.nameRequired = SetBankStatus(element.isNameRequired);
        element.dateOfBirthRequired = SetBankStatus(
          element.isDateOfBirthRequired
        );
        element.pinRequired = SetBankStatus(element.isPinRequired);
        element.dateCreated = new DateTime().ConvertAPItoFieldDate(
          element.dateCreated as string
        );
        element.dateModified = new DateTime().ConvertAPItoFieldDate(
          element.dateModified as string
        );
      });
      await setRow(banks);
      await setOriginaRows(banks);
    }
  }
  useEffect(() => {
    SetColumn();
    GetAllBanks();
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
        <>
          <InstitutionModal
            errorMessage={state.errorMessage}
            isError={state.isError}
            UpdateInstitution={UpdateInstitution}
            setInstitutionRequest={setInstitutionRequest}
            institutionRequest={institutionRequest}
            setModal={setModal}
            showModal={showModal}
            loading={state.loading}
            isEdit={state.isEdit}
          />
          <section className="admin-kyc-container">
            <main>
              <ProviderHeader
                OpenCreateSetupMenuModal={OpenCreateProviderModal}
                Search={Search}
                showAddButton={false}
              />
            </main>
            <main style={{ marginLeft: 20, marginRight: 20 }}>
              <DataTable rows={rows} columns={column} />
            </main>
          </section>
        </>
      ) : (
        <UnAuthorizePage />
      )}
    </XpressLayout>
  );
};
