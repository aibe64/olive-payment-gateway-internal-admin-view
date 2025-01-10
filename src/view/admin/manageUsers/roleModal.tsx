import { Modal } from "antd";
import React from "react";
import { Props } from "../../../models/application/props";
import { Form, Input, Row, Button, Switch, Col, Checkbox,Tooltip } from "antd";
import Alert from "../../../shared/components/alert";
import { PagePermission } from "../../../shared/functions/pagePermission";
const RoleModal: React.FC<Props.MerchantRoleResourcesModalProps> = (props) => {
  return (
    <>
      <Modal
        style={{ borderRadius: "5px", width: "600px !important" }}
        title={
          props.isEdit ? "Update Role Information" : "Add Role Information"
        }
        centered
        visible={props.showModal}
        onOk={() => props.setModal(false)}
        onCancel={() => props.setModal(false)}
        footer={null}
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
        <Form onFinish={() => {
            props.isEdit ? props.UpdateRoleResources() : props.CreateRoleResources()
        }} layout="vertical">
          <Row>
            <Col
              style={{ marginRight: "13px" }}
              className="gutter-row"
              span={24}
            >
              <Form.Item
                label="Role Name"
                rules={[
                  { required: true, message: "Please input first name!" },
                ]}
              >
                <Input
                  value={props.roleResourcesRequest?.roleName}
                  onChange={(e) =>
                    props.setRoleResourcesRequest({
                      ...props.roleResourcesRequest,
                      roleName: e.target.value,
                    })
                  }
                  placeholder="input role name"
                />
              </Form.Item>
              <Form.Item
                label="Role Description"
                rules={[{ required: true, message: "Please input last name!" }]}
              >
                <Input
                  value={props.roleResourcesRequest?.description}
                  onChange={(e) =>
                    props.setRoleResourcesRequest({
                      ...props.roleResourcesRequest,
                      description: e.target.value,
                    })
                  }
                  placeholder="input description"
                />
              </Form.Item>
              <Form.Item label="Status" valuePropName="checked">
                <Switch
                  checked={props.roleResourcesRequest?.isActive}
                  onChange={(e) =>
                    props.setRoleResourcesRequest({
                      ...props.roleResourcesRequest,
                      isActive: e,
                    })
                  }
                />
              </Form.Item>
            </Col>
             <div>Role Resources</div> 
            <Row gutter={16} style={{overflow:'scroll', height:'280px', marginBottom:'10px'}}>
          
              {props.roleResourcesRequest?.permissions?.map((x,index) => 
                <Col className="gutter-row" span={12}>
                  <Form.Item> 
                    <Checkbox
                      checked={x.isChecked}
                      onChange={(e) =>
                      {
                         let resources = props.roleResourcesRequest?.permissions
                         resources![index].isChecked = e.target.checked;
                         props.setRoleResourcesRequest({...props.roleResourcesRequest, permissions:resources})
                      }
                      }
                    >
                      {x.name}
                    </Checkbox>
                  </Form.Item>
                </Col>
              )}
            </Row>
            <Col span={24}>
              <Button
                style={{ float: "right", marginLeft: "5px" }}
                key="back"
                onClick={() => props.setModal(false)}
              >
                Cancel
              </Button>
              {props.isEdit ? (
                 <Tooltip
                 placement="leftTop"
                 title={
                   !PagePermission.IsUserActionPermitted("CanUpdateRole")
                     ? "Not Authorized"
                     : ""
                 }
                 color={"orange"}
                 key={"orange"}
               >
                <Button
                 disabled={
                  !PagePermission.IsUserActionPermitted("CanUpdateRole")
                }
                  style={{
                    float: "right",
                    backgroundColor: "#2B872B",
                    border: "none",
                  }}
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  loading={props.loading}
                //  onClick={(e) => props.UpdateRoleResources()}
                >
                  Update
                </Button>
                </Tooltip>
              ) : (
                <Tooltip
                placement="leftTop"
                title={
                  !PagePermission.IsUserActionPermitted("CanCreateRole")
                    ? "Not Authorized"
                    : ""
                }
                color={"orange"}
                key={"orange"}
              >
                <Button
                  disabled={
                    !PagePermission.IsUserActionPermitted("CanCreateRole")
                  }
                  style={{
                    float: "right",
                    backgroundColor: "#2B872B",
                    border: "none",
                  }}
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  loading={props.loading}
                 // onClick={(e) => props.CreateRoleResources()}
                >
                  Submit
                </Button>
                </Tooltip>
              )}
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default RoleModal;
