/* eslint-disable react-hooks/exhaustive-deps */
import { usePostData } from "@/hooks";
import { Response } from "@/models";
import { ApiConfig } from "@/service";
import { Encryption } from "@/shared/functions/encryption";
import { getQueryStringValue } from "@/utils";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { XpressLoader } from "../shared/components/loader";
export const LandingPage = () => {
  const navigate = useNavigate();
  const token = getQueryStringValue("token");
  const appKey = getQueryStringValue("appKey");

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
            console.log("response", response);
            sessionStorage.setItem("***", Encryption.encrypt(response));
            navigate("admin/home")
          },
        }
      );
  }, [token, appKey]);

  useEffect(() => {
    validateUser();
  }, []);
  return <>{isPending ? <XpressLoader /> : <>hhhhhh</>}</>;
};
