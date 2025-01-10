import { State } from "../../models/application/state";
import { Encription } from "../../shared/functions/encryption";
import { UrlSearch } from "../../shared/functions/urlSearch";
import { Response } from "../../models/client/apiResponse";

export class UserService {
  static VerifyUser(state: State.UserValidation): State.UserValidation {
    localStorage.clear();
    let appKey = UrlSearch.getParameterByName("key");
    const lastLoginDate = UrlSearch.getParameterByName("date");
    sessionStorage.setItem("**", lastLoginDate);
    appKey = appKey.replace(/ /g, "-");
    if (!appKey) {
      window.location.href = `${sessionStorage.getItem("sso")}?redirectTo=${
        window.location.origin
      }`;
    }
    sessionStorage.setItem(
      "**************",
      UrlSearch.getParameterByName("token")?.replace(" ", "-")
    );
    state = {
      ...state,
      request: {
        ...state.request,
        token: UrlSearch.getParameterByName("token")?.replace(" ", "-"),
        appKey: appKey,
      },
    };
    localStorage.setItem("***********", Encription.encrypt(state.request));
    return state;
  }
  static VerifyUserApiResponse(
    state: State.UserValidation,
    apiResponse: Response.API
  ): State.UserValidation {
    let redirect = false;
    if (apiResponse.success) {
      localStorage.setItem("****", state.response?.merchantId + "");
      localStorage.setItem("***", Encription.encrypt(state.response));
      localStorage.setItem("*********", state.response?.email + "");
      if (state.response?.isFirstimeLogin && !state.response?.isInternalUser) {
        if (state.response?.roleId === 0) {
          state.pageState = "loading";
          state.isUserValid = true;
          return state;
        }
        state.userDetails = {
          ...state.userDetails,
          firstName: state.response?.firstName,
          lastName: state.response?.lastName,
          email: state.response?.email,
          referralCode: state.response?.referralCode,
          roleId: state.response?.roleId,
          phoneNumber: state.response?.phoneNumber,
        };
        state.disableField = true;
      } else {
        redirect = true;
        UserService.RedirectUserToPage(state.response as any);
      }
    } else {
      localStorage.setItem("****", state.response?.merchantId + "");
      localStorage.setItem("*********", state.response?.email + "");
      localStorage.setItem("**********", state.response?.phoneNumber + "");
      localStorage.setItem("***", Encription.encrypt(state.response));
      if (state.response?.isFirstimeLogin === false) {
        if (state.response?.isRegistrationCompleted === true) {
          redirect = true;
          UserService.RedirectUserToPage(state.response);
        } else {
          if ((state.response?.merchantId as number) > 0) {
            redirect = true;
            window.location.href = "compliance";
          } else {
            localStorage.setItem("***", Encription.encrypt(state.response));
            UserService.RedirectUserToPage(state.response);
          }
        }
      }
      if (apiResponse.responseCode === "10") {
        state.pageState = "success";
        redirect = false;
      }
      if (apiResponse.responseCode === "02") {
        redirect = true;
        window.location.href = `${sessionStorage.getItem("sso")}?redirectTo=${
          window.location.origin
        }`;
      }
      if (apiResponse.responseCode === "99") {
        redirect = true;
        window.location.href = `${sessionStorage.getItem("sso")}?redirectTo=${
          window.location.origin
        }`;
        redirect = true;
      }
      if (apiResponse.responseCode === "404") {
        window.location.href = `${sessionStorage.getItem("sso")}?redirectTo=${
          window.location.origin
        }`;
        redirect = true;
      }
    }
    if (!redirect) {
      state.pageState = "success";
    }
    return state;
  }
  static RedirectUserToPage(user: Response.UserInfo): void {
    const lastPath = UrlSearch.getParameterByName("lastPath");
    if (user.isInternalUser) {
      if (lastPath) {
        if (lastPath.includes("admin")) {
          window.location.href = lastPath?.replace(" ", "-");
        } else {
          window.location.href = "admin/home";
        }
      } else {
        window.location.href = "admin/home";
      }
    } else {
      if (lastPath) {
        if (!lastPath.includes("admin")) {
          window.location.href = lastPath?.replace(" ", "-");
        } else {
          window.location.href = "home";
        }
      } else {
        window.location.href = "home";
      }
    }
  }
}
