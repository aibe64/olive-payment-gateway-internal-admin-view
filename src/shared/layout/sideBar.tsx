/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { AdminSideBar } from "./adminSideBar";
import { Encryption } from "../functions/encryption";
import { Response } from "../../models/client/apiResponse";
import { allMenus } from "./menu";
import { MERCHANT_ADMIN_PORTAL } from "@/utils";

export const XpressSideBar = () => {
  const [adminName, setAdminName] = useState("");
  const GetAdminName = () => {
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
  const page: any = setKey();
  const [pageTitle, setPageTitle] = useState("Get Started");

  async function LogOut() {
    RedirectUser();
  }
  const RedirectUser = async () => {
    await sessionStorage.clear();
    await sessionStorage.clear();
    window.location.href = `${MERCHANT_ADMIN_PORTAL}`;
  };

  async function GetUserInfo() {
    if (!sessionStorage.getItem("***")) {
      LogOut();
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
    GetPageName();
    GetUserInfo();
    GetAdminName();
  }, []);
  return (
    <nav className="w-[15rem] flex flex-col gap-7 py-5 bg-primary min-h-screen justify-between">
      <div className="flex flex-col gap-5">
        {" "}
        <div className="px-5">
          <h1 className="text-[1rem] text-white">{adminName}</h1>
        </div>
        <AdminSideBar
          OpenMenu={() => {}}
          CollapseMenu={() => {}}
          setPageTitle={setPageTitle}
          pageTitle={pageTitle}
          menus={{}}
          page={page}
        />
      </div>

      <footer
       className="px-2 text-white text-[0.7rem]"
      >
        <span>
          Xpress Payment Solutions Limited - <br />
          Licensed by the Central Bank of Nigeria
        </span>
      </footer>
    </nav>
  );
};
