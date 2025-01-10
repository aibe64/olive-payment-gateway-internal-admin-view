import { Col, Divider, Drawer, Row } from "antd";
import logo from "../../images/logo.svg";
import {
  commerceMenu,
  getStartedMenus,
  manageUserMenu,
  PaymentMenu,
} from "./mobileMenuData";
import { LoginOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import apiConfig from "../../service/apiConfig";
import { Request } from "../../models/client/apiRequest";
import { Response } from "../../models/client/apiResponse";
import { useSelector } from "react-redux";
import { POST } from "../../service/apiService";
interface DrawerProps {
  visible: boolean;
  onClose: () => {};
}
export const MobileMenu: React.FC<DrawerProps> = (props) => {
  const { getConfig }: any = useSelector((state: any) => state);
  const navigate = useNavigate();
  const config: Response.Settings = getConfig;
  const header = (
    <div style={{ display: "flex" }}>
      <img src={logo} alt="" />
      <span style={{ color: "green", fontWeight: 600 }}>Xpress</span>
      <span style={{ color: "orange", fontWeight: 600, marginRight: "65%" }}>
        Pay
      </span>
      <span
        onClick={props.onClose}
        style={{ fontSize: 23, color: "grey", cursor: "pointer" }}
      >
        X
      </span>
    </div>
  );
  async function LogOut() {
    let email = localStorage.getItem("*********") as string;
    let request = { email: email };
    const response = await POST(
      config.SSOBackendDomain + apiConfig.Account.LogOut,
      request
    );
    if (response.success) {
      await localStorage.clear();
      await sessionStorage.clear();
      window.location.href = `${config.SSODomain}?redirectTo=${window.location.origin}&lastPath=${window.location.href}`;
    } else {
      await localStorage.clear();
      await sessionStorage.clear();
      window.location.href = `${config.SSODomain}?redirectTo=${window.location.origin}&lastPath=${window.location.href}`;
    }
  }
  return (
    <>
      <Drawer
        title={header}
        placement={"right"}
        closable={false}
        onClose={props.onClose}
        visible={props.visible}
        key={"right"}
      >
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ width: "100%" }}
        >
          <Col className="gutter-row" span={12}>
            <p style={{ fontWeight: 600, color: "green" }}>Home/Setup</p>
            {getStartedMenus.map((x) => (
              <div
                onClick={() => {
                  props.onClose();
                  navigate(x.url);
                }}
                style={{ display: "flex", cursor: "pointer", marginBottom: 10 }}
                key={x.url}
              >
                {" "}
                <div
                  style={{
                    border: "2px solid green",
                    borderRadius: "50%",
                    marginRight: 5,
                    height: 20,
                    width: 20,
                    background: "green",
                    textAlign: "center",
                  }}
                >
                  <img
                    height={10}
                    width={10}
                    src={x.logo}
                    alt=""
                    style={{ marginBottom: 10 }}
                  />
                </div>
                {x.title}
              </div>
            ))}
          </Col>
          <Col className="gutter-row" span={12}>
            <p style={{ fontWeight: 600, color: "green" }}>Manage Users</p>
            {manageUserMenu.map((x) => (
              <div
                onClick={() => {
                  props.onClose();
                  navigate(x.url);
                }}
                style={{ display: "flex", cursor: "pointer", marginBottom: 10 }}
                key={x.url}
              >
                {" "}
                <div
                  style={{
                    border: "2px solid green",
                    borderRadius: "50%",
                    marginRight: 5,
                    height: 20,
                    width: 20,
                    background: "green",
                    textAlign: "center",
                  }}
                >
                  <img
                    height={10}
                    width={10}
                    src={x.logo}
                    alt=""
                    style={{ marginBottom: 10 }}
                  />
                </div>
                {x.title}
              </div>
            ))}
          </Col>
          <Divider />
          <Col className="gutter-row" span={12} style={{}}>
            <p style={{ fontWeight: 600, color: "green" }}>Commerce</p>
            {commerceMenu.map((x) => (
              <div
                onClick={() => {
                  props.onClose();
                  navigate(x.url);
                }}
                style={{ display: "flex", cursor: "pointer", marginBottom: 10 }}
                key={x.url}
              >
                {" "}
                <div
                  style={{
                    border: "2px solid green",
                    borderRadius: "50%",
                    marginRight: 5,
                    height: 20,
                    width: 20,
                    background: "green",
                    textAlign: "center",
                  }}
                >
                  <img
                    height={10}
                    width={10}
                    src={x.logo}
                    alt=""
                    style={{ marginBottom: 10 }}
                  />
                </div>
                {x.title}
              </div>
            ))}
          </Col>
          <Col className="gutter-row" span={12} style={{}}>
            <p style={{ fontWeight: 600, color: "green" }}>Payments</p>
            {PaymentMenu.map((x) => (
              <div
                onClick={() => {
                  props.onClose();
                  navigate(x.url);
                }}
                style={{ display: "flex", cursor: "pointer", marginBottom: 10 }}
                key={x.url}
              >
                {" "}
                <div
                  style={{
                    border: "2px solid green",
                    borderRadius: "50%",
                    marginRight: 5,
                    height: 20,
                    width: 20,
                    background: "green",
                    textAlign: "center",
                  }}
                >
                  <img
                    height={10}
                    width={10}
                    src={x.logo}
                    alt=""
                    style={{ marginBottom: 10 }}
                  />
                </div>
                {x.title}
              </div>
            ))}
            <div
              onClick={() => {
                props.onClose();
                LogOut();
              }}
              style={{ display: "flex", marginTop: 40, color: "red" }}
            >
              <div
                style={{
                  border: "2px solid green",
                  borderRadius: "50%",
                  marginRight: 5,
                  height: 20,
                  width: 20,
                  background: "green",
                  textAlign: "center",
                }}
              >
                <LoginOutlined
                  style={{ color: "white", fontSize: 16, paddingBottom: 10 }}
                />
              </div>
              Log Out
            </div>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};
