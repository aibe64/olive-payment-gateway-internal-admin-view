/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";
import { GET, POST } from "../../service/apiService";
import apiConfig from "../../service/apiConfig";
import axios from "axios";
import { useSelector } from "react-redux";
import DateTime from "../functions/DateTime";

export default function (props: any) {
  const MINUTE_MS = 5000;
  const MinuteForActive = 10000;
  const { getConfig }: any = useSelector((state) => state);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     CheckIfUserIsLoggedIn();
  //   }, MINUTE_MS);
  // });
  async function LogOut() {
    if (getConfig.SSOBackendDomain) {
      if (
        sessionStorage.getItem("*********") ||
        sessionStorage.getItem("*********") === null
      ) {
        let email = sessionStorage.getItem("*********") as string;
        email = email.replace("/", "");
        email = email.replace('"', "");
        email = email.replace('"', "");
        const request = { email: email };
        const response = await POST(
          getConfig.SSOBackendDomain + apiConfig.Account.LogOut,
          request
        );
        if (response.success) {
          await sessionStorage.clear();
          await sessionStorage.clear();
          window.location.href = `${getConfig.SSODomain}?redirectTo=${window.location.origin}&lastPath=${window.location.href}`;
        } else {
          await sessionStorage.clear();
          await sessionStorage.clear();
          window.location.href = `${getConfig.SSODomain}?redirectTo=${window.location.origin}&lastPath=${window.location.href}`;
        }
      } else {
        await sessionStorage.clear();
        await sessionStorage.clear();
        window.location.href = `${getConfig.SSODomain}?redirectTo=${window.location.origin}&lastPath=${window.location.href}`;
      }
    } else {
      await sessionStorage.clear();
      await sessionStorage.clear();
      window.location.href = `${getConfig.SSODomain}?redirectTo=${window.location.origin}&lastPath=${window.location.href}`;
    }
  }

  async function CheckIfUserIsLoggedIn() {
    if (getConfig.SSOBackendDomain) {
      if (!sessionStorage.getItem("**************")) {
      } else {
        axios.defaults.headers.post["Content-Type"] =
          "application/json;charset=utf-8";
        axios.defaults.headers.common["Authorization"] = ("bearer " +
          sessionStorage.getItem("**************")) as string;
        axios
          .get(getConfig.SSOBackendDomain + apiConfig.Account.ValidateUserLogin)
          .then(function (response) {
            const result = response.data;
            const loginDate =
              new DateTime().ConvertDateToAPIDateWithoutMilliSeconds(
                sessionStorage.getItem("**") as string
              );
            const lastLoginDate =
              new DateTime().ConvertDateToAPIDateWithoutMilliSeconds(
                result.data.lastLoginDate
              );
            if (loginDate !== lastLoginDate) {
              LogOut();
            }
            if (!result.data.isActive) {
              LogOut();
            }
          });
      }
    }
  }

  const handleOnIdle = (event: any) => {
    if (sessionStorage.getItem("**************")) {
     LogOut();
    }
  };
  const {} = useIdleTimer({
    timeout: 150000,
    onIdle: handleOnIdle as any,
    debounce: 500,
  });

  return <></>;
}
