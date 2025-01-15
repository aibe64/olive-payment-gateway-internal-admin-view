/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import UserModalPage from "./userModal";
import Header from "./header";
import { DataTable } from "../../../shared/components/datatable";
import apiUrl from "../../../service/apiConfig";
import { GET, POST } from "../../../service/apiService";
import { Response } from "../../../models/client/apiResponse";
import { Request } from "../../../models/client/apiRequest";
import { Button, Tooltip } from "antd";
import { DataTableUtil } from "../../../shared/functions/dataTableUtil";
import { Encryption } from "../../../shared/functions/encryption";
import { PagePermission } from "../../../shared/functions/pagePermission";
import UnAuthorizePage from "../../../shared/components/unAuthorizePage";
import SearchDatatable from "../../../shared/functions/searchDatatable";
import { XpressLayout } from "../../../shared/layout";

export const AdminUsers: React.FC = (props) => {
  const [rows, setRow] = useState([] as any);
  const [originalRows, setOriginalRows] = useState([] as any);
  const [column, setColumn] = useState([] as any);
  const [showModal, setModal] = useState(false);
  const [user, setUser] = useState(new Request.MerchantUserRequest());
  const [state, setState] = useState({
    isEdit: false,
    errorMessage: "",
    isError: false,
    loading: false,
  });
  const [accessPage, setAccessPage] = useState(true);
  const [roles, setRoles] = useState(new Array<Response.MerchantRoles>());
  async function SetColumn() {
    let col = {
      title: "Action",
      key: "operation",
      fixed: "center",
      width: 100,
      render: (_: any, record: Response.SSOUsers) => (
        <Tooltip
          placement="leftTop"
          title={
            !PagePermission.IsUserActionPermitted("CanViewUser")
              ? "Not Authorized"
              : ""
          }
          color={"orange"}
          key={"orange"}
        >
          <Button
            onClick={() => OpenEditUserModal(record)}
            disabled={!PagePermission.IsUserActionPermitted("CanViewUser")}
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
    columns = ["key", "First Name", "Last Name", "Email", "Role"];
    columns = DataTableUtil.SetColumn(columns);
    columns.push(col);
    await setColumn(columns);
  }
  async function OpenEditUserModal(record: Response.SSOUsers) {
    await setState({ ...state, isEdit: true });
    await setModal(true);
    let data: any = JSON.parse(
      Encryption.decrypt(sessionStorage.getItem("***********") as string)
    );
    await setUser({
      firstName: record.firstName,
      lastName: record.lastName,
      phoneNumber: record.phoneNumber,
      email: record.email,
      roleId: record.roleId,
      roleName: record.userRole?.description,
      userId: record.userId,
      token: data.token,
      appKey: data.appKey,
    });
  }
  async function OpenCreateUserModal() {
    await setState({
      ...state,
      isEdit: false,
      isError: false,
      errorMessage: "",
    });
    let data: any = JSON.parse(
      Encryption.decrypt(sessionStorage.getItem("***********") as string)
    );
    const token = data.token;
    const appKey = data.appKey;
    await setUser({ email: ".", token, appKey, address: "." });
    await setModal(true);
  }
  async function CreateUser() {
    await setState({ ...state, loading: true });
    const response = await POST(apiUrl.Merchants.CreateMerchantUsers, user);
    if (response.success) {
      await GetUsers();
      await setState({ ...state, loading: false });
      await setModal(false);
      await setUser({});
    } else {
      await setState({
        ...state,
        loading: false,
        isError: true,
        errorMessage: response.responseMessage as string,
      });
    }
  }
  const GetToken = () => {
    let userInfo: Response.UserInfo = new Response.UserInfo();
    if (sessionStorage.getItem("***")) {
      userInfo = JSON.parse(
        Encryption.decrypt(sessionStorage.getItem("***") as string)
      );
      return userInfo.token;
    }
    return null;
  };
  async function UpdateUser() {
    await setState({ ...state, loading: true });
    const response = await POST(
      apiUrl.Merchants.UpdateMerchantUsers,
      user,
      GetToken()
    );
    if (response.success) {
      await GetUsers();
      await setState({ ...state, loading: false });
      await setModal(false);
      await setUser({});
    } else {
      await setState({
        ...state,
        loading: false,
        isError: true,
        errorMessage: response.responseMessage as string,
      });
    }
  }
  async function Search(value: string) {
    const users = await SearchDatatable.Search(originalRows, value);
    await setRow(users);
  }
  async function GetAllRoles() {
    const response = await GET(apiUrl.Account.GetAdminRoles);
    if (response.success) {
      await setRoles(response.data.$values);
    }
  }
  async function GetUsers() {
    const accessPage = (await PagePermission.IsUserPermitted(
      "CanViewAllUsers"
    )) as boolean;
    await setAccessPage(accessPage);
    const response = await GET(apiUrl.Merchants.GetSSOUsers);
    if (response.success) {
      let users: Array<Response.SSOUsers> = response.data.$values;
      let sn = 0;
      await users.forEach(function (element: Response.SSOUsers) {
        sn = sn + 1;
        element.key = sn;
        element.role = element.userRole?.description;
      });
      await setRow(users);
      await setOriginalRows(users);
    }
  }
  useEffect(() => {
    SetColumn();
    GetUsers();
    GetAllRoles();
  }, []);
  return (
    <XpressLayout>
      <UserModalPage
        userRequest={user}
        setUserRequest={setUser}
        CreateUser={CreateUser}
        UpdateUser={UpdateUser}
        setModal={setModal}
        showModal={showModal}
        isError={state.isError}
        errorMessage={state.errorMessage}
        isEdit={state.isEdit}
        loading={state.loading}
        roles={roles}
      />
      {accessPage ? (
        <section className="admin-kyc-container">
          <main>
            {" "}
            <Header OpenCreateModal={OpenCreateUserModal} Search={Search} />
          </main>
          <main style={{ marginLeft: 20, marginRight: 20 }}>
            <DataTable rows={rows} columns={column} loading={state.loading}/>
          </main>
        </section>
      ) : (
        <UnAuthorizePage />
      )}
    </XpressLayout>
  );
};
