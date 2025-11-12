import {
  SunOutlined,
  MoonOutlined,
  MenuOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { NotificationIcon } from "@/assets";
import { useCallback, useState } from "react";
import { APIResponse, AppStorageKeys } from "@/models";
import { Avatar, Drawer, Dropdown, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { LogOut, useTheme } from "../UI";
import {  AppStorage, useModalStore } from "@/store";
import { ROUTE_PATH } from "@/models";
import { OliveSideBar } from "../Layout";

const Header = () => {
  const userInfo = AppStorage.getItem<APIResponse.LoginInfo>(AppStorageKeys.UserInfo);
  const { themeMode, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const { set } = useModalStore();

  const onLogout = useCallback(() => {
    set({
      body: <LogOut logOutOnRender={false} />,
      width: 400,
      closable: false,
      open: true,
      title: <></>
    });
  }, [set]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={ROUTE_PATH.Profile}>Profile</Link>,
    },
    { type: "divider" },
    {
      key: "2",
      label: (
        <div onClick={onLogout}>
          <button>LogOut</button>
        </div>
      ),
    },
  ];

  return (
    <header className="dark:border-b dark:border-b-[#1F1F1F] dark:bg-primary-dark flex items-center px-2 md:px-5 justify-between relative">
      <MenuOutlined
        onClick={() => setOpen(true)}
        className="lg:!hidden dark:text-[#FFFFFF]"
      />
      <div className="flex items-center w-full justify-end">
        <div className="flex items-center gap-5 justify-end">
          <NotificationIcon
            color={themeMode === "dark" ? "#FFFFFF" : "#000000"}
          />
          <button onClick={toggleTheme}>
            {themeMode === "dark" ? (
              <SunOutlined className="text-[#FFFFFF]" />
            ) : (
              <MoonOutlined />
            )}
          </button>
          <button type="button" className="items-center hidden sm:flex gap-1">
            <Avatar
              size={45}
              className="bg-[#006F011A] font-inter-bold text-primary"
            >
              {`${
                userInfo?.firstName
                  ? userInfo?.firstName?.charAt(0)?.toUpperCase()
                  : "Admin"
              }
                ${
                  userInfo?.lastName
                    ? userInfo?.firstName?.charAt(0)?.toUpperCase()
                    : "User"
                }`}
            </Avatar>
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              rootClassName="w-44 mt-20"
            >
              <CaretDownOutlined className="dark:text-[#FFFFFF] mt-3" />
            </Dropdown>
          </button>
        </div>
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="left"
        closable={false}
        width="75%"
      >
        <OliveSideBar />
      </Drawer>
    </header>
  );
};

export default Header;
