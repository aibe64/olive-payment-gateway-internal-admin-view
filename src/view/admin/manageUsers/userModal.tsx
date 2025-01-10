import { Modal } from "antd";
import React from "react";
import { Props } from "../../../models/application/props";
import { Form, Input, Row, Button, Select, Col, Tooltip } from "antd";
import Alert from "../../../shared/components/alert";
import { PagePermission } from "../../../shared/functions/pagePermission";
const UserTable: React.FC<Props.MerchantUserModalProps> = (props) => {
 // const {getAdminRoles} : any = useSelector((state) => state);
// let roles: Response.MerchantRoles[] = getAdminRoles;
  return (
    <>
      <Modal
        style={{ borderRadius: "5px", width: "500px !important" }}
        title={
          props.isEdit ? "Update User Information" : "Add User Information"
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
        <Form
          onFinish={() => {
            props.isEdit ? props.UpdateUser() : props.CreateUser();
          }}
          layout="vertical"
        >
          <Row>
            <Col
              style={{ marginRight: "13px" }}
              className="gutter-row"
              span={12}
            >
              <Form.Item
                label="First Name"
                rules={[
                  { required: true, message: "Please input first name!" },
                ]}
              >
                <Input
                  disabled
                  value={props.userRequest?.firstName}
                  onChange={(e) =>
                    props.setUserRequest({
                      ...props.userRequest,
                      firstName: e.target.value,
                    })
                  }
                  placeholder="input first name"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={11}>
              <Form.Item
                label="Last Name"
                rules={[{ required: true, message: "Please input last name!" }]}
              >
                <Input
                  disabled
                  value={props.userRequest?.lastName}
                  onChange={(e) =>
                    props.setUserRequest({
                      ...props.userRequest,
                      lastName: e.target.value,
                    })
                  }
                  placeholder="input last name"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Email"
                rules={[{ required: true, message: "Please input email!" }]}
              >
                <Input
                  disabled
                  value={props.userRequest?.email}
                  onChange={(e) =>
                    props.setUserRequest({
                      ...props.userRequest,
                      email: e.target.value,
                    })
                  }
                  placeholder="input email name"
                />
              </Form.Item>
            </Col>
            {/* <Col span={24}>
              <Form.Item label="Phone Number">
                <Input
                  disabled
                  value={props.userRequest?.phoneNumber}
                  onChange={(e) =>
                    props.setUserRequest({
                      ...props.userRequest,
                      phoneNumber: e.target.value,
                    })
                  }
                  placeholder="phone number"
                />
              </Form.Item>
            </Col> */}
            <Col span={24}>
              <Form.Item label="Role">
                <Select
                  onChange={(e) =>
                    props.setUserRequest({
                      ...props.userRequest, 
                      roleId: parseInt(e + ""),
                    })
                  }
                >
                  {props.roles?.map((x) => (
                    <Select.Option value={x.id + ""}>
                      {x.description}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
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
                    !PagePermission.IsUserActionPermitted("CanUpdateUser")
                      ? "Not Authorized"
                      : ""
                  }
                  color={"orange"}
                  key={"orange"}
                >
                  <Button
                    disabled={
                      !PagePermission.IsUserActionPermitted("CanUpdateUser")
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
                  >
                    Update
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip
                  placement="leftTop"
                  title={
                    !PagePermission.IsUserActionPermitted("CanCreateUser")
                      ? "Not Authorized"
                      : ""
                  }
                  color={"orange"}
                  key={"orange"}
                >
                  <Button
                    disabled={
                      !PagePermission.IsUserActionPermitted("CanCreateUser")
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
                    onClick={(e) => props.CreateUser()}
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

export default UserTable;
