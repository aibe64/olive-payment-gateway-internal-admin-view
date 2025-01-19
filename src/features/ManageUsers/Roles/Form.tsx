import { XpressButton, XpressField, XpressForm } from "@/components";
import { usePermission } from "@/hooks";
import { APIResponse } from "@/models";
import { APIRequest } from "@/models";
import { endpoints } from "@/service";
import { Checkbox, Col, Divider, Form, Row, Switch } from "antd";
import { FC } from "react";

export const UpdateRoles: FC<{
  isCreate: boolean;
  records?: APIResponse.Roles;
}> = ({ isCreate, records }) => {
  const { closeModal, permissions, setPayload, payload, updatePermission } =
    usePermission(records, isCreate);
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
          {permissions?.map((x) => (
            <Col className="gutter-row" span={12}>
              <Form.Item>
                <Checkbox
                  onChange={(e) =>
                    updatePermission(x.id as number, e.target.checked)
                  }
                  checked={x.isChecked}
                >
                  {x.name}
                </Checkbox>
              </Form.Item>
            </Col>
          ))}
        </Row>
      </div>
      <Divider />
      <XpressButton.Submit title={isCreate ? "Create Role" : "Update Update"} />
    </XpressForm>
  );
};
