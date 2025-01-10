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
import TranManagerHeader from "./components/transactionManagerHeader";
import SearchDatatable from "../../../shared/functions/searchDatatable";
import TransactionManagerModal from "./components/transactionManagerModal";
import AlertModal from "../../../shared/components/alertModal";
import { PagePermission } from "../../../shared/functions/pagePermission";
import UnAuthorizePage from "../../../shared/components/unAuthorizePage";
import "./style.css";
import { XpressLayout } from "../../../shared/layout";

export const TransactionManager: React.FC = (props) => {
  const [state, setState] = useState({
    merchants: new Array<Response.MerchantDetails>(),
    loading: false,
    openAlertModal: false,
    message: "",
    isSuccess: false,
    isEdit: false,
  });
  const [accessPage, setAccessPage] = useState(true);
  const [tranManagerRequest, setTranManagerRequest] = useState(
    new Request.TransactionManagerRequest()
  );
  const [providers, setProviders] = useState(
    new Array<Response.ProviderResponse>()
  );
  const [rows, setRow] = useState([] as any);
  const [showModal, setModal] = useState(false);
  const [column, setColumn] = useState([] as any);
  const [originalRows, setOriginaRows] = useState([] as any);
  const [cardBrand, setCardBrand] = useState(
    new Array<Response.CardBrandResponse>()
  );
  async function SetColumn() {
    let col = {
      title: "Action",
      key: "operation",
      fixed: "center",
      width: 100,
      render: (_: any, record: Response.MerchantDetails) => (
        <Tooltip
          placement="leftTop"
          title={
            !PagePermission.IsUserActionPermitted(
              "CanViewCardTransactionManager"
            )
              ? "Not Authorized"
              : ""
          }
          color={"orange"}
          key={"orange"}
        >
          <Button
            disabled={
              !PagePermission.IsUserActionPermitted(
                "CanViewCardTransactionManager"
              )
            }
            onClick={() => OpenEditTranManagerModal(record)}
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
      "Merchant Name",
      "Merchant ID",
      "Status",
      "Date Profiled",
      "Date Modified",
    ];
    columns = DataTableUtil.SetColumn(columns);
    columns.push(col);
    await setColumn(columns);
  }
  async function OpenEditTranManagerModal(merchant: Response.MerchantDetails) {
    await setTranManagerRequest({
      ...tranManagerRequest,
      merchantId: merchant.id,
      useBin: merchant.useBin,
      useStaticRoute: merchant.useStaticRoute,
      useDefaultProvider: merchant.useDefault,
      staticRouteProvider: merchant.staticRouteProvider,
      defaultProvider: merchant.defaultProvider,
      merchantName: merchant.businessName,
      isActive: true,
    });
    await setState({ ...state, isEdit: true });
    await setModal(true);
  }

  async function Search(value: string) {
    let merchant = await SearchDatatable.Search(originalRows, value);
    await setRow(merchant);
  }
  async function UpdateTransactionManager() {
    await setState({ ...state, loading: true });
    const response = await POST(
      apiUrl.SetUp.ManageCardTransaction,
      tranManagerRequest
    );
    if (response.success) {
      await GetMerchantKYC();
      await setModal(false);
      await setState({
        ...state,
        message: `Card transaction manager details have successfully been 
        updated`,
        loading: false,
        openAlertModal: true,
        isSuccess: true,
      });
    } else {
      await setState({ ...state, loading: false });
    }
  }

  async function GetMerchantKYC() {
    const accessPage = (await PagePermission.IsUserPermitted(
      "ViewAllCardTransactionManager"
    )) as boolean;
    await setAccessPage(accessPage);
    await setState({ ...state, loading: true });
    const response = await GET(apiUrl.SetUp.GetAllMerchant);
    if (response.success) {
      let merchants: Array<Response.MerchantDetails> = response.data?.$values;
      let sn = 1;
      await merchants.forEach(function (element: Response.MerchantDetails) {
        element.key = sn++;
        element.status = element.isActive ? "Active" : "Inactive";
        element.merchantID = element.id;
        element.merchantName = element.businessName;
        element.dateUpdated = new DateTime().ConvertAPItoFieldDate(
          element.dateUpdated as string
        );
        element.dateProfiled = new DateTime().ConvertAPItoFieldDate(
          element.dateProfiled as string
        );
      });
      await setOriginaRows(merchants);
      await setRow(merchants);
    }
  }
  async function FetchProviders() {
    const response = await GET(apiUrl.SetUp.GetAllProviders);
    if (response.success) {
      await setProviders(response.data.$values);
    }
  }
  async function FetchCardBrands() {
    const response = await GET(apiUrl.SetUp.GetAllBrands);
    if (response.success) {
      await setCardBrand(response.data.$values);
    }
  }

  useEffect(() => {
    SetColumn();
    GetMerchantKYC();
    FetchProviders();
    FetchCardBrands();
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
          <TransactionManagerModal
            UpdateTransactionManager={UpdateTransactionManager}
            setTranManagerRequest={setTranManagerRequest}
            tranManagerRequest={tranManagerRequest}
            providers={providers}
            setModal={setModal}
            showModal={showModal}
            loading={state.loading}
            cardBrand={cardBrand}
          />
          <section className="admin-kyc-container">
            {" "}
            <main>
              {" "}
              <TranManagerHeader Search={Search} />
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
