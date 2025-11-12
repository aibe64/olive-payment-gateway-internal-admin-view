import { AppStorage } from "@/store";
import { Button, Typography } from "antd";
import { WarningFilled } from "@ant-design/icons";
import { useEffect } from "react";
import { AppConfig } from "@/config";

export const TimeOut = () => {
  useEffect(() => {
    AppStorage.clear();
  }, []);
  return (
    <div>
      <div className="flex justify-center">
        <WarningFilled className="mx-auto mb-5 text-tertiary text-[1.8rem]" />
      </div>
      <Typography className="text-[0.8rem] text-center">
        You have been inactive for a while, so for your security, the system has
        automatically timed out. Please log in again to continue.
      </Typography>
      <div className="flex justify-center my-5">
        <Button
          type="primary"
          onClick={() =>
            (window.location.href = AppConfig.MERCHANT_ONBOARDING_URL)
          }
          className="px-5 mx-auto shadow-none"
        >
          Login to continue
        </Button>
      </div>
    </div>
  );
};
