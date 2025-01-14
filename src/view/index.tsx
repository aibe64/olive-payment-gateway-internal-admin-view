/* eslint-disable react-hooks/exhaustive-deps */
import { usePostData } from "@/hooks";
import { ApiConfig } from "@/service";
import { getQueryStringValue } from "@/utils";
import { useCallback, useEffect } from "react";
import { XpressLoader } from "../shared/components/loader";
export const LandingPage = () => {
  const token = getQueryStringValue("token")
  const appKey = getQueryStringValue("appKey")

  const { mutate, isPending } = usePostData<{}, any>({
    endpoint: ApiConfig.Users.ValidateUserFirstTimeLogIn,
    queryKey: "",
  });

  const validateUser = useCallback(async () => {
    mutate({ appKey, token }, {onSuccess: () => {console.log("called")}});
  }, [token, appKey]);

  useEffect(() => {
    validateUser();
  }, []);
  return <>{isPending ? <XpressLoader /> : <>hhhhhh</>}</>;
};
