import { Modal } from "antd";
import React from "react";
import { Props } from "../../../../models/application/props";
import { Form, Input, Row, Button, Checkbox, Col,Tooltip } from "antd";
import Alert from "../../../../shared/components/alert";
import { PagePermission } from "../../../../shared/functions/pagePermission";

const InstitutionModal: React.FC<Props.InstitutionModal> = (props) => {
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        style={{ borderRadius: "5px", width: "100px" }}
        title={"Update Institution"}
        centered
        visible={props.showModal}
        onOk={() => props.setModal(false)}
        onCancel={() => props.setModal(false)}
        footer={[
          <Tooltip
          placement="leftTop"
          title={
            !PagePermission.IsUserActionPermitted("CanUpdateInstitutions")
              ? "Not Authorized"
              : ""
          }
          color={"orange"}
          key={"orange"}
        >
          <Button
           disabled={
            !PagePermission.IsUserActionPermitted("CanUpdateInstitutions")
          }
            style={{ backgroundColor: "#2B872B", border: "none" }}
            key="submit"
            type="primary"
            htmlType="submit"
            loading={props.loading}
            onClick={(e) => props.UpdateInstitution()}
          >
            Update
          </Button>
          </Tooltip>,
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
            <Input value={props.institutionRequest?.bankName} disabled />
          </Form.Item>
          <Form.Item label="Processor">
            <Input
              value={props.institutionRequest?.provider}
              onChange={(e) =>
                props.setInstitutionRequest({
                  ...props.institutionRequest,
                  provider: e.target.value
                })
              }
            />
          </Form.Item>
        </Form>
        <Row gutter={16}>
          <Col className="gutter-row" span={13}>
            <Form.Item>
              <Checkbox
                checked={
                  props.institutionRequest?.isVisibleToMerchantForPayment
                }
                onChange={(e) =>
                  props.setInstitutionRequest({
                    ...props.institutionRequest,
                    isVisibleToMerchantForPayment: e.target.checked,
                  })
                }
              >
                Visible To Payment
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={10}>
            <Form.Item>
              <Checkbox
                checked={props.institutionRequest?.isNameRequired}
                onChange={(e) =>
                  props.setInstitutionRequest({
                    ...props.institutionRequest,
                    isNameRequired: e.target.checked,
                  })
                }
              >
                Name Required
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={13}>
            <Form.Item>
              <Checkbox
                checked={props.institutionRequest?.isDateOfBirthRequired}
                onChange={(e) =>
                  props.setInstitutionRequest({
                    ...props.institutionRequest,
                    isDateOfBirthRequired: e.target.checked,
                  })
                }
              >
                Date of Birth Required
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={10}>
            <Form.Item>
              <Checkbox
                checked={props.institutionRequest?.isBvnRequired}
                onChange={(e) =>
                  props.setInstitutionRequest({
                    ...props.institutionRequest,
                    isBvnRequired: e.target.checked,
                  })
                }
              >
                BVN Required
              </Checkbox>
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={13}>
            <Form.Item>
              <Checkbox
                checked={props.institutionRequest?.isPhoneNumberRequired}
                onChange={(e) =>
                  props.setInstitutionRequest({
                    ...props.institutionRequest,
                    isPhoneNumberRequired: e.target.checked,
                  })
                }
              >
                Phone Number Required
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={10}>
            <Form.Item>
              <Checkbox
                checked={props.institutionRequest?.isNarrationRequired}
                onChange={(e) =>
                  props.setInstitutionRequest({
                    ...props.institutionRequest,
                    isNarrationRequired: e.target.checked,
                  })
                }
              >
                Narration Required
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={13}>
            <Form.Item>
              <Checkbox
                checked={props.institutionRequest?.isPinRequired}
                onChange={(e) =>
                  props.setInstitutionRequest({
                    ...props.institutionRequest,
                    isPinRequired: e.target.checked,
                  })
                }
              >
                Pin Required
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default InstitutionModal;
