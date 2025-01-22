import { ROUTE_PATH } from "@/models";
import { Segmented } from "antd";
import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

export const SettingsLayout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const pageName = window.location.href?.split("/").pop();
  return (
    <div className="flex flex-col gap-5">
      <Segmented
        className="bg-[#E5F1E6] dark:bg-black p-2"
        size="large"
        value={`/${pageName === "settings" ? "profile" : pageName}`}
        options={[
          {
            label: (
              <div className="flex gap-1 justify-center px-2 mr-2 font-semibold">
                <span>Profile</span>
              </div>
            ),
            value: "/profile",
          },
        ]}
        onChange={() => {
          navigate(`${ROUTE_PATH.Profile}`);
        }}
      />
      {children}
    </div>
  );
};
