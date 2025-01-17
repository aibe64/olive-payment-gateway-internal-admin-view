import {
  SunOutlined,
  MoonOutlined,
  MenuOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { NotificationIcon } from "@/assets";
import { useState } from "react";
import { APIResponse } from "@/models";
import { Avatar, Drawer, Dropdown, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { Logout, useTheme } from "../UI";
import { usePageStore, AppStorage } from "@/store";
import { ROUTE_PATH, State } from "@/models";
import { XpressSideBar } from "../Layout";

const Header = () => {
  const { showLogout } = usePageStore<State.Layout>((state) => state);
  const userInfo = AppStorage.getItem<APIResponse.LoginInfo>("");
  const { themeMode, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={ROUTE_PATH.Users}>Profile</Link>,
    },
    { type: "divider" },
    {
      key: "2",
      label: <Link to={ROUTE_PATH.Landing}>Logout</Link>,
    },
  ];

  return (
    <header className="dark:border-b dark:border-b-[#1F1F1F] dark:bg-primary-dark flex items-center px-2 md:px-5 justify-between relative">
      {showLogout && <Logout />}
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
        <XpressSideBar />
      </Drawer>
    </header>
  );
};

export default Header;
