/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AdminSideBar } from "./adminSideBar";
import BankIcon from "../../images/icons/BankIcon.svg";
import { Encryption } from "../functions/encryption";
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
  const [adminName, setAdminName] = useState("");
  const GetadminName = () => {
    if (sessionStorage.getItem("***")) {
      const userInfo: Response.UserInfo = JSON.parse(
        Encryption.decrypt(sessionStorage.getItem("***") as string)
      );
      setAdminName(userInfo?.firstName + " " + userInfo?.lastName);
    } else {
      sessionStorage.clear();
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
    let email = sessionStorage.getItem("*********") as string;
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
    await sessionStorage.clear();
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
    if (!sessionStorage.getItem("***")) {
      LogOut();
    }
    let userInfo: Response.UserInfo = JSON.parse(
      Encryption.decrypt(sessionStorage.getItem("***") as string)
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
    GetadminName();
  }, []);
  return (
    <nav className="w-[15rem] flex flex-col gap-7 py-5 bg-primary min-h-screen">
      <div className="px-5">
        <h1 className="text-[1.1rem]">{adminName}</h1>
      </div>
      <AdminSideBar
        OpenMenu={() => {}}
        CollapseMenu={() => {}}
        setPageTitle={setPageTitle}
        pageTitle={pageTitle}
        menus={{}}
        menu={menu}
        page={page}
      />
    </nav>
  );
};
