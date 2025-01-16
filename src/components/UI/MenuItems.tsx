import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";

import { useTheme } from "./ThemeProviderComponent";
import { menuList } from "@/config";
import { Typography } from "antd";

const MenuItems: React.FC = () => {
  const { themeMode } = useTheme();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const handleSubmenuToggle = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <div className="relative overflow-auto mb-12 pl-5">
      {menuList.map((item, index) => (
        <div key={index}>
          <NavLink
            to={item.path || "#"}
            onClick={() => item.children && handleSubmenuToggle(item.label)}
            className={({ isActive }) => {
              return `${
                isActive &&
                !item.children &&
                "!text-primary dark:!text-[#FFFFFF] !bg-secondary dark:!bg-[#1F1F1F]"
              } ${
                openSubmenu === item.label && "text-primary dark:!text-primary"
              } w-[95%] flex items-center gap-2 p-4 rounded-xl dark:!text-[#656565]`;
            }}
          >
            {({ isActive }) => (
              <>
                {item.icon && (
                  <item.icon
                    color={
                      openSubmenu === item.label
                        ? "#006F01"
                        : item.children
                        ? themeMode === "light"
                          ? "#656565"
                          : "#656565"
                        : isActive && themeMode === "light"
                        ? "#006F01"
                        : isActive && themeMode === "dark"
                        ? "#FFF"
                        : themeMode === "light"
                        ? "#656565"
                        : "#656565"
                    }
                  />
                )}
                <Typography
                  className="!text-[0.8rem] !font-inter-medium"
                  style={{
                    color:
                      openSubmenu === item.label
                        ? "#006F01"
                        : item.children
                        ? themeMode === "light"
                          ? "#656565"
                          : "#656565"
                        : isActive && themeMode === "light"
                        ? "#006F01"
                        : isActive && themeMode === "dark"
                        ? "#FFF"
                        : themeMode === "light"
                        ? "#656565"
                        : "#656565",
                  }}
                >
                  {item.label}
                </Typography>
                {item.children && (
                  <CaretDownOutlined
                    className={`!absolute right-5 transition-transform ${
                      openSubmenu === item.label
                        ? "rotate-180 text-primary"
                        : ""
                    }`}
                  />
                )}
              </>
            )}
          </NavLink>

          {openSubmenu === item.label && item.children && (
            <div className="ml-5">
              {item.children.map((child, childIndex) => (
                <NavLink
                  key={childIndex}
                  to={child.path || "#"}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "!text-primary dark:!text-[#FFFFFF] !bg-secondary dark:!bg-[#1F1F1F]"
                        : "dark:!text-[#656565]"
                    } w-[95%] flex items-center gap-2 p-3 rounded-xl mt-1`
                  }
                >
                  {({ isActive }) => (
                    <div className="ml-5 flex items-center gap-2">
                      <Typography
                        className="!text-[0.75rem] !font-inter-medium"
                        style={{
                          color:
                            isActive && themeMode === "light"
                              ? "#006F01"
                              : isActive && themeMode === "dark"
                              ? "#FFF"
                              : "#656565",
                        }}
                      >
                        {child.label}
                      </Typography>
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
