import { Modal } from "antd";
import React from "react";
import { Props } from "../../../../models/application/props";
import { Form, Input, Row, Button, Checkbox, Select, Switch, Col,Tooltip } from "antd";
import Alert from '../../../../shared/components/alert'
import { PagePermission } from "../../../../shared/functions/pagePermission";

const BinModal: React.FC<Props.BinModal> = (props) => {
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
          !props.isEdit ? 
          <Tooltip
          placement="leftTop"
          title={
            !PagePermission.IsUserActionPermitted("CanCreateBin")
              ? "Not Authorized"
              : ""
          }
          color={"orange"}
          key={"orange"}
        >
          <Button
           disabled={
            !PagePermission.IsUserActionPermitted("CanCreateBin")
          }
            style={{ backgroundColor: "#2B872B", border: "none" }}
            key="submit"
            type="primary"
            htmlType="submit"
            loading={props.loading}
            onClick={(e) => props.CreateBin()}
          >
            Submit
          </Button> 
          </Tooltip>
          : 
          <Tooltip
        placement="leftTop"
        title={
          !PagePermission.IsUserActionPermitted("CanUpdateBin")
            ? "Not Authorized"
            : ""
        }
        color={"orange"}
        key={"orange"}
      >
            <Button
             disabled={
              !PagePermission.IsUserActionPermitted("CanUpdateBin")
            }
            style={{ backgroundColor: "#2B872B", border: "none" }}
            key="submit"
            type="primary"
            htmlType="submit"
            loading={props.loading}
            onClick={(e) => props.UpdateBin()}
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
          <Form.Item label="Provider">
            <Select
            value={props.binRequest?.provider}
              onChange={(e) => {
                props.setBinRequest({
                  ...props.binRequest,
                  provider: e?.toString(),
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
          <Form.Item label="Bin Name">
            <Input
            value={props.binRequest?.binName}
              onChange={(e) =>
                props.setBinRequest({
                  ...props.binRequest,
                  binName: e.target.value, 
                })
              }
              placeholder="input placeholder"
            />
          </Form.Item> 
          <Form.Item label="Card Brand">
            <Select
            value={props.binRequest?.cardBrand}
              onChange={(e) => {
                props.setBinRequest({
                  ...props.binRequest,
                  cardBrand: e?.toString(),
                });
              }}
            >
              {props.cardBrand?.map((x) => (
                <Select.Option
                  value={x.brand as string}
                  selected={x.brand === props.binRequest?.cardBrand}
                >
                  {x.brand}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
        <Form.Item label="Status" valuePropName="checked">
          <Switch
            checked = {props.binRequest?.isActive}
            onChange={(e) =>
              props.setBinRequest({
                ...props.binRequest,
                isActive: e,
              })
            }
          />
        </Form.Item>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Form.Item>
              <Checkbox
               checked={props.binRequest?.isPinRequired} 
                onChange={(e) =>
                  props.setBinRequest({
                    ...props.binRequest,
                    isPinRequired: e.target.checked,
                  })
                }
              >
                Pin Required
              </Checkbox>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item>
              <Checkbox 
               checked={props.binRequest?.isOthersRequired}
               onChange={(e) =>
                 props.setBinRequest({
                   ...props.binRequest,
                   isOthersRequired: e.target.checked,
                 })
               }
              >Others Required</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default BinModal;
