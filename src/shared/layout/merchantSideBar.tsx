/* eslint-disable react-hooks/exhaustive-deps */
import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import getStarted from "../../images/icons/Getstartedicon.svg";
import ComplianceIcon from "../../images/icons/Complianceicon.svg";
import HomeIcon from "../../images/icons/Homeicon.svg";
import TransactionsIcon from "../../images/icons/Transactionsicon.svg";
import CustomersIcon from "../../images/icons/Customersicon.svg";
import CommerceIcon from "../../images/icons/CommerceIcon.svg";
// import TransactionsplitIcon from "../../images/icons/Transactionspliticon.svg";
// import SubscribersIcon from "../../images/icons/Subscribersicon.svg";
import StorefrontIcon from "../../images/icons/Storefronticon.svg";
import SettingsIcon from "../../images/icons/Settingsicon.svg";
import ProductIcon from "../../images/icons/Producticon.svg";
// import PayoutsIcon from "../../images/icons/Payoutsicon.svg";
import PaymentPageIcon from "../../images/icons/PaymentPageicon.svg";
// import OrdersIcon from "../../images/icons/Ordersicon.svg";
import InvoicesIcon from "../../images/icons/Invoicesicon.svg";
// import DisputeIcon from "../../images/icons/Disputeicon.svg";
// import BillsIcon from "../../images/icons/Billsicon.svg";
// import BalanceIcon from "../../images/icons/Balanceicon.svg";
// import AuditlogIcon from "../../images/icons/Auditlogicon.svg";
// import AirtimeIcon from "../../images/icons/Airtimeicon.svg";
// import GroupIcon from "../../images/icons/Groupicon.svg";
import PaymentMenuIcon from "../../images/icons/PaymentMenuIcon.svg";
// import TransferIcon from "../../images/icons/TransferIcon.svg";
// import VASicon from "../../images/icons/VASicon.svg";
import KYCdocIcon from "../../images/icons/kycDoc.svg";
import { useNavigate } from "react-router-dom";
import { Props } from "../../models/application/props";
import apiConfig, { apiDomain } from "../../service/apiConfig";
import { GET } from "../../service/apiService";
import { Request } from "../../models/client/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../models/application/state";
import { ActionTypes } from "../../service/actions/types";
const { SubMenu } = Menu;

export const MerchantSideBar: React.FC<Props.LeftSideBarProps> = (props) => {
  const { compliancePageState }: any = useSelector((state) => state);
  const state = compliancePageState as State.ComplianceState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCompletedRegistration, setIsCompletedRegistration] = useState(false);
  
  const releaseComplainceField = () => {
    dispatch({
      type: ActionTypes.CompliancePage.Set_Compliance_Page_State,
      payload: {
        ...state,
        disableFields: false
      },
    })
  }
  async function FetchMerchantDetails() {
    if (Number(localStorage.getItem("****"))) {
      const response = await GET(
        apiDomain + apiConfig.Merchants.MerchantByID + localStorage.getItem("****")
      );
      if (response.success) {
        let merchant: Request.MerchantAccountRequest = response.data;
        if (merchant.isRegistrationCompleted) {
          setIsCompletedRegistration(true);
        }
      }
    }
  }
  useEffect(() => {
    FetchMerchantDetails();
  }, []);
  return (
    <main>
      <Menu
        theme="light"
        className="sidebarMenu"
        mode="inline"
        style={{ height: "100%", color: "white", width: "100%" }}
      >
        <Menu
          style={{
            background: "#124B13",
            maxHeight: "100%",
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[props.page?.key as string]}
          defaultOpenKeys={[props.page?.subKey as string]}
        >
          <Menu.Item
            onClick={() => {
              navigate("/Home");
              props.setPageTitle("Get Started");
            }}
            key="1"
            icon={<img alt="" src={getStarted} style={{ height: 14, width:20 }} />}
          >
            GET STARTED
          </Menu.Item>
          <Menu.Item
          className="dashboard-tooltip"
            onClick={() => {
              navigate("/Dashboard");
              props.setPageTitle("Dashboard");
            }}
            style={{ paddingLeft: "49px", width: "100%", paddingTop: "1px" }}
            key="2"
            icon={<img alt="" src={HomeIcon} style={{ height: 14, width:20 }} />}
          >
            DASHBOARD
          </Menu.Item>
          {isCompletedRegistration ? (
            ""
          ) : (
            <Menu.Item
              onClick={() => {
                releaseComplainceField()
                navigate("/Compliance");
                props.setPageTitle("Compliance");
              }}
              style={{ paddingLeft: "49px", width: "100%" }}
              key="3"
              icon={
                <img alt="" src={ComplianceIcon} style={{ height: 14, width:20 }} />
              }
            >
              COMPLIANCE
            </Menu.Item>
          )}

          <SubMenu
          className="user-tooltip"
            key="user"
            icon={<img alt="" src={CustomersIcon} style={{ height: 14, width:20 }} />}
            title="MANAGE USERS"
          >
            <Menu.Item
              onClick={() => {
                navigate("/Users");
                props.setPageTitle("Users");
              }}
              key="41"
              icon={
                <img alt="" src={CustomersIcon} style={{ height: 14, width:20 }} />
              }
            >
              Users
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/kyc-document");
                props.setPageTitle("KYC Document");
              }}
              key="42"
              icon={<img alt="" src={KYCdocIcon} style={{ height: 14, width:20 }} />}
            >
              KYC Document
            </Menu.Item>
          </SubMenu>
          <SubMenu
          className="payments-tooltip"
            key="payment"
            icon={
              <img alt="" src={PaymentMenuIcon} style={{ height: 14, width:20 }} />
            }
            title="PAYMENTS"
          >
            <Menu.Item
              onClick={() => {
                navigate("/transactions");
                props.setPageTitle("Transactions");
              }}
              key="51"
              icon={
                <img alt="" src={TransactionsIcon} style={{ height: 14, width:20 }} />
              }
            >
              Transactions
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/validate-receipt");
                props.setPageTitle("Validate Receipt");
              }}
              key="52"
              icon={
                <img alt="" src={InvoicesIcon} style={{ height: 14, width:20 }} />
              }
            >
              Validate Receipt
            </Menu.Item>
            {/* <Menu.Item
              key="7"
              icon={
                <img alt="" src={CustomersIcon} style={{ height: 14, width:20 }} />
              }
            >
              Customers
            </Menu.Item> */}
            {/* <Menu.Item
              key="8"
              icon={<img alt="" src={PayoutsIcon} style={{ height: 14, width:20 }} />}
            >
              Payouts
            </Menu.Item> */}
            {/* <Menu.Item
              key="9"
              icon={<img alt="" src={DisputeIcon} style={{ height: 14, width:20 }} />}
            >
              Disputes
            </Menu.Item> */}
            {/* <Menu.Item
              key="10"
              icon={
                <img alt="" src={SubscribersIcon} style={{ height: 14, width:20 }} />
              }
            >
              Subcribers
            </Menu.Item> */}
            {/* <Menu.Item
              key="11"
              icon={
                <img
                  alt=""
                  src={TransactionsplitIcon}
                  style={{ height: 14, width:20 }}
                />
              }
            >
              Transaction Splits
            </Menu.Item> */}
          </SubMenu>
          {/* <SubMenu
          className="transfers-tooltip"
            key="sub3"
            icon={<img alt="" src={TransferIcon} style={{ height: 14, width:20  }} />}
            title="TRANSFERS"
          >
            <Menu.Item
              key="12"
              icon={<img alt="" src={GroupIcon} style={{ height: 14, width:20 }} />}
            >
              Transfer
            </Menu.Item>

            <Menu.Item
              key="13"
              icon={<img alt="" src={BalanceIcon} style={{ height: 14, width:20 }} />}
            >
              Balance
            </Menu.Item>
          </SubMenu> */}

          {/* <SubMenu
            key="sub4"
            icon={<img alt="" src={VASicon} style={{ height: 14, width:20 }} />}
            title="VAS"
          >
            <Menu.Item
              key="14"
              icon={<img alt="" src={AirtimeIcon} style={{ height: 14, width:20 }} />}
            >
              Airtime
            </Menu.Item>
            <Menu.Item
              key="15"
              icon={<img alt="" src={BillsIcon} style={{ height: 14, width:20 }} />}
            >
              Bills
            </Menu.Item>
          </SubMenu> */}
          <SubMenu
          className="commerce-tooltip"
            key="commerce"
            icon={<img alt="" src={CommerceIcon} style={{ height: 14, width:20 }} />}
            title="COMMERCE"
          >
            <Menu.Item
              onClick={() => {
                navigate("/payment-page");
                props.setPageTitle("Payment Page");
              }}
              key="61"
              icon={
                <img alt="" src={PaymentPageIcon} style={{ height: 14, width:20 }} />
              }
            >
              Payment Pages
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/products");
                props.setPageTitle("Products");
              }}
              key="62"
              icon={<img alt="" src={ProductIcon} style={{ height: 14, width:20 }} />}
            >
              Product
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/store-fronts");
                props.setPageTitle("Store Fronts");
              }}
              key="63"
              icon={
                <img alt="" src={StorefrontIcon} style={{ height: 14, width:20 }} />
              }
            >
              Storefronts
            </Menu.Item>
            {/* <Menu.Item
              key="9"
              icon={<img alt="" src={OrdersIcon} style={{ height: 14, width:20 }} />}
            >
              Orders
            </Menu.Item>
            <Menu.Item
              key="10"
              icon={
                <img alt="" src={InvoicesIcon} style={{ height: 14, width:20 }} />
              }
            >
              Invoice
            </Menu.Item> */}
          </SubMenu>
          {/* <Menu.Item
            style={{ marginTop: "10%" }}
            onClick={() => navigate("/Home")}
            key="22"
            icon={<img alt="" src={AuditlogIcon} style={{ height: 14, width:20  }} />}
          >
            AUDIT LOGS
          </Menu.Item> */}
          <Menu.Item
            onClick={() => {
              navigate("/settings");
              props.setPageTitle("Settings");
            }}
            key="23"
            icon={<img alt="" src={SettingsIcon} style={{ height: 14, width:20  }} />}
          >
            SETTINGS
          </Menu.Item>
        </Menu>
      </Menu>
    </main>
  );
};
