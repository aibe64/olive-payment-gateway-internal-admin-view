import React from "react";
import { Tooltip, Typography } from "antd";
import { AppStorageKeys } from "@/models";
import { OliveMenuItems } from "../UI";
import { AppStorage } from "@/store";
import { APIResponse } from "@/models/client";
import {logo} from '@/assets';

const SideBar: React.FC<{ className?: string }> = ({ className }) => {
  const userInfo = AppStorage.getItem<APIResponse.LoginInfo>(AppStorageKeys.UserInfo);

  return (
    <nav
      className={`border-r dark:border-[#1F1F1F] overflow-hidden border-[#F1F1F1] dark:bg-primary-dark h-screen relative ${className} flex-col justify-between`}
    >
      <div className="grid gap-5 lg:overflow-hidden mb-5">
        <div className="flex items-center justify-between px-5 pt-3">
          <div className="flex flex-col gap-2 items-center">
            <img src={logo} alt="" className="w-[4rem]"/>
            <Tooltip
              title={userInfo?.firstName?.toUpperCase() ?? "Olivepay"}
              placement="top"
            >
              <Typography
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="text-center !text-[1.1rem] !font-inter-semibold !text-ellipsis !whitespace-nowrap !w-48"
              >
                {userInfo?.userRole}
              </Typography>
            </Tooltip>
          </div>
        </div>
        <OliveMenuItems />
      </div>
      <div className="absolute bottom-0 p-5 hidden lg:block">
        <Typography
          className="!font-inter-medium text-gray-text !text-[11px]"
          style={{ width: "99%" }}
        >
          Olive Payment - Licensed by the Central Bank of
          Nigeria
        </Typography>
      </div>
    </nav>
  );
};

export default SideBar;
