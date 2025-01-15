/* eslint-disable react-hooks/exhaustive-deps */
import { usePostData } from "@/hooks";
import { Response } from "@/models";
import { ApiConfig } from "@/service";
import { Encryption } from "@/shared/functions/encryption";
import { getQueryStringValue, MERCHANT_ADMIN_PORTAL } from "@/utils";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { XpressLoader } from "../shared/components/loader";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
export const LandingPage = () => {
  const navigate = useNavigate();
  const token = getQueryStringValue("token");
  const appKey = getQueryStringValue("key");

  const { mutate, isPending } = usePostData<{}, Response.UserInfo>({
    endpoint: ApiConfig.Users.ValidateUserFirstTimeLogIn,
    queryKey: "",
  });

  const validateUser = useCallback(async () => {
    if (token && appKey)
      mutate(
        { appKey, token },
        {
          onSuccess: (response) => {
            sessionStorage.setItem("***", Encryption.encrypt(response));
            navigate("admin/home");
            window.location.href = `${window.location.origin}/admin/home`;
          },
        }
      );
  }, [token, appKey]);

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <>
      {isPending ? (
        <XpressLoader />
      ) : (
        <div className="flex justify-center items-center flex-col gap-7 mt-[10%]">
          <ExclamationCircleOutlined className="text-[6rem] text-tertiary" />
          <span className="w-[30%] text-center">
            We couldn't validate your access token or authorization. We
            apologize for the inconvenience.
          </span>
          <Button
            onClick={() => (window.location.href = MERCHANT_ADMIN_PORTAL)}
            className="text-[1.2rem] !py-5"
            type="primary"
          >
            Try Again
          </Button>
        </div>
      )}
    </>
  );
};
