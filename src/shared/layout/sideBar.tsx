/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AdminSideBar } from "./adminSideBar";
import BankIcon from "../../images/icons/BankIcon.svg";
import { Encription } from "../functions/encryption";
import { POST } from "../../service/apiService";
import { Response } from "../../models/client/apiResponse";
import { Request } from "../../models/client/apiRequest";
import apiConfig from "../../service/apiConfig";
import { allMenus } from "./menu";
import { MerchantSideBar } from "./merchantSideBar";
import { useSelector } from "react-redux";

export const XpressSideBar = () => {
  const { MerchantDetails }: any = useSelector((state: any) => state);
  const state: Request.MerchantAccountRequest = MerchantDetails;
  const [merchantName, setMerchantName] = useState("");
  const GetMerchantName = () => {
    if (localStorage.getItem("***")) {
      const userInfo: Response.UserInfo = JSON.parse(
        Encription.decrypt(localStorage.getItem("***") as string)
      );
      setMerchantName(userInfo?.firstName + " " + userInfo?.lastName);
    } else {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  const setKey = (): { key: string; subKey: string } => {
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
    const menus = allMenus.filter((x) => {
      return x.name === pageName;
    });
    if (Array.isArray(menus) && menus.length > 0) {
      const menu = menus[0];
      return {
        key: menu.key,
        subKey: menu.subKey,
      };
    } else {
      return {
        key: "",
        subKey: "",
      };
    }
  };
  const [isAdmin, setIsAdmin] = useState(false);
  const page: any = setKey();
  const [ssoBackendDomain, setSSOBackendDomain] = useState("");
  const [domain, setSSOdomain] = useState("");
  const [menu, setMenu] = useState(new Array<Response.Menu>());
  const [pageTitle, setPageTitle] = useState("Get Started");
  // const [menus, setMenus] = useState({
  //   Payment: "start",
  //   Vas: "start",
  //   Commerce: "start",
  //   Transfers: "start",
  //   Setup: "start",
  //   Users: "start",
  //   BusinessProfile: "start",
  // });
  async function LogOut() {
    let email = localStorage.getItem("*********") as string;
    if (email !== null || email) {
      let request = { email: email };
      const response = await POST(
        ssoBackendDomain + apiConfig.Account.LogOut,
        request
      );
      if (response.success) {
        RedirectUser();
      } else {
        RedirectUser();
      }
    } else {
      RedirectUser();
    }
  }
  const RedirectUser = async () => {
    await localStorage.clear();
    await sessionStorage.clear();
    window.location.href = `${domain}?redirectTo=${window.location.origin}&lastPath=${window.location.href}`;
  };
  async function GetConfig() {
    await fetch("../config.json").then((response) => {
      response.json().then(async (settings) => {
        await setMenu(settings.Menu);
        await setSSOdomain(settings.SSODomain);
        await setSSOBackendDomain(settings.SSOBackendDomain);
      });
    });
  }
  async function GetUserInfo() {
    if (!localStorage.getItem("***")) {
      LogOut();
    }
    let userInfo: Response.UserInfo = JSON.parse(
      Encription.decrypt(localStorage.getItem("***") as string)
    );
    if (userInfo) {
      if (userInfo.isInternalUser) {
        await setIsAdmin(true);
      } else {
        await setIsAdmin(false);
      }
    }
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

  useEffect(() => {
    GetConfig();
    GetPageName();
    GetUserInfo();
    GetMerchantName();
  }, []);
  return (
    <main className="xpress-menu">
      <div className="xpress-user-title">
        <div
          style={{
            position: "absolute",
            marginTop: 7,
            marginLeft: 5,
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            background: "rgb(23 83 23)",
            border: "3px solid #2B872B",
          }}
        >
          <span
            style={{
              color: "rgb(7 90 7)",
              position: "absolute",
              width: "9px",
              height: "19px",
              left: "6px",
            }}
          >
            <img alt="" src={BankIcon} />
          </span>
        </div>
        <div
          style={{
            color: "#005D01",
            marginTop: 15,
            marginLeft: 40,
            lineHeight: "15px",
            display: "inline-block",
          }}
        >
          <span style={{ color: "#005D01", fontSize: "15px", fontWeight: 600 }}>
            {isAdmin
              ? merchantName
              : state.businessName
              ? state.businessName
              : localStorage.getItem("*******")}
          </span>
        </div>
      </div>
      {isAdmin ? (
        <AdminSideBar
          OpenMenu={() => {}}
          CollapseMenu={() => {}}
          setPageTitle={setPageTitle}
          pageTitle={pageTitle}
          menus={{}}
          menu={menu}
          page={page}
        />
      ) : (
        <MerchantSideBar
          OpenMenu={() => {}}
          CollapseMenu={() => {}}
          setPageTitle={setPageTitle}
          pageTitle={pageTitle}
          menus={{}}
          menu={menu}
          page={page}
        />
      )}
    </main>
  );
};
