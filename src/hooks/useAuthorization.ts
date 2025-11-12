import { AppConfig } from "@/config";
// import { getQueryStringValue } from "@/lib";
import { APIResponse, AppStorageKeys } from "@/models";
import { endpoints } from "@/service";
import { AppStorage, useFormStore } from "@/store";
import { useCallback } from "react";
import { useAPI } from "./useApi";


export const useAuthorization = () => {
  const { callPostData } = useAPI<APIResponse.LoginInfo>({});
  const {payload} = useFormStore()

  // const token = getQueryStringValue("token");

  const handleMerchantPortalUserLoginSuccess = useCallback(({token}: {
    expiresAt: string
    token: string
    user: string
  }) => {
    const authToken = token

    if (authToken) {
      callPostData({
        url: `${endpoints.Users.ValidateUserFirstTimeLogIn}?token=${token}`,
        request: {},
        // callBackApiError() {
        //   window.location.href = AppConfig.MERCHANT_ONBOARDING_URL;
        // },
        callBackApiResponse(apiResponse: APIResponse.LoginInfo) {
          AppStorage.setItem(AppStorageKeys.Token, apiResponse.token);
          AppStorage.setItem(AppStorageKeys.UserInfo, apiResponse);
          window.location.href = `${window.location.origin}/dashboard`;
        },
      });
    }
  }, [])

  const handleLogin = () => {
    callPostData({
      url: `${AppConfig.MERCHANT_ONBOARDING_API_BASE_URL}${endpoints.AdminAuth.Login}`,
      request: payload,
      callBackApiResponse: handleMerchantPortalUserLoginSuccess,
    })
  }

  const handleLogout = () => {
    // callPostData({
    //   url: `${endpoints.Users.ValidateUserFirstTimeLogIn}?token=${token}`,
    //   request: {},
    //   callBackApiError() {
    //     window.location.href = AppConfig.MERCHANT_ONBOARDING_URL;
    //   },
    //   callBackApiResponse(apiResponse: APIResponse.LoginInfo) {
    //     AppStorage.setItem(AppStorageKeys.Token, apiResponse.token);
    //     AppStorage.setItem(AppStorageKeys.UserInfo, apiResponse);
    //     window.location.href = `${window.location.origin}/dashboard`;
    //   },
    // });
  }

  return {
    handleLogin,
    handleLogout
   };
};
