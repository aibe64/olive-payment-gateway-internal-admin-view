/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import RoleModalPage from "./roleModal";
import Header from "./header";
import { DataTable } from "../../../shared/components/datatable";
import apiUrl from "../../../service/apiConfig";
import { GET, POST } from "../../../service/apiService";
import { Response } from "../../../models/client/apiResponse";
import { Request } from "../../../models/client/apiRequest";
import { Button, Tooltip } from "antd";
import { DataTableUtil } from "../../../shared/functions/dataTableUtil";
import MerchantApprovalIcon from "../../../images/icons/MerchantApprovalIcon.svg";
import DisapproveIcon from "../../../images/icons/DisapproveIcon.svg";
import SearchDatatable from "../../../shared/functions/searchDatatable";
import { PagePermission } from "../../../shared/functions/pagePermission";
import UnAuthorizePage from "../../../shared/components/unAuthorizePage";
import { Encryption } from "../../../shared/functions/encryption";
import { XpressLayout } from "../../../shared/layout";

export const AdminRole: React.FC = () => {
  const [state, setState] = useState({
    isEdit: false,
    errorMessage: "",
    isError: false,
    loading: false,
  });
  const [accessPage, setAccessPage] = useState(true);
  const [permissions, setPermissions] = useState(Array<Response.Permissions>());
  const [rows, setRow] = useState([] as any);
  const [originalRows, setOriginalRow] = useState([] as any);
  const [column, setColumn] = useState([] as any);
  const [showModal, setModal] = useState(false);
  const [roleResources, setRoleResources] = useState(
    new Request.RoleAndPermission()
  );
  async function SetColumn(rolePermissions: Array<Response.Permissions>) {
    let col = {
      title: "Action",
      key: "operation",
      fixed: "center",
      width: 100,
      render: (_: any, record: Response.RoleResources) => (
        <Tooltip
          placement="leftTop"
          title={
            !PagePermission.IsUserActionPermitted("CanViewRole")
              ? "Not Authorized"
              : ""
          }
          color={"orange"}
          key={"orange"}
        >
          <Button
            onClick={() => OpenEditRoleModal(record, rolePermissions)}
            disabled={!PagePermission.IsUserActionPermitted("CanViewRole")}
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
    columns = ["key", "Name", "Description", "Number Of Permissions", "Active"];
    columns = DataTableUtil.SetColumn(columns);
    columns.push(col);
    await setColumn(columns);
  }
  async function OpenEditRoleModal(
    record: Response.RoleResources,
    rolePermissions: Array<Response.Permissions>
  ) {
    let resources: Request.RoleAndPermission = new Request.RoleAndPermission();
    rolePermissions.forEach((element) => {
      element.isChecked = false;
      const index = record?.roleResources?.$values!.findIndex(
        (x) => x.id === element.id
      ) as number;
      if (index > -1) {
        element.isChecked = true;
      }
    });
    resources.isActive = record.isActive;
    resources.id = record.id;
    resources.description = record.description;
    resources.permissions = rolePermissions;
    resources.roleName = record.name;
    await setRoleResources(resources);
    await setState({
      ...state,
      isEdit: true,
      errorMessage: "",
      isError: false,
    });
    await setModal(true);
  }
  const OpenCreateRoleModal = async () => {
    permissions.forEach((x) => {
      x.isChecked = false;
    });
    let resources: Request.RoleAndPermission = new Request.RoleAndPermission();
    resources.isActive = false;
    resources.description = "";
    resources.permissions = permissions;
    resources.roleName = "";
    await setRoleResources(resources);
    await setState({
      ...state,
      isEdit: false,
      errorMessage: "",
      isError: false,
    });
    await setModal(true);
  };
  const CreateRoleResources = async () => {
    await setState({ ...state, loading: true });
    let request: any = {};
    request.roleName = roleResources.roleName;
    request.description = roleResources.description;
    request.isActive = roleResources.isActive;
    request.permissions = roleResources.permissions?.filter((x) => {
      return x.isChecked === true;
    });
    const response = await POST(apiUrl.Account.CreateRoleResources, request);
    if (response.success) {
      await GetRoleAndPermissions();
      await setState({ ...state, loading: false });
      await setModal(false);
    } else {
      await setState({
        ...state,
        loading: false,
        isError: true,
        errorMessage: response.responseMessage as string,
      });
    }
  };
  const UpdateRoleResources = async () => {
    await setState({ ...state, loading: true });
    let request: any = {};
    request.roleId = roleResources.id;
    request.roleName = roleResources.roleName;
    request.description = roleResources.description;
    request.isActive = roleResources.isActive;

    request.permissions = roleResources.permissions?.filter((x) => {
      return x.isChecked === true;
    });
    const response = await POST(
      apiUrl.Account.UpdateRoleResources,
      request,
      GetToken()
    );
    if (response.success) {
      await GetRoleAndPermissions();
      await setState({ ...state, loading: false });
      await setModal(false);
    } else {
      await setState({
        ...state,
        loading: false,
        isError: true,
        errorMessage: response.responseMessage as string,
      });
    }
  };
  const Search = async (value: string) => {
    let roleResources = await SearchDatatable.Search(originalRows, value);
    await setRow(roleResources);
  };
  function SetActiveStatus(status: any) {
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
  const GetPermissions = async () => {
    const response = await GET(
      apiUrl.Account.GetPermissions,
      false,
      GetToken()
    );
    if (response.success) {
      await SetColumn(response.data.$values);
      await setPermissions(response.data.$values);
    }
  };
  const GetToken = () => {
    if (sessionStorage.getItem("***")) {
      const userInfo: Response.UserInfo  = JSON.parse(
        Encryption.decrypt(sessionStorage.getItem("***") as string)
      );
      return userInfo.token;
    }
    return null;
  };
  const GetRoleAndPermissions = async () => {
    let roleAndPermissions: Array<Response.RoleResources> = [];

    const response = await GET(
      apiUrl.Account.GetRoleResources,
      false,
      GetToken()
    );
    if (response.success) {
      const accessPage = (await PagePermission.IsUserPermitted(
        "CanViewAllRoles",
        response.data?.$values
      )) as boolean;
      await setAccessPage(accessPage);
      roleAndPermissions = response.data?.$values;
      let key = 0;
      roleAndPermissions.forEach((element) => {
        key = key + 1;
        element.key = key;
        element.numberOfPermissions = element.roleResources?.$values?.length;
        element.active = SetActiveStatus(element.isActive);
      });
      await setRow(roleAndPermissions);
      await setOriginalRow(roleAndPermissions);
    }
  };
  useEffect(() => {
    GetPermissions();
    GetRoleAndPermissions();
  }, []);
  return (
    <XpressLayout>
      {accessPage ? (
        <>
          <RoleModalPage
            showModal={showModal}
            CreateRoleResources={CreateRoleResources}
            UpdateRoleResources={UpdateRoleResources}
            setModal={setModal}
            setRoleResourcesRequest={setRoleResources}
            roleResourcesRequest={roleResources}
            isEdit={state.isEdit}
            isError={state.isError}
            errorMessage={state.errorMessage}
            loading={state.loading}
          />
          <section className="admin-kyc-container">
            <main>
              {" "}
              <Header
                OpenCreateModal={OpenCreateRoleModal}
                Search={Search}
                showCreateButton={true}
              />
            </main>

            <main style={{ marginLeft: 20, marginRight: 20 }}>
              <DataTable rows={rows} columns={column} loading={state.loading}/>
            </main>
          </section>
        </>
      ) : (
        <UnAuthorizePage />
      )}
    </XpressLayout>
  );
};
