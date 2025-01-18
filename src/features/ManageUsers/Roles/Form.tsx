import { XpressButton, XpressField, XpressForm } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse, State } from "@/models";
import { APIRequest } from "@/models";
import { endpoints } from "@/service";
import { useFormStore, useModalStore } from "@/store";
import { Checkbox, Col, Divider, Form, Row, Switch } from "antd";
import { FC, useCallback, useEffect, useState } from "react";

export const UpdateRoles: FC<{
  isCreate: boolean;
  records?: APIResponse.Roles;
}> = ({ isCreate, records }) => {
  const { callGetData, fetching, data } = useAPI<
    Array<APIResponse.Permissions>
  >({ isDataTable: false });
  const [permissions, setPermissions] = useState<
    Array<APIResponse.Permissions>
  >([]);
  const { set } = useModalStore();
  const {
    setFormState,
    clearForm,
    setPayload,
    payload,
  }: State.Form<APIRequest.Provider> = useFormStore();

  const closeModal = useCallback(() => {
    set({
      open: false,
      showCloseButton: undefined,
      title: undefined,
      body: undefined,
      clearPayloadOnClose: true,
    });
    clearForm();
  }, [set]);

  useEffect(() => {
    if (records && !isCreate) {
      setFormState("payload", {
        ...records,
      });
    } else {
      clearForm();
    }
  }, [records, setFormState, isCreate, clearForm]);

  useEffect(() => {
    callGetData(endpoints.Account.GetPermissions);
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setPermissions(data);
    }
  }, [data]);

  return (
    <XpressForm<APIRequest.RoleAndPermission>
      callApi
      extraValues={{
        id: !isCreate ? records?.id : undefined,
      }}
      apiConfig={{
        endpoint: isCreate
          ? endpoints.Account.CreateRoleResources
          : endpoints.Account.UpdateRoleResources,
        showToastAfterApiResponse: true,
        method: "POST",
        reloadTable: true,
        callBack() {
          closeModal();
        },
      }}
      className="px-2 gap-0"
    >
      <XpressField
        name="roleName"
        label="Role Name"
        type="text"
        placeholder="Enter role name"
        key={"1"}
        required
      />
      <XpressField
        name="description"
        label="Role Description"
        key={"2"}
        required
      />
      <div className="flex gap-2">
        <label htmlFor="status">Status</label>
        <Switch
          onChange={(checked) => setPayload("isActive", checked)}
          checked={payload?.isActive ?? false}
        />
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <span>Permissions</span>
        <Row
          gutter={16}
          style={{ overflow: "scroll", height: "280px", marginBottom: "10px" }}
        >
          {permissions?.map((x, index) => (
            <Col className="gutter-row" span={12}>
              <Form.Item>
                <Checkbox checked={x.isChecked}>{x.name}</Checkbox>
              </Form.Item>
            </Col>
          ))}
        </Row>
      </div>
      <Divider />
      <XpressButton.Submit
        title={isCreate ? "Create Role" : "Update Update"}
      />
    </XpressForm>
  );
};
