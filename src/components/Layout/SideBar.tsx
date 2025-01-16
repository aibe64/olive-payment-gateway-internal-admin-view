import React from "react";
import { Dropdown, MenuProps, Tooltip, Typography } from "antd";
import { Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { ROUTE_PATH } from "@/models";
import { XpressMenuItems } from "../UI";
import { AppStorage } from "@/store";
import { APIResponse } from "@/models/client";

const SideBar: React.FC<{ className?: string }> = ({ className }) => {
  const userInfo = AppStorage.getItem<APIResponse.LoginInfo>("");

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={ROUTE_PATH.Users}>Developer Docs</Link>,
    },
    { type: "divider" },
    {
      key: "2",
      label: <Link to={ROUTE_PATH.Users}>Support</Link>,
    },
    { type: "divider" },
    {
      key: "3",
      label: (
        <Link to={ROUTE_PATH.Users}>Merchant ID: {userInfo?.merchantId}</Link>
      ),
    },
    { type: "divider" },
    {
      key: "4",
      label: <Link to={ROUTE_PATH.Landing}>Logout</Link>,
    },
  ];

  return (
    <nav
      className={`border-r dark:border-[#1F1F1F] overflow-hidden border-[#F1F1F1] dark:bg-primary-dark h-screen relative ${className} flex-col justify-between`}
    >
      <div className="grid gap-5 lg:overflow-hidden mb-5">
        <div className="flex items-center justify-between p-5">
          <div className="">
            <Tooltip
              title={userInfo?.firstName?.toUpperCase() ?? "Xpresspay"}
              placement="top"
            >
              <Typography
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="!text-[1.1rem] !font-inter-semibold !text-ellipsis !whitespace-nowrap !w-48"
              >
                {userInfo?.firstName?.toUpperCase() ?? "Xpresspay"}
              </Typography>
            </Tooltip>
            {userInfo?.merchantId && (
              <Typography className="!text-[0.8rem]">
                Merchant ID:{" "}
                <button type="button" className="text-[#FF6D00]">
                  {userInfo?.merchantId}
                </button>
              </Typography>
            )}
          </div>
          <Dropdown menu={{ items }} placement="bottom" rootClassName="p-10">
            <CaretDownOutlined className="dark:text-[#FFFFFF]" />
          </Dropdown>
        </div>
        <XpressMenuItems />
      </div>
      <div className="absolute bottom-0 p-5 hidden lg:block">
        <Typography
          className="!font-inter-medium text-gray-text !text-[11px]"
          style={{ width: "99%" }}
        >
          Xpress Payment Solutions Limited - Licensed by the Central Bank of
          Nigeria
        </Typography>
      </div>
    </nav>
  );
};

export default SideBar;
