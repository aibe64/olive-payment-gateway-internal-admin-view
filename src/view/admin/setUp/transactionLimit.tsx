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
import TranLimitHeader from "./components/tranLimitHeader";
import SearchDatatable from "../../../shared/functions/searchDatatable";
import TransactionLimitModal from "./components/transactionLimitModal";
import AlertModal from "../../../shared/components/alertModal";
import { PagePermission } from "../../../shared/functions/pagePermission";
import UnAuthorizePage from "../../../shared/components/unAuthorizePage";
import "./style.css";
import { XpressLayout } from "../../../shared/layout";

export const TransactionLimit: React.FC = (props) => {
  const [state, setState] = useState({
    loading: false,
    openAlertModal: false,
    message: "",
    isSuccess: false,
  });
  const [accessPage, setAccessPage] = useState(true);
  const [tranLimitRequest, setTranLimitRequest] = useState(
    new Request.TransactionLimitRequest()
  );
  const [rows, setRow] = useState([] as any);
  const [isCreate, setIsCreate] = useState(true);
  const [showModal, setModal] = useState(false);
  const [column, setColumn] = useState([] as any);
  const [originalRows, setOriginaRows] = useState([] as any);
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
            onClick={() => OpenEditTranLimitModal(record)}
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
    columns = ["key", "Name", "Limit", "Date Created"];
    columns = DataTableUtil.SetColumn(columns);
    columns.push(col);
    await setColumn(columns);
  }
  async function OpenEditTranLimitModal(limit: Response.TransactionLimit) {
    await setTranLimitRequest({
      ...tranLimitRequest,
      id: limit.id,
      name: limit.name,
      limit: limit.limit,
    });
    await setState({
      ...state,
      message: "",
      isSuccess: false,
      loading: false,
    });
    await setIsCreate(false);
    await setModal(true);
  }
  async function OpenCreateTranLimitModal() {
    await setIsCreate(true);
    await setState({
      ...state,
      message: "",
      isSuccess: false,
      loading: false,
    });
    await setTranLimitRequest({});
    await setModal(true);
  }

  async function Search(value: string) {
    let limits = await SearchDatatable.Search(originalRows, value);
    await setRow(limits);
  }
  async function UpdateTransactionLimit() {
    await setState({ ...state, loading: true });
    const response = await POST(
      apiUrl.SetUp.UpdateTransactionLimit,
      tranLimitRequest
    );
    if (response.success) {
      await FetchTransactionLimit();
      await setModal(false);
      await setState({
        ...state,
        message: `Transaction limit details have successfully been 
        updated`,
        loading: false,
        openAlertModal: true,
        isSuccess: true,
      });
    } else {
      await setState({
        ...state,
        message: `Error occured while processing request. Please contact the application support`,
        loading: false,
        openAlertModal: true,
        isSuccess: false,
      });
    }
  }
  async function CreateTransactionLimit() {
    await setState({ ...state, loading: true });
    let request = tranLimitRequest;
    request.id = 0;
    const response = await POST(apiUrl.SetUp.CreateTransactionLimit, request);
    if (response.success) {
      await FetchTransactionLimit();
      await setModal(false);
      await setState({
        ...state,
        message: `Transaction limit details have successfully been 
        updated`,
        loading: false,
        openAlertModal: true,
        isSuccess: true,
      });
    } else {
      await setState({
        ...state,
        message: `Error occured while processing request. Please contact the application support`,
        loading: false,
        openAlertModal: true,
        isSuccess: false,
      });
    }
  }

  async function FetchTransactionLimit() {
    const accessPage = (await PagePermission.IsUserPermitted(
      "ViewAllCardTransactionManager"
    )) as boolean;
    await setAccessPage(accessPage);
    await setAccessPage(accessPage);
    await setState({ ...state, loading: true });
    const response = await GET(apiUrl.SetUp.TransactionLimit);
    if (response.success) {
      const limits: Array<Response.TransactionLimit> = response.data.$values;
      await limits.forEach(function (
        element: Response.TransactionLimit,
        index: number
      ) {
        element.key = index++;
        element.dateCreated = new DateTime().ConvertAPItoFieldDate(
          element.dateCreated as string
        );
      });
      await setOriginaRows(limits);
      await setRow(limits);
    }
  }
  useEffect(() => {
    SetColumn();
    FetchTransactionLimit();
  }, []);
  return (
    <XpressLayout>
      <AlertModal
        message={state.message}
        show={state.openAlertModal}
        isSuccess={state.isSuccess}
        isApproved={true}
        handleClose={() => {
          setState({ ...state, openAlertModal: false, loading: false });
        }}
      />
      {accessPage ? (
        <>
          <TransactionLimitModal
            UpdateTransactionLimit={UpdateTransactionLimit}
            CreateTransactionLimit={CreateTransactionLimit}
            setTranLimitRequest={setTranLimitRequest}
            tranLimitRequest={tranLimitRequest}
            setModal={setModal}
            showModal={showModal}
            loading={state.loading}
            isCreate={isCreate}
          />
          <section className="admin-kyc-container">
            <main>
              <TranLimitHeader
                Search={Search}
                OpenCreateModal={OpenCreateTranLimitModal}
                showAddButton={true}
              />
            </main>
            <main style={{ marginLeft: 20, marginRight: 20 }}>
              {" "}
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
