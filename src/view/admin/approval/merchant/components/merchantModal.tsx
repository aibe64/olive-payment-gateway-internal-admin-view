import { Modal } from "antd";
import React from "react";
import { Props } from "../../../../../models/application/props";
import { Form, Input, Row, Button, Checkbox, Select, Switch, Col } from "antd";
import Alert from "../../../../../shared/components/alert";

const NewProvider: React.FC<Props.MerchantApprovalModal> = (props) => {
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        style={{ borderRadius: "5px", width: "100px" }}
        title={"Approval Merchant Information"}
        centered
        width={800}
        visible={props.showModal}
        onCancel={() => props.setModal(false)}
        footer={[
          <Button
            style={{ backgroundColor: "#2B872B", border: "none" }}
            key="submit"
            type="primary"
            htmlType="submit"
            loading={props.loading}
            onClick={(e) => props.ApproveMerchant()}
          >
            Approve
          </Button>,
          <Button
            style={{ backgroundColor: "red", border: "none" }}
            key="submit"
            type="primary"
            htmlType="submit"
            loading={props.loadingDisapproval}
            onClick={(e) => props.DisapproveMerchant()}
          >
            Disapprove
          </Button>,
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
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Business Name">
                <Input
                  value={props.merchantRequest?.businessName}
                  style={{ color: "black" }}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Business Number">
                <Input
                  value={props.merchantRequest?.businessNumber}
                  style={{ color: "black" }}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Settlement Account">
              <Input
                  value={props.merchantRequest?.settlementAccountNumber}
                  style={{ color: "black" }}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Settlement Account Name">
              <Input
                  value={props.merchantRequest?.accountName}
                  style={{ color: "black" }}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Transaction Limit">
                <Input
                  value={props.merchantRequest?.transactionLimit}
                  style={{ color: "black" }}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Merchant Type">
                <Input
                  value={props.merchantRequest?.businessType}
                  style={{ color: "black" }}
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Form.Item label="Status" valuePropName="checked">
          <Switch
            checked={props.merchantRequest?.isActive}
            style={{ color: "black" }}
            disabled
          />
        </Form.Item>
        <Form.Item label="Enable International Payment" valuePropName="checked">
          <Switch
            checked={props.merchantRequest?.receiveInternationalPayment}
            style={{ color: "black" }}
            disabled
          />
        </Form.Item>
        <Form.Item
          style={{ marginTop: "0px", marginBottom: "3px" }}
          label="Show public Key on merchant dashboard"
          valuePropName="checked"
        >
          <Switch
            checked={props.merchantRequest?.isKeysVisible}
            onChange={(checked) =>
              props.setMerchantRequest({
                ...props.merchantRequest,
                isKeysVisible: checked,
              })
            }
          />
        </Form.Item>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.cardPayment}
                style={{ color: "black" }}
                disabled
              >
                Card
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.accountPayment}
                style={{ color: "black" }}
                disabled
              >
                Account
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.walletPayment}
                style={{ color: "black" }}
                disabled
              >
                Wallet
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.tokenization}
                style={{ color: "black" }}
                disabled
              >
                Tokenization
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.bankTrasferPayment}
                style={{ color: "black" }}
                disabled
              >
                Transfer
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.qrPayment}
                style={{ color: "black" }}
                disabled
              >
                QR Code
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.ussdPayment}
                style={{ color: "black" }}
                disabled
              >
                USSD
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.eNaira}
                style={{ color: "black" }}
                disabled
              >
                eNaira
              </Checkbox>
            </Form.Item>
          </Col>
          <Row style={{ width: "115%", marginLeft: "0px" }} gutter={20}>
            <Col className="gutter-row" span={24}>
              <Form.Item>
                <Checkbox
                  checked={props.merchantRequest?.isChargeTransferedToCustomer}
                  style={{ color: "black" }}
                  disabled
                >
                  Charge Customer
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          {props.merchantRequest?.isChargeTransferedToCustomer ? (
            <Form form={form} layout="vertical">
              <Row style={{ width: "115%", marginLeft: "0px" }} gutter={20}>
                <Col className="gutter-row" span={24}>
                  <span style={{ fontWeight: "bold" }}>Charge</span>
                </Col>
                <br />
                <Col className="gutter-row" span={12}>
                  <Form.Item label="Type">
                    <Select
                      style={{ width: "210px" }}
                      onChange={(e) =>
                        props.setMerchantRequest({
                          ...props.merchantRequest,
                          chargeType: e?.toString(),
                          chargeValue:
                            e?.toString() === "Percentage" ? "2%" : "100",
                        })
                      }
                      value={props.merchantRequest?.chargeType}
                    >
                      <Select.Option value={"Fixed"}>Fixed</Select.Option>
                      <Select.Option value={"Percentage"}>
                        Percentage
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                  <Form.Item label="Value">
                    <Input
                      style={{ width: "210px", color: "black" }}
                      disabled
                      value={props.merchantRequest?.chargeValue}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          ) : (
            ""
          )}
          <Row style={{ marginLeft: "0px" }} gutter={20}>
            <Col className="gutter-row" span={24}>
              <Form.Item label="Comment">
                <Input
                  style={{ width: "315%" }}
                  value={props.merchantRequest?.disapprovedComment}
                  onChange={(e) =>
                    props.setMerchantRequest({
                      ...props.merchantRequest,
                      disapprovedComment: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Row>
      </Modal>
    </>
  );
};

export default NewProvider;
