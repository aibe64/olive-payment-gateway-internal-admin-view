import { GET, POST } from "../../apiService";
import { Response } from "../../../models/client/apiResponse";
import apiConfig from "../../apiConfig";
import { ActionTypes } from "../../actions/types";
import { State } from "../../../models/application/state";
import DateTime from "../../../shared/functions/DateTime";
import { UserStatus } from "../../../view/merchants/users/userStatus";
import store from "../../store";
import { UserService } from "../../state/user";
import { Encription } from "../../../shared/functions/encryption";
import { Notification } from "../../../shared/components/notification";

let responseMessage = "";
export class AccountThunkService {
  static GetRoles = async (
    dispatch: any,
    state: Array<Response.MerchantRoles>
  ) => {
    const response = await GET(apiConfig.Merchants.GetMerchantRoles);
    if (response.success) {
      const roles: Array<Response.MerchantRoles> = response.data.$values;
      state = roles;
      dispatch({ type: ActionTypes.Account.GET_ALL_ROLES, payload: state });
    } else {
      dispatch({
        type: ActionTypes.Account.GET_ALL_ROLES,
        payload: new Array<Response.MerchantRoles>(),
      });
    }
  };
  static async CreateUser(dispatch: any, state: State.MerchantUserPage) {
    const response = await POST(
      apiConfig.Merchants.CreateMerchantUsers,
      state.userRequest
    );
    if (response.success) {
      responseMessage = "Updated Successfully";
      store.dispatch(AccountThunkService.Success as any);
      store.dispatch(AccountThunkService.GetUsers as any);
    } else {
      responseMessage = response.responseMessage as string;
      store.dispatch(AccountThunkService.Error as any);
    }
  }
  static Success = (dispatch: any, state: State.MerchantUserPage) => {
    state = {
      ...state,
      showModal: false,
      message: responseMessage,
      openAlertModal: true,
      isSuccess: true,
      userRequest: {},
      loading: false,
    };
    dispatch({
      type: ActionTypes.MerchantUserPage.Open_Alert_Modal,
      payload: state,
    });
  };
  static Error = (dispatch: any, state: State.MerchantUserPage) => {
    state = {
      ...state,
      showModal: false,
      message: responseMessage,
      openAlertModal: true,
      isSuccess: false,
      userRequest: {},
      loading: false,
    };
    dispatch({
      type: ActionTypes.MerchantUserPage.Open_Alert_Modal,
      payload: state,
    });
  };
  static async UpdateUser(dispatch: any, state: State.MerchantUserPage) {
    const response = await POST(
      apiConfig.Merchants.UpdateMerchantUsers,
      state.userRequest
    );
    if (response.success) {
      responseMessage = "Updated Successfully";
      store.dispatch(AccountThunkService.Success as any);
      store.dispatch(AccountThunkService.GetUsers as any);
    } else {
      responseMessage = response.responseMessage as string;
      store.dispatch(AccountThunkService.Error as any);
    }
  }
  static async GetUsers(
    dispatch: any,
    state: Response.MerchantUsersResponse[]
  ) {
    if (localStorage.getItem("****") !== "null") {
      const response = await GET(
        apiConfig.Merchants.GetMerchantUsers +
          parseInt(localStorage.getItem("****") as string)
      );
      if (response.success) {
        let users: Array<Response.MerchantUsersResponse> =
          response.data.$values;
        let sn = 0;
        await users.forEach(function (element: Response.MerchantUsersResponse) {
          sn = sn + 1;
          element.key = sn;
          element.status = UserStatus(element.isActive);
          element.dateCreated = new DateTime().ConvertAPItoFieldDate(
            element.dateCreated as string
          );
          element.role = element.userRole?.description;
        });
        state = users;
        dispatch({
          type: ActionTypes.MerchantUserPage.Get_User,
          payload: state,
        });
      }
    }
  }
  static async ValidateUser(state: State.UserValidation) {
    await this.FetchConfig();
    const response = await POST(
      sessionStorage.getItem("$$$") +
        apiConfig.Users.ValidateUserFirstTimeLogIn,
      state.request
    );
    state.response = response.data;
    UserService.VerifyUserApiResponse(state, response);
    if (response.success) {
      store.dispatch({
        type: ActionTypes.Users.Set_Validate_User_State,
        payload: {
          ...state,
          response: response.data,
        },
      });
    }
  }
  static async RegisterUser(state: State.UserValidation) {
    const response = await POST(
      sessionStorage.getItem("$$$") + apiConfig.Users.CreateAccount,
      state.userDetails
    );
    if (response.success) {
      let data: any = JSON.parse(
        Encription.decrypt(localStorage.getItem("***") as string)
      );
      data.token = response.data?.token;
      await localStorage.setItem("***", Encription.encrypt(data));
      store.dispatch({
        type: ActionTypes.Users.Set_Validate_User_State,
        payload: {
          ...state,
          registering: false,
          showComfimationDialog: true,
        },
      });
    } else {
      store.dispatch({
        type: ActionTypes.Users.Set_Validate_User_State,
        payload: {
          ...state,
          registering: false,
        },
      });
      Notification(response.responseMessage as string, false);
    }
  }

  static async FetchConfig() {
    await fetch("config.json").then((response) => {
      response.json().then((settings) => {
        sessionStorage.setItem("$$$", settings.ApiDomain);
        sessionStorage.setItem("sso", settings.SSODomain);
      });
    });
  }
}
