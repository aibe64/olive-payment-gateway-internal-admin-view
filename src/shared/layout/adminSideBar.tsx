import { Menu } from "antd";
import React from "react";
import HomeIcon from "../../images/icons/Homeicon.svg";
import TransactionsIcon from "../../images/icons/Transactionsicon.svg";
import CustomersIcon from "../../images/icons/Customersicon.svg";
import StorefrontIcon from "../../images/icons/Storefronticon.svg";
import SettingsIcon from "../../images/icons/Settingsicon.svg";
import ProductIcon from "../../images/icons/Producticon.svg";
import PaymentPageIcon from "../../images/icons/PaymentPageicon.svg";
import OrdersIcon from "../../images/icons/Ordersicon.svg";
import ApproveIcon from "../../images/icons/Complianceicon.svg";
import { useNavigate } from "react-router-dom";
import { Props } from "../../models/application/props";
const { SubMenu } = Menu;

export const AdminSideBar: React.FC<Props.LeftSideBarProps> = (props) => {
  const navigate = useNavigate();
  const isActive = (menuName: string) => {
    if (window.location.href.includes(menuName)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <main>
      <Menu mode="inline">
        <Menu
          className="!bg-primary"
          mode="inline"
          defaultSelectedKeys={[props.page?.key as string]}
          defaultOpenKeys={[props.page?.subKey as string]}
        >
          <Menu.Item
            onClick={() => navigate("/admin/Home")}
            key="1"
            icon={
              <img alt="" src={HomeIcon} style={{ height: 14, width: 20 }} />
            }
            style={{ background: isActive("admin/Home") ? "#5BAE7D" : "" }}
          >
            <span className="text-white">DASHBOARD</span>
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/admin/merchants")}
            key="2"
            icon={
              <img
                alt=""
                src={CustomersIcon}
                style={{ height: 14, width: 20 }}
              />
            }
            className="!mt-3 bg-primary"
            style={{
              background: isActive("/admin/merchants") ? "#5BAE7D" : "#006F01",
            }}
          >
            <span className="text-white">MERCHANT</span>
          </Menu.Item>
          <SubMenu
            key="setup"
            icon={
              <img
                alt=""
                src={SettingsIcon}
                style={{ height: 14, width: 20 }}
                className="!text-white"
              />
            }
            title="SETUP"
          >
            <Menu.Item
              onClick={() => {
                navigate("/admin/provider");
              }}
              key="402"
              style={{
                background: isActive("/admin/provider")
                  ? "#5BAE7D"
                  : "#006F01",
              }}
              icon={
                <img
                  alt=""
                  src={PaymentPageIcon}
                  style={{ height: 14, width: 20 }}
                />
              }
            >
              Provider
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/admin/bin");
              }}
              style={{
                background: isActive("/admin/bin")
                  ? "#5BAE7D"
                  : "#006F01",
              }}
              key="403"
              icon={
                <img
                  alt=""
                  src={StorefrontIcon}
                  style={{ height: 14, width: 20 }}
                />
              }
            >
              BIN
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/admin/card-transaction-manager");
              }}
              style={{
                background: isActive("/admin/card-transaction-manager")
                  ? "#5BAE7D"
                  : "#006F01",
                  fontSize: "10.8px"
              }}
              key="404"
              icon={
                <img
                  alt=""
                  src={ProductIcon}
                  style={{ height: 14, width: 20 }}
                />
              }
            >
              Transaction Manager
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/admin/institutions");
              }}
              key="405"
              style={{
                background: isActive("/admin/institutions")
                  ? "#5BAE7D"
                  : "#006F01"
              }}
              icon={
                <img
                  alt=""
                  src={OrdersIcon}
                  style={{ height: 14, width: 20 }}
                />
              }
            >
              Institutions
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="mUsers"
            icon={
              <img
                alt=""
                src={CustomersIcon}
                style={{ height: 14, width: 20 }}
              />
            }
            title="MANAGE USERS"
          >
            <Menu.Item
              onClick={() => {
                navigate("/admin/system-users");
              }}
              style={{
                background: isActive("/admin/system-users")
                  ? "#5BAE7D"
                  : "#006F01"
              }}
              key="501"
              icon={
                <img
                  alt=""
                  src={PaymentPageIcon}
                  style={{ height: 14, width: 20 }}
                />
              }
            >
              System Users
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/admin/system-roles");
              }}
              style={{
                background: isActive("/admin/system-roles")
                  ? "#5BAE7D"
                  : "#006F01"
              }}
              key="502"
              icon={
                <img
                  alt=""
                  src={StorefrontIcon}
                  style={{ height: 14, width: 20 }}
                />
              }
            >
              Roles
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="report"
            icon={
              <img
                alt=""
                src={TransactionsIcon}
                style={{ height: 14, width: 20 }}
              />
            }
            title="TRANSACTION DETAILS"
          >
            <Menu.Item
              key="13"
              icon={
                <img
                  alt=""
                  src={PaymentPageIcon}
                  style={{ height: 14, width: 20 }}
                />
              }
            >
              All Reports
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/admin/transaction-reports");
              }}
              style={{
                background: isActive("/admin/transaction-reports")
                  ? "#5BAE7D"
                  : "#006F01"
              }}
              key="601"
              icon={
                <img
                  alt=""
                  src={ProductIcon}
                  style={{ height: 14, width: 20 }}
                />
              }
            >
              Transaction Reports
            </Menu.Item>
            <Menu.Item
             onClick={() => {
              navigate("/admin/store-reports");
            }}
            style={{
              background: isActive("/admin/store-reports")
                ? "#5BAE7D"
                : "#006F01"
            }}
              key="607"
              icon={
                <img
                  alt=""
                  src={TransactionsIcon}
                  style={{ height: 14, width: 20 }}
                />
              }
            >
              Store Reports
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="approval"
            icon={
              <img alt="" src={ApproveIcon} style={{ height: 14, width: 20 }} />
            }
            title="APPROVAL"
          >
            <Menu.Item
              key="701"
              onClick={() => navigate("/admin/approval/merchant-approval")}
              style={{
                background: isActive("/admin/approval/merchant-approval")
                  ? "#5BAE7D"
                  : "#006F01"
              }}
              icon={
                <img
                  alt=""
                  src={CustomersIcon}
                  style={{ height: 14, width: 20 }}
                />
              }
            >
              Merchants
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            onClick={() => navigate("/Home")}
            key="26"
            icon={
              <img
                alt=""
                src={SettingsIcon}
                style={{ height: 14, width: 20 }}
              />
            }
          >
            SETTINGS
          </Menu.Item>
        </Menu>
      </Menu>
    </main>
  );
};
