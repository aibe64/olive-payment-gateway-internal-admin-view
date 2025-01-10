/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../models/application/state";
import { ActionTypes } from "../service/actions/types";
import { XpressLoader } from "../shared/components/loader";
import { RegistrationPage } from "./merchants/registration";

export const LandingPage = () => {
  const dispatch = useDispatch();
  const { validateUserState }: any = useSelector((state: any) => state);
  const state: State.UserValidation = validateUserState;
  const validateUser = useCallback(async () => {
    await fetchConfig()
    dispatch({
      type: ActionTypes.Users.Validate_User_First_Time_LogIn,
      payload: {
        ...state,
        loading:true
      },
    });
  }, [state]);

  const fetchConfig = async () =>{
    await fetch("config.json").then((response) => {
      response.json().then((settings) => {
        sessionStorage.setItem("$$$", settings.ApiDomain);
        sessionStorage.setItem("sso", settings.SSODomain);
      });
    });
  }

  useEffect(() => {
    validateUser();
  }, []);
  return (<>
       {
         state.pageState === 'loading' ?
         <XpressLoader/> :
         state.pageState === 'success' ?
         <RegistrationPage/> :
         <XpressLoader/>
       }
  </>);
};
