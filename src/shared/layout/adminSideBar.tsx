import { Menu } from "antd";
import React from "react";
import HomeIcon from "../../images/icons/Homeicon.svg";
import CommerceIcon from "../../images/icons/CommerceIcon.svg";
import Subscribersicon from "../../images/icons/Subscribersicon.svg";
import TransactionsIcon from "../../images/icons/Transactionsicon.svg";
import CustomersIcon from "../../images/icons/Customersicon.svg";
import StorefrontIcon from "../../images/icons/Storefronticon.svg";
import SettingsIcon from "../../images/icons/Settingsicon.svg";
import ProductIcon from "../../images/icons/Producticon.svg";
import PaymentPageIcon from "../../images/icons/PaymentPageicon.svg";
import OrdersIcon from "../../images/icons/Ordersicon.svg";
import InvoicesIcon from "../../images/icons/Invoicesicon.svg";
import AuditlogIcon from "../../images/icons/Auditlogicon.svg";
import ApproveIcon from "../../images/icons/Complianceicon.svg";
import KYCdocIcon from "../../images/icons/kycDoc.svg";
import { useNavigate } from "react-router-dom";
import { Props } from "../../models/application/props";
const { SubMenu } = Menu;

export const AdminSideBar: React.FC<Props.LeftSideBarProps> = (props) => {
  const navigate = useNavigate()
  return (
    <main>
    <Menu
      theme="light"
      className="sidebarMenu"
      mode="inline"
      style={{ height: "100%", color: "white", width: "100%" }}
    >
      <Menu
          style={{ background: "#124B13" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[props.page?.key as string]}
            defaultOpenKeys={[props.page?.subKey as string]}
        > 
          <Menu.Item
            onClick={() => navigate("/admin/Home")
          }
            key="1"
            icon={<img alt="" src={HomeIcon} style={{ height: 14, width:20 }} />}
          >
            DASHBOARD
          </Menu.Item>
          <SubMenu
            key="kyc"
            icon={
              <img alt="" src={TransactionsIcon} style={{ height: 14, width:20 }} />
            }
            title="COMPLIANCE"
          >
            <Menu.Item
              onClick={() => {
                navigate("/admin/compliance/Kyc-documents");
              }}
              key="201"
              icon={
                <img alt="" src={KYCdocIcon} style={{ height: 14, width:20 }} />
              }
            >
              KYC Documents
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="bProfile"
            icon={
              <img alt="" src={Subscribersicon} style={{ height: 14, width:20 }} />
            }
            title="BUSINESS PROFILE"
          >
            <Menu.Item
              onClick={() => {
                navigate("/admin/merchants");
              }}
              key="301"
              icon={
                <img alt="" src={CustomersIcon} style={{ height: 14, width:20 }} />
              }
            >
              Merchants
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="setup"
            icon={
              <img alt="" src={SettingsIcon} style={{ height: 14, width:20 }} />
            }
            title="SETUP"
          >
               <Menu.Item
              onClick={() => {
                navigate("/admin/transaction-limit");
              }}
              key="401"
              icon={
                <img
                  alt=""
                  src={SettingsIcon}
                  style={{ height: 14, width:20 }}
                />
              }
            >
              Transaction Limit
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/admin/provider");
              }}
              key="402"
              icon={
                <img
                  alt=""
                  src={PaymentPageIcon}
                  style={{ height: 14, width:20 }}
                />
              }
            >
              Provider
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/admin/bin");
              }}
              key="403"
              icon={
                <img alt="" src={StorefrontIcon} style={{ height: 14, width:20 }} />
              }
            >
              BIN
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/admin/card-transaction-manager");
              }}
              style={{ fontSize: "10.8px" }}
              key="404"
              icon={
                <img alt="" src={ProductIcon} style={{ height: 14, width:20 }} />
              }
            >
              Transaction Manager
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/admin/institutions");
              }}
              key="405"
              icon={
                <img alt="" src={OrdersIcon} style={{ height: 14, width:20 }} />
              }
            >
              Institutions
            </Menu.Item>
            <Menu.Item
              key="9"
              icon={
                <img alt="" src={InvoicesIcon} style={{ height: 14, width:20 }} />
              }
            >
              Wallet
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="mUsers"
            icon={
              <img alt="" src={CustomersIcon} style={{ height: 14, width:20 }} />
            }
            title="MANAGE USERS"
          >
            <Menu.Item
              onClick={() => {
                navigate("/admin/system-users");
              }}
              key="501"
              icon={
                <img
                  alt=""
                  src={PaymentPageIcon}
                  style={{ height: 14, width:20 }}
                />
              }
            >
              System Users
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/admin/system-roles");
              }}
              key="502"
              icon={
                <img alt="" src={StorefrontIcon} style={{ height: 14, width:20 }} />
              }
            >
              Roles
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="report"
            icon={
              <img alt="" src={TransactionsIcon} style={{ height: 14, width:20 }} />
            }
           
            title="TRANSACTION DETAILS"
          >
            <Menu.Item
              key="13"
              icon={
                <img
                  alt=""
                  src={PaymentPageIcon}
                  style={{ height: 14, width:20 }}
                />
              }
            >
              All Reports
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/admin/transaction-reports");
              }}
              key="601"
              icon={
                <img alt="" src={ProductIcon} style={{ height: 14, width:20 }} />
              }
            >
              Transaction Reports
            </Menu.Item>
            <SubMenu
              key="sub7"
              icon={
                <img
                  alt=""
                  src={TransactionsIcon}
                  style={{ height: 14, width:20 }}
                />
              }
              title="Vas Report"
            >
              <Menu.Item
                key="15"
                icon={
                  <img
                    alt=""
                    src={PaymentPageIcon}
                    style={{ height: 14, width:20 }}
                  />
                }
              >
                Airtime
              </Menu.Item>
              <Menu.Item
                key="16"
                icon={
                  <img
                    alt=""
                    src={PaymentPageIcon}
                    style={{ height: 14, width:20 }}
                  />
                }
              >
                Bills
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              key="17"
              icon={
                <img
                  alt=""
                  src={PaymentPageIcon}
                  style={{ height: 14, width:20 }}
                />
              }
            >
              Transfer
            </Menu.Item>
            <Menu.Item
              key="18"
              icon={
                <img
                  alt=""
                  src={PaymentPageIcon}
                  style={{ height: 14, width:20 }}
                />
              }
              style={{ fontSize: "10.8px" }}
            >
              Disputed Transaction
            </Menu.Item>
            <Menu.Item
              key="19"
              icon={
                <img
                  alt=""
                  src={PaymentPageIcon}
                  style={{ height: 14, width:20 }}
                />
              }
            >
              Settlement
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub8"
            icon={
              <img alt="" src={CommerceIcon} style={{ height: 14, width:20 }} />
            }
            title="COMMERCE"
          >
            <Menu.Item
              key="20"
              icon={
                <img
                  alt=""
                  src={PaymentPageIcon}
                  style={{ height: 14, width:20 }}
                />
              }
            >
              Payment Pages
            </Menu.Item>
            <Menu.Item
              key="21"
              icon={
                <img alt="" src={ProductIcon} style={{ height: 14, width:20 }} />
              }
            >
              Product
            </Menu.Item>
            <Menu.Item
              key="22"
              icon={
                <img alt="" src={StorefrontIcon} style={{ height: 14, width:20 }} />
              }
            >
              Storefronts
            </Menu.Item>
            <Menu.Item
              key="23"
              icon={
                <img alt="" src={StorefrontIcon} style={{ height: 14, width:20 }} />
              }
            >
              Orders
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="approval"
            icon={<img alt="" src={ApproveIcon} style={{ height: 14, width:20 }} />}
            title="APPROVAL"
          >
               <Menu.Item
              key="701" 
              onClick={()=> navigate('/admin/approval/merchant-approval')
            }
              icon={
                <img alt="" src={CustomersIcon} style={{ height: 14, width:20 }} />
              }
            >
              Merchants
            </Menu.Item>
          </SubMenu>
          <Menu.Item 
            style={{ marginTop: "40px" }}
            onClick={() => navigate("/Home")
          }
            key="25"
            icon={
              <img alt="" src={AuditlogIcon} style={{ height: 14, width:20 }} />
            }
          >
           <span>AUDIT LOGS</span> 
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/Home")
          }
            key="26"
            icon={
              <img alt="" src={SettingsIcon} style={{ height: 14, width:20 }} />
            }
          >
            SETTINGS
          </Menu.Item>
        </Menu>
    </Menu>
  </main>
  );
};
