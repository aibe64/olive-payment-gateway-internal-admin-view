/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Button, Col, Divider, Dropdown, Row } from "antd";
import {
  BankOutlined,
  LogoutOutlined,
  HomeOutlined,
  BellFilled,
} from "@ant-design/icons";
import placeholder from "../../images/placeholder.png";
import "./style.css";
import { useEffect, useState, useCallback } from "react";
import { MobileMenu } from "./mobileMenu";
import { useSelector } from "react-redux";
import { Request } from "../../models/client/apiRequest";
import { Response } from "../../models/client/apiResponse";
import { Encryption } from "../functions/encryption";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../service/actions/types";
import { State } from "../../models/application/state";
import { ComplianceState } from "../../service/state/complianceState";
import { useNavigate } from "react-router-dom";
import { MERCHANT_ADMIN_PORTAL } from "@/utils";

export const TopBar = () => {
  const { MerchantDetails, getConfig, notificationState }: any = useSelector(
    (state: any) => state
  );
  const state: Request.MerchantAccountRequest = MerchantDetails;
  const notification: State.Notification = notificationState;
  const config: Response.Settings = getConfig;
  const [userInfo, setUserInfo] = useState<Response.UserInfo>();
  const [pageTitle, setPageTitle] = useState("Get Started");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function LogOut() {
    await sessionStorage.clear();
    await sessionStorage.clear();
    window.location.href = `${MERCHANT_ADMIN_PORTAL}`;
  }

  async function GetPageName() {
    let url = window.location.href;
    let urlNames: string[] = url.split("/");
    let page = urlNames[urlNames.length - 1];
    let formattedPage = page.split("?")[0];
    let pages: string[] = formattedPage.split("-");
    let pageName = "";
    pages.forEach((element: string, index: number) => {
      if (index === 0) {
        pageName = element;
      } else {
        pageName = `${pageName} ${element}`;
      }
    });
    setPageTitle(pageName);
  }
  const getNotification = useCallback(() => {
    dispatch({
      type: ActionTypes.Merchants.Get_Notification,
      payload: { ...notification },
    });
  }, [notification]);
  const GetMerchantName = () => {
    if (sessionStorage.getItem("***")) {
      const userInfo: Response.UserInfo = JSON.parse(
        Encryption.decrypt(sessionStorage.getItem("***") as string)
      );
      setUserInfo(userInfo);
    } else {
      sessionStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    }
  };
  const [visible, setVisible] = useState(false);
  const setState = () => {
    setVisible(false);
  };
  const timeNotified = (date: any) => {
    date = Date.now() - Date.parse(date);
    const dateDifference = new Date(Date.now() - date);
    return ComplianceState.SetTimeSince(dateDifference);
  };
  const updateNotification = (notificationDetails: Response.Notification) => {
    dispatch({
      type: ActionTypes.Merchants.Update_Notification,
      payload: {
        ...notification,
        request: {
          ...notification.request,
          id: notificationDetails.id,
          merchantId: notificationDetails.merchantId,
          isVisited: true,
        },
      },
    });
    if (notificationDetails.isAdmin) {
      navigate("/admin/compliance/Kyc-documents");
    } else {
      navigate("/kyc-document");
    }
  };
  useEffect(() => {
    getNotification();
    GetPageName();
    GetMerchantName();
  }, []);
  const content = (
    <div className="shadow-md bg-white w-[270px] h-auto">
      <Row style={{ width: "100%", margin: 5 }}>
        <Col style={{ marginTop: 10, marginLeft: 10 }} md={24}>
          <span style={{ fontWeight: 600, color: "rgb(107, 119, 140)" }}>
            Account
          </span>
        </Col>
        <Col style={{ marginTop: 10, marginLeft: 10 }} md={3}>
          <img
            height={30}
            width={30}
            src={placeholder}
            alt=""
            style={{
              border: "2px solid green",
              borderRadius: "50%",
              marginRight: 5,
            }}
          />
        </Col>
        <Col md={15} style={{ marginTop: 5 }}>
          <span>{`${userInfo?.firstName} ${userInfo?.lastName}`}</span>
          <p style={{ fontSize: ".785714em" }}>{userInfo?.email}</p>
        </Col>
      </Row>
      <Divider style={{ marginBottom: 10, marginTop: 10 }}></Divider>

      <Row style={{ width: "100%" }}>
        <Col style={{ marginLeft: 10, marginBottom: 10 }} md={24}>
          <span style={{ fontWeight: 600, color: "rgb(107, 119, 140)" }}>
            {userInfo?.isInternalUser ? "Company" : "Business"}
          </span>
        </Col>
        <Col className="xpress-settings" style={{ marginLeft: 10 }} md={3}>
          <a style={{ fontWeight: 500, color: "rgb(23, 43, 77)" }}>
            <BankOutlined
              style={{
                border: "2px solid green",
                borderRadius: "50%",
                marginRight: 5,
                height: 30,
                width: 30,
                fontSize: 20,
              }}
            />
          </a>
        </Col>
        <Col md={15} style={{ marginTop: -5 }}>
          <span>
            {userInfo?.isInternalUser
              ? "Xpress Payments Solution"
              : state.businessName}
          </span>
          <p style={{ fontSize: ".785714em" }}>{userInfo?.email}</p>
        </Col>
      </Row>
      <Divider style={{ marginBottom: 10 }}></Divider>
      <Row
        onClick={() => (window.location.href = `${config.SSODomain}home`)}
        style={{ width: "100%", cursor: "pointer" }}
      >
        <Col style={{ marginLeft: 10, marginBottom: 20 }} md={24}>
          <a style={{ fontWeight: 500, color: "rgb(23, 43, 77)" }}>
            <HomeOutlined /> Home
          </a>
        </Col>
      </Row>
      <Divider style={{ marginTop: 0 }}></Divider>
      <Row
        onClick={() => LogOut()}
        className="xpress-logout"
        style={{ width: "100%", cursor: "pointer" }}
      >
        <Col style={{ marginLeft: 10, marginBottom: 20 }} md={24}>
          <a style={{ fontWeight: 500, color: "rgb(23, 43, 77)" }}>
            <LogoutOutlined /> Log Out
          </a>
        </Col>
      </Row>
    </div>
  );
  const notificationContent = (
    <div className="xpress_notification-dropdown">
      <Row style={{ width: "100%", margin: 5 }}>
        <Col style={{ marginTop: 10, textAlign: "center" }} md={24}>
          {notification.data?.length > 0 ? (
            <span style={{ fontWeight: 600, color: "Black" }}>
              Notifications
            </span>
          ) : (
            <span style={{ fontWeight: 600, color: "rgb(107, 119, 140)" }}>
              No notification yet
            </span>
          )}
        </Col>
        <Divider style={{ marginBottom: 10, marginTop: 10 }}></Divider>
        {notification?.data?.map((x) => (
          <>
            {" "}
            <Col
              onClick={() => updateNotification(x)}
              md={24}
              style={{
                marginTop: 0,
                color: "rgb(107, 119, 140)",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {x.isVisited ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      fontSize: 12,
                      width: "100%",
                      color: "black",
                      marginBottom: 0,
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ color: "#965507" }}>KYC</span>
                    <div
                      style={{
                        color: "rgb(107, 119, 140)",
                        marginRight: 10,
                      }}
                    >
                      {timeNotified(x.dateCreated)}
                    </div>
                  </div>{" "}
                  <p
                    className="xp_notification"
                    style={{
                      fontSize: 12,
                      width: "85%",
                    }}
                  >
                    {x.notificationMessage}
                  </p>
                </>
              ) : (
                <Badge.Ribbon
                  text="New"
                  placement={"end"}
                  style={{ background: "green", marginRight: 10 }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: 12,
                      width: "50%",
                      color: "black",
                      marginBottom: 0,
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ color: "#965507" }}>KYC</span>
                    <div
                      style={{
                        color: "rgb(107, 119, 140)",
                        marginRight: 10,
                      }}
                    >
                      {timeNotified(x.dateCreated)}
                    </div>
                  </div>{" "}
                  <p
                    className="xp_notification"
                    style={{
                      fontSize: 12,
                      width: "85%",
                    }}
                  >
                    {x.notificationMessage}
                  </p>
                </Badge.Ribbon>
              )}
            </Col>
            <Divider style={{ marginBottom: 10, marginTop: 0 }}></Divider>
          </>
        ))}
      </Row>
    </div>
  );
  return (
    <header className="flex justify-between items-center p-4 shadow-md w-full">
      <h1> {pageTitle.toUpperCase()}</h1>
      <div className="flex gap-2 items-center">
        <Dropdown
          overlay={notificationContent}
          trigger={["click"]}
          placement={"bottomRight"}
        >
          <Badge
            style={{ marginRight: 15, cursor: "pointer" }}
            count={
              notification?.data
                ? notification.data?.filter((x) => x.isVisited === false).length
                : null
            }
          >
            <BellFilled
              style={{
                fontSize: 22,
                color: "green",
                cursor: "pointer",
              }}
            />
          </Badge>
        </Dropdown>
        <Button className="px-2">
          {" "}
          <span style={{ color: "green" }}>Xpress</span>
          <span style={{ color: "orange" }}>Admin</span>
        </Button>
        <Dropdown overlay={content} trigger={["click"]}>
          <img
            height={30}
            width={30}
            src={placeholder}
            alt=""
            style={{
              border: "2px solid green",
              borderRadius: "50%",
              marginRight: 5,
              cursor: "pointer",
            }}
          />
        </Dropdown>
        <MobileMenu visible={visible} onClose={setState as any} />
      </div>
    </header>
  );
};
