/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import apiUrl from "../../../service/apiConfig";
import { GET, POST } from "../../../service/apiService";
import { Response } from "../../../models/client/apiResponse";
import { Request } from "../../../models/client/apiRequest";
import { DataTable } from "../../../shared/components/datatable";
import { Button, Tooltip } from "antd";
import { DataTableUtil } from "../../../shared/functions/dataTableUtil";
import MerchantApprovalIcon from "../../../images/icons/MerchantApprovalIcon.svg";
import DisapproveIcon from "../../../images/icons/DisapproveIcon.svg";
import DateTime from "../../../shared/functions/DateTime";
import ProviderHeader from "./components/providerHeader";
import SearchDatatable from "../../../shared/functions/searchDatatable";
import ProviderModal from "./components/providerModal";
import AlertModal from "../../../shared/components/alertModal";
import "./style.css";
import { PagePermission } from "../../../shared/functions/pagePermission";
import UnAuthorizePage from "../../../shared/components/unAuthorizePage";
import { XpressLayout } from "../../../shared/layout";

export const Provider: React.FC = (props) => {
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
  const [providerRequest, setProviderRequest] = useState(
    new Request.ProviderRequest()
  );
  const [showModal, setModal] = useState(false);
  const [banks, setBanks] = useState(new Array<Response.Banks>());
  const [rows, setRow] = useState([] as any);
  const [originalRows, setOriginaRows] = useState([] as any);
  const [column, setColumn] = useState([] as any);
  async function SetColumn() {
    let col = {
      title: "Action",
      key: "operation",
      fixed: "center",
      width: 100,
      render: (_: any, record: Response.ProviderResponse) => (
        <Tooltip
          placement="leftTop"
          title={
            !PagePermission.IsUserActionPermitted("CanViewProvider")
              ? "Not Authorized"
              : ""
          }
          color={"orange"}
          key={"orange"}
        >
          <Button
            onClick={() => OpenEditProviderModal(record)}
            disabled={!PagePermission.IsUserActionPermitted("CanViewProvider")}
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
      "Name",
      "Short Name",
      "Status",
      "Card",
      "Account",
      "Bank",
      "ussd",
      "Wallet",
      "Qr",
      "DateCreated",
      "Date Modified",
    ];
    columns = DataTableUtil.SetColumn(columns);
    columns.push(col);
    await setColumn(columns);
  }
  async function Search(value: string) {
    let provider = await SearchDatatable.Search(originalRows, value);
    await setRow(provider);
  }

  function SetProviderStatus(status: any) {
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

  async function OpenEditProviderModal(provider: Response.ProviderResponse) {
    await setProviderRequest({
      ...providerRequest,
      id: provider.id,
      name: provider.name,
      shortName: provider.shortName,
      card: provider.isCard,
      account: provider.isAccount,
      ussd: provider.isUssd,
      wallet: provider.isWallet,
      bankTransfer: provider.isBankTransfer,
      qr: provider.isQR,
      isActive: provider.isActive,
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
    await setProviderRequest({});
    await setModal(true);
  }

  async function CreateProvider() {
    if (
      !providerRequest.shortName ||
      !providerRequest.name ||
      providerRequest.shortName!?.length <= 0
    ) {
      await setState({
        ...state,
        isError: true,
        errorMessage: "Provider name or short name is required",
      });
      return;
    }
    await setState({ ...state, loading: true });
    const response = await POST(apiUrl.SetUp.CreateProvider, providerRequest);
    if (response.success) {
      await GetAllProviders();
      await setModal(false);
      await setState({
        ...state,
        message: `Provider has been successfully added and has been passed
        for approval. Kindly follow up with your 
        supervisor for update`,
        loading: false,
        openAlertModal: true,
      });
    } else {
      await setState({
        ...state,
        loading: false,
        isError: true,
        errorMessage: response.responseMessage as string,
      });
    }
  }
  async function UpdateProvider() {
    await setState({ ...state, loading: true });
    const response = await POST(apiUrl.SetUp.UpdateProvider, providerRequest);
    if (response.success) {
      await GetAllProviders();
      await setModal(false);
      await setState({
        ...state,
        message: `Provider details have successfully been updated and
        have been passed for approval.`,
        loading: false,
        openAlertModal: true,
        isSuccess: true,
      });
    } else {
      await setState({ ...state, loading: false });
    }
  }

  async function GetAllProviders() {
    const accessPage = (await PagePermission.IsUserPermitted(
      "CanViewAllProvider"
    )) as boolean;
    await setAccessPage(accessPage);
    const response = await GET(apiUrl.SetUp.GetAllProviders);
    if (response.success) {
      let providers: Array<Response.ProviderResponse> = response.data.$values;
      let sn = 0;
      await providers.forEach(function (element: Response.ProviderResponse) {
        sn = sn + 1;
        element.key = sn;
        element.status = element.isActive ? "Active" : "Inactive";
        element.isCard = element.card;
        element.card = SetProviderStatus(element.card);
        element.isAccount = element.account;
        element.account = SetProviderStatus(element.account);
        element.isBank = element.bank;
        element.bank = SetProviderStatus(element.bank);
        element.isQR = element.qr;
        element.qr = SetProviderStatus(element.qr);
        element.isUssd = element.ussd;
        element.ussd = SetProviderStatus(element.ussd);
        element.isWallet = element.wallet;
        element.wallet = SetProviderStatus(element.wallet);
        element.dateCreated = new DateTime().ConvertAPItoFieldDate(
          element.dateCreated as string
        );
        element.dateModified = new DateTime().ConvertAPItoFieldDate(
          element.dateModified as string
        );
      });
      await setRow(providers);
      await setOriginaRows(providers);
    }
  }
  async function FetchBanks() {
    const response = await GET(apiUrl.SetUp.GetBanks);
    if (response.success) {
      await setBanks(response.data.$values);
    }
  }
  useEffect(() => {
    SetColumn();
    GetAllProviders();
    FetchBanks();
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
          <ProviderModal
            errorMessage={state.errorMessage}
            isError={state.isError}
            UpdateProvider={UpdateProvider}
            CreateProvider={CreateProvider}
            setProviderRequest={setProviderRequest}
            providerRequest={providerRequest}
            banks={banks}
            setModal={setModal}
            showModal={showModal}
            loading={state.loading}
            isEdit={state.isEdit}
          />
          <section className="admin-kyc-container">
            <main>
              {" "}
              <ProviderHeader
                OpenCreateSetupMenuModal={OpenCreateProviderModal}
                Search={Search}
                showAddButton={true}
                addButtonNmae={"Add Provider"}
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
