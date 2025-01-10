import { Modal } from "antd";
import React from "react";
import { Props } from "../../../../models/application/props";
import { Form, Input, Button, Tooltip } from "antd";
import { PagePermission } from "../../../../shared/functions/pagePermission";

const TransactionLimitModal: React.FC<Props.TransactionLimitModal> = (
  props
) => {
  const [form] = Form.useForm();
  return (
    <>
      <Modal
        style={{ borderRadius: "5px", width: "100px" }}
        title={
          !props.isCreate
            ? "Update Transaction Limit Information"
            : "Add Transaction Limit Information"
        }
        centered
        visible={props.showModal}
        onOk={() => props.setModal(false)}
        onCancel={() => props.setModal(false)}
        footer={[
          props.isCreate ? (
            <Tooltip
              placement="leftTop"
              title={
                !PagePermission.IsUserActionPermitted("CanCreateProvider")
                  ? "Not Authorized"
                  : ""
              }
              color={"orange"}
              key={"orange"}
            >
              <Button
                disabled={
                  !PagePermission.IsUserActionPermitted("CanCreateProvider")
                }
                style={{ backgroundColor: "#2B872B", border: "none" }}
                key="submit"
                type="primary"
                htmlType="submit"
                loading={props.loading}
                onClick={(e) => props.CreateTransactionLimit()}
              >
                Submit
              </Button>
            </Tooltip>
          ) : (
            <Tooltip
              placement="leftTop"
              title={
                !PagePermission.IsUserActionPermitted("CanUpdateProvider")
                  ? "Not Authorized"
                  : ""
              }
              color={"orange"}
              key={"orange"}
            >
              <Button
                disabled={
                  !PagePermission.IsUserActionPermitted("CanUpdateProvider")
                }
                style={{ backgroundColor: "#2B872B", border: "none" }}
                key="submit"
                type="primary"
                htmlType="submit"
                loading={props.loading}
                onClick={(e) => props.UpdateTransactionLimit()}
              >
                Update
              </Button>
            </Tooltip>
          ),
          <Button key="back" onClick={() => props.setModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name">
            <Input
              style={{ color: "black" }}
              value={props.tranLimitRequest?.name}
              required
              onChange={(e) => [
                props.setTranLimitRequest({
                  ...props.tranLimitRequest,
                  name: e.target.value,
                }),
              ]}
              placeholder="input placeholder"
            />
          </Form.Item>
          <Form.Item label="Limit">
            <Input
              style={{ color: "black" }}
              value={props.tranLimitRequest?.limit}
              required
              onChange={(e) => [
                props.setTranLimitRequest({
                  ...props.tranLimitRequest,
                  limit: e.target.value,
                }),
              ]}
              placeholder="input placeholder"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TransactionLimitModal;
