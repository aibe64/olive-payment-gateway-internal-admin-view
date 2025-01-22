import { AppConfig } from "@/config";
import { getQueryStringValue } from "@/lib";
import { APIResponse, AppStorageKeys } from "@/models";
import { endpoints } from "@/service";
import { AppStorage } from "@/store";
import { useEffect } from "react";
import { useAPI } from "./useApi";

export const useAuthorization = () => {
  const token = getQueryStringValue("token");
  const { callPostData } = useAPI<APIResponse.LoginInfo>({});

  useEffect(() => {
    if (token) {
      callPostData({
        url: `${endpoints.Users.ValidateUserFirstTimeLogIn}?token=${token}`,
        request: {},
        callBackApiError() {
          window.location.href = AppConfig.MERCHANT_ADMIN_DOMAIN;
        },
        callBackApiResponse(apiResponse: APIResponse.LoginInfo) {
          AppStorage.setItem(AppStorageKeys.Token, apiResponse.token);
          AppStorage.setItem(AppStorageKeys.UserInfo, apiResponse);
          window.location.href = `${window.location.origin}/dashboard`;
        },
      });
    } else {
      window.location.href = AppConfig.MERCHANT_ADMIN_DOMAIN;
    }
  }, [token]);

  return { token };
};
