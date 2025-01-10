import { Modal } from "antd";
import React from "react";
import { Props } from "../../../../models/application/props";
import { Form, Input, Row, Button, Checkbox, Select, Switch, Col,Tooltip } from "antd";
import Alert from '../../../../shared/components/alert'
import { PagePermission } from "../../../../shared/functions/pagePermission";

const NewProvider: React.FC<Props.ProviderModal> = (props) => {
  const [form] = Form.useForm();
  
  return (
    <>
      <Modal
        style={{ borderRadius: "5px", width: "100px" }}
        title= {props.isEdit ? "Update Provider Information" : "Add Provider Information"}
        centered
        visible={props.showModal}
        onOk={() => props.setModal(false)}
        onCancel={() => props.setModal(false)}
        footer={[
          !props.isEdit ? (
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
              onClick={(e) => props.CreateProvider()}
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
              onClick={(e) => props.UpdateProvider()}
            >
              Update
            </Button>
            </Tooltip>
          )
         ,
          <Button key="back" onClick={() => props.setModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Alert
          setShow={function () {}}
          alert={{
            show: props.isError as boolean,
            message: props.errorMessage,
            type: "error",
            setShow: function () {},
          }}
        />
        <Form form={form} layout="vertical">
          <Form.Item label="Name">
            <Select
            value={props.providerRequest?.name}
              onChange={(e) => {
                props.setProviderRequest({ 
                  ...props.providerRequest, 
                  name: e?.toString(),
                });
              }}
            >
              {props.banks?.map((x) => (
                <Select.Option
                  value={x.bankName as string}
                >
                  {x.bankName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Short Name"
          >
            <Input
              value={props.providerRequest?.shortName}
              onChange={(e) =>
                props.setProviderRequest({
                  ...props.providerRequest,
                  shortName: e.target.value,
                })
              }
              placeholder="input short name"
            />
          </Form.Item>
        </Form>
        <Form.Item label="Status" valuePropName="checked">
          <Switch
            checked={props.providerRequest?.isActive}
            onChange={(e) =>
              props.setProviderRequest({
                ...props.providerRequest,
                isActive: e,
              })
            }
          />
        </Form.Item>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Form.Item>
              <Checkbox
                checked={props.providerRequest?.card}
                onChange={(e) =>
                  props.setProviderRequest({
                    ...props.providerRequest,
                    card: e.target.checked,
                  })
                }
              >
                Card
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item>
              <Checkbox
                checked={props.providerRequest?.account}
                onChange={(e) =>
                  props.setProviderRequest({
                    ...props.providerRequest,
                    account: e.target.checked,
                  })
                }
              >
                Account
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item>
              <Checkbox
                checked={props.providerRequest?.bankTransfer}
                onChange={(e) =>
                  props.setProviderRequest({
                    ...props.providerRequest,
                    bankTransfer: e.target.checked,
                  })
                }
              >
                Bank
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item>
              <Checkbox
                checked={props.providerRequest?.wallet}
                onChange={(e) =>
                  props.setProviderRequest({
                    ...props.providerRequest,
                    wallet: e.target.checked,
                  })
                }
              >
                Wallet
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item>
              <Checkbox
                checked={props.providerRequest?.qr}
                onChange={(e) =>
                  props.setProviderRequest({
                    ...props.providerRequest,
                    qr: e.target.checked,
                  })
                }
              >
                QR
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <Form.Item>
              <Checkbox
                checked={props.providerRequest?.ussd}
                onChange={(e) =>
                  props.setProviderRequest({
                    ...props.providerRequest,
                    ussd: e.target.checked,
                  })
                }
              >
                USSD
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default NewProvider;
