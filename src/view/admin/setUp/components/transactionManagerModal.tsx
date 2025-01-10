import { Modal } from "antd";
import React from "react";
import { Props } from "../../../../models/application/props";
import { Form, Input, Button, Select, Switch,Tooltip } from "antd";
import { PagePermission } from "../../../../shared/functions/pagePermission";

const TransactionManagerodal: React.FC<Props.TransactionManageModal> = (props) => {
  const [form] = Form.useForm();
  return (
    <>
      <Modal
        style={{ borderRadius: "5px", width: "100px" }}
        title="Add Provider Information"
        centered
        visible={props.showModal}
        onOk={() => props.setModal(false)}
        onCancel={() => props.setModal(false)}
        footer={[ 
          <Tooltip
          placement="leftTop"
          title={
            !PagePermission.IsUserActionPermitted("UpdateCardTransactionManager")
              ? "Not Authorized"
              : ""
          }
          color={"orange"}
          key={"orange"}
        >
            <Button
             disabled={
              !PagePermission.IsUserActionPermitted("UpdateCardTransactionManager")
            }
            style={{ backgroundColor: "#2B872B", border: "none" }}
            key="submit"
            type="primary"
            htmlType="submit"
            loading={props.loading}
            onClick={(e) => props.UpdateTransactionManager()}
          >
            Update
          </Button>
          </Tooltip>
          ,
          <Button key="back" onClick={() => props.setModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
        <Form.Item label="Bin Name">
            <Input
            style={{ color:'black'}}
            value={props.tranManagerRequest?.merchantName}
            disabled
            readOnly
              placeholder="input placeholder"
            />
          </Form.Item>
          <Form.Item label="Static Route Processor">
            <Select
            value={props.tranManagerRequest?.staticRouteProvider}
              onChange={(e) => {
                props.setTranManagerRequest({
                  ...props.tranManagerRequest,
                   staticRouteProvider: e?.toString(),
                });
              }}
            >
              {props.providers?.map((x) => (
                <Select.Option
                  value={x.shortName as string}
                 
                >
                  {x.shortName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Default Processor">
            <Select
             value={props.tranManagerRequest?.defaultProvider}
              onChange={(e) => {
                props.setTranManagerRequest({
                  ...props.tranManagerRequest,
                   defaultProvider: e?.toString(),
                });
              }}
            >
              {props.providers?.map((x) => (
                <Select.Option
                  value={x.shortName as string}
                >
                  {x.shortName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
        <Form.Item label="Default Provider" valuePropName="checked">
          <Switch
            checked = {props.tranManagerRequest?.useDefaultProvider}
            onChange={(e) =>
              props.setTranManagerRequest({
                ...props.tranManagerRequest,
                useDefaultProvider: e,
              })
            }
          />
        </Form.Item>
        <Form.Item label="Use Static Route" valuePropName="checked">
          <Switch
            checked = {props.tranManagerRequest?.useStaticRoute}
            onChange={(e) =>
              props.setTranManagerRequest({
                ...props.tranManagerRequest,
                useStaticRoute: e,
              })
            }
          />
        </Form.Item>
        <Form.Item label="Use Bin" valuePropName="checked">
          <Switch
            checked = {props.tranManagerRequest?.useBin}
            onChange={(e) =>
              props.setTranManagerRequest({
                ...props.tranManagerRequest,
                useBin: e,
              })
            }
          />
        </Form.Item>
      </Modal>
    </>
  );
};

export default TransactionManagerodal;
