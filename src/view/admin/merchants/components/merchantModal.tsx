import { Modal } from "antd";
import React from "react";
import { Props } from "../../../../models/application/props";
import {
  Form,
  Input,
  Row,
  Button,
  Checkbox,
  Select,
  Switch,
  Col,
  Radio,
} from "antd";
import Alert from "../../../../shared/components/alert";
import Search from "antd/lib/input/Search";
import { Response } from "../../../../models/client/apiResponse";
import { useSelector } from "react-redux";

const MerchantModal: React.FC<Props.MerchantModal> = (props) => {
  const { getBanks }: any = useSelector((state) => state);
  const [form] = Form.useForm();
  const banks: Array<Response.Banks> = getBanks;
  const getBankName = (bankCode: string): string => {
    const bankName = banks?.filter((x) => {
      return x.bankCode === bankCode;
    })[0]?.bankName;
    return bankName as string;
  };

  return (
    <>
      <Modal
        style={{ borderRadius: "5px", width: "100px" }}
        title={"Update Merchant Information"}
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
            onClick={(e) => props.UpdateMerchant()}
          >
            Update
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
        {props.merchantRequest?.approvalStatus === 3 ? (
          <Alert
            setShow={function () {}}
            alert={{
              show: true,
              message: `Disapproval Comment: ${props.merchantRequest.disapprovedComment}`,
              type: "error",
              setShow: function () {},
            }}
          />
        ) : (
          ""
        )}

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
                  onChange={(e) =>
                    props.setMerchantRequest({
                      ...props.merchantRequest,
                      businessNumber: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>

            <Col className="gutter-row" span={12}>
              <Form.Item label="Email">
                <Input
                  value={props.merchantRequest?.businessEmail}
                  style={{ color: "black" }}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="ChargeBack Email">
                <Input
                  value={props.merchantRequest?.disputeEmail}
                  style={{ color: "black" }}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Transaction Limit">
                <Select
                  onChange={(e) =>
                    props.setMerchantRequest({
                      ...props.merchantRequest,
                      transactionLimit: e.toString(),
                    })
                  }
                  value={
                    props.merchantRequest?.transactionLimit
                      ? props.merchantRequest?.transactionLimit
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : ""
                  }
                >
                  {props.transactionLimits?.$values?.map((x) => (
                    <Select.Option value={x.limit as string}>
                      {x.limit}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Bank">
                <Select
                  value={props.merchantRequest?.bankCode}
                  onChange={(e) =>
                    props.setMerchantRequest({
                      ...props.merchantRequest,
                      bankCode: e.toString(),
                      bankName: getBankName(e),
                    })
                  }
                  placeholder="Select Bank"
                >
                  {Array.isArray(banks)
                    ? banks?.map((x) => (
                        <Select.Option
                          id={x.bankName}
                          value={x.bankCode as string}
                        >
                          {x.bankName}
                        </Select.Option>
                      ))
                    : ""}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Processing Fees">
                <Select
                  value={
                    props.merchantRequest?.isProcessingFees
                      ? "Yes"
                      : props.merchantRequest?.isProcessingFees === false
                      ? "No"
                      : "Yes"
                  }
                >
                  <Select.Option value={"true"}>Yes</Select.Option>
                  <Select.Option value={"false"}>No</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Settlement Account">
                <Search
                  value={props.merchantRequest?.settlementAccountNumber}
                  onChange={(e) =>
                    props.setMerchantRequest({
                      ...props.merchantRequest,
                      settlementAccountNumber: e.target.value,
                    })
                  }
                  onSearch={() => props.ValidateAccountNumber()}
                  enterButton="Validate"
                  size="large"
                  loading={props.validating as boolean}
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
            <Col className="gutter-row" span={12}>
              <Form.Item label="Settlement Account Name">
                <Input
                  value={props.merchantRequest?.accountName}
                  style={{ color: "black" }}
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Form.Item
          style={{ marginBottom: "-1px" }}
          label="Status"
          valuePropName="checked"
        >
          <Switch
            checked={props.merchantRequest?.isActive}
            onChange={(checked) =>
              props.setMerchantRequest({
                ...props.merchantRequest,
                isActive: checked,
              })
            }
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
        <Form.Item
          style={{ marginTop: "0px", marginBottom: "3px" }}
          label="Enable International Payment"
          valuePropName="checked"
        >
          <Switch
            checked={props.merchantRequest?.receiveInternationalPayment}
            onChange={(checked) =>
              props.setMerchantRequest({
                ...props.merchantRequest,
                receiveInternationalPayment: checked,
              })
            }
          />
        </Form.Item>
        <Form.Item
          style={{ marginTop: "0px", marginBottom: "3px" }}
          label="Enable Payment Page Customization"
          valuePropName="checked"
        >
          <Switch
            checked={props.merchantRequest?.isPaymentPageCustomizationEnabled}
            onChange={(checked) =>
              props.setMerchantRequest({
                ...props.merchantRequest,
                isPaymentPageCustomizationEnabled: checked,
              })
            }
          />
        </Form.Item>
        <Form.Item
          style={{ marginTop: "0px", marginBottom: "3px" }}
          label="Does Merchant Exists on Old Gateway"
          valuePropName="checked"
        >
          <Switch
            checked={props.merchantRequest?.oldMerchantExist}
            onChange={(checked) =>
              props.setMerchantRequest({
                ...props.merchantRequest,
                oldMerchantExist: checked,
              })
            }
          />
        </Form.Item>
        {props.merchantRequest?.oldMerchantExist ? (
          <Form.Item style={{ marginTop: "0px", marginBottom: "3px" }} label="">
            <div style={{ display: "flex" }}>
              <Input
                className="old_merchant_id"
                onChange={(e) =>
                  props.setMerchantRequest({
                    ...props.merchantRequest,
                    oldMerchantIdForPayload: e.target.value,
                  })
                }
                value={props.merchantRequest?.oldMerchantIdForPayload}
                placeholder="Enter old merchant Id"
                style={{ color: "black" }}
              />
              <Button
                onClick={() => props.MapMerchant()}
                loading={props.processingMapping}
                style={{
                  backgroundColor: "rgb(43, 135, 43)",
                  border: "none",
                  color: "white",
                  marginLeft: 10,
                }}
              >
                Map Merchant
              </Button>
            </div>
          </Form.Item>
        ) : (
          ""
        )}

        <span style={{ fontWeight: "bold" }}>Payment Page Access</span>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.cardPayment}
                onChange={(e) =>
                  props.setMerchantRequest({
                    ...props.merchantRequest,
                    cardPayment: e.target.checked,
                  })
                }
              >
                Card
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.eNaira}
                onChange={(e) =>
                  props.setMerchantRequest({
                    ...props.merchantRequest,
                    eNaira: e.target.checked,
                  })
                }
              >
                eNaira
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.walletPayment}
                onChange={(e) =>
                  props.setMerchantRequest({
                    ...props.merchantRequest,
                    walletPayment: e.target.checked,
                  })
                }
              >
                Wallet
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.tokenization}
                onChange={(e) =>
                  props.setMerchantRequest({
                    ...props.merchantRequest,
                    tokenization: e.target.checked,
                  })
                }
              >
                Tokenization
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.accountPayment}
                onChange={(e) =>
                  props.setMerchantRequest({
                    ...props.merchantRequest,
                    accountPayment: e.target.checked,
                  })
                }
              >
                Account
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.qrPayment}
                onChange={(e) =>
                  props.setMerchantRequest({
                    ...props.merchantRequest,
                    qrPayment: e.target.checked,
                  })
                }
              >
                QR Code
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.ussdPayment}
                onChange={(e) =>
                  props.setMerchantRequest({
                    ...props.merchantRequest,
                    ussdPayment: e.target.checked,
                  })
                }
              >
                USSD
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item>
              <Checkbox
                checked={props.merchantRequest?.bankTrasferPayment}
                onChange={(e) =>
                  props.setMerchantRequest({
                    ...props.merchantRequest,
                    bankTrasferPayment: e.target.checked,
                  })
                }
              >
                Transfer
              </Checkbox>
            </Form.Item>
          </Col>
          <Row
            style={{ width: "115%", marginLeft: "0px", marginTop: "-15px" }}
            gutter={20}
          >
            <Col
              style={{ marginBottom: "15px" }}
              className="gutter-row"
              span={24}
            >
              <span style={{ fontWeight: "bold" }}>Charge</span>
              <br />
              <Radio.Group
                onChange={(e) =>
                  props.setMerchantRequest({
                    ...props.merchantRequest,
                    whoToCharge: e.target.value,
                  })
                }
                value={props.merchantRequest?.whoToCharge}
              >
                <Radio style={{ marginRight: "60px" }} value={"Merchant"}>
                  Charge Merchant
                </Radio>
                <Radio value={"Customer"}>Charge Customer</Radio>
              </Radio.Group>
            </Col>
          </Row>
          {props.merchantRequest?.whoToCharge === "Customer" ? (
            <Form form={form} layout="vertical">
              <Row style={{ width: "115%", marginLeft: "0px" }} gutter={20}>
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
                      style={{ width: "210px" }}
                      placeholder="Enter charge value..."
                      onChange={(e) =>
                        props.setMerchantRequest({
                          ...props.merchantRequest,
                          chargeValue: e?.target.value,
                        })
                      }
                      value={
                        props.merchantRequest?.chargeValue +
                        `${
                          props.merchantRequest?.chargeType === "Percentage" &&
                          !props.merchantRequest?.chargeValue?.includes("%")
                            ? "%"
                            : ""
                        }`
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          ) : (
            ""
          )}
        </Row>
      </Modal>
    </>
  );
};

export default MerchantModal;
