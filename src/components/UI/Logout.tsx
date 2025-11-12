



import { FC, Fragment, useCallback, useEffect } from "react";
import { Button } from "antd";
import { AppStorage, useModalStore } from "@/store";
import { LogoutIcon } from "@/assets";
import { Notify } from "./Alert";
import { AppConfig } from "@/config";

export const LogOut: FC<{ logOutOnRender: boolean }> = ({ logOutOnRender }) => {
  const { setModalState } = useModalStore();

  const onLogout = () => {
    AppStorage.clear();
    setModalState("open", false);
    Notify("Logout Successful", true);
    setTimeout(() => {
      window.location.href = AppConfig.MERCHANT_ONBOARDING_URL
    }, 1000);
  };

  const logoutUser = useCallback(() => {
    if (logOutOnRender) {
      onLogout();
    }
  }, [logOutOnRender]);

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return (
    <Fragment>
      {!logOutOnRender && (
        <Fragment>
          <div className="flex flex-col items-center space-y-6 my-6">
            <img className="text-center" src={LogoutIcon} />
            <p className=" text-lg text-center font-inter-regular">
              Are you sure you want to logout?
            </p>
          </div>{" "}
          <div className="flex justify-center gap-5 items-center my-5">
            <Button
              type="default"
              onClick={() => setModalState("open", false)}
              className=" text-[#c4c4c4!important] font-inter-regular  hover:bg-[transparent!important] hover:border-[#c4c4c4!important] hover:text-[#c4c4c4!important] border-[#c4c4c4] hover:scale-105 transition-all flex items-center justify-center py-5 px-8"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={onLogout}
              className="bg-[#ff0000!important] border-[#ff0000!important] shadow-none disabled:bg-[#E5E7E8] disabled:hover:scale-100 text-[#ffffff!important] hover:bg-[transparent!important] hover:text-[#ff0000!important] hover:scale-105 transition-all flex items-center justify-center py-5 px-8 font-inter-regular"
            >
              Logout
            </Button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

