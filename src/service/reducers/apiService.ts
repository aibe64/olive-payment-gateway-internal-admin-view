import { ActionTypes } from "../actions/types";
import { ActionModel } from "../../models/application/action";
import { Response } from "../../models/client/apiResponse";
import { AccountThunkService } from "../thunk/merchant/accountService";
import { UserService } from "../state/user";
export namespace APIServiceReducers {
  export class AccountService {
    static User(state: any = {}, action: ActionModel) {
      switch (action.type) {
        case ActionTypes.Users.Set_Validate_User_State:
          return action.payload;
        case ActionTypes.Users.Validate_User_First_Time_LogIn:
            action.payload = UserService.VerifyUser(action.payload);
          AccountThunkService.ValidateUser(action.payload);
          return action.payload;
          case ActionTypes.Users.Create_Account:
          AccountThunkService.RegisterUser(action.payload);
          return action.payload;
        default:
          return state;
      }
    }
    static GetAllRoles(
      state: Response.MerchantRoles[] = new Array<Response.MerchantRoles>(),
      action: ActionModel
    ) {
      switch (action.type) {
        case ActionTypes.Account.GET_ALL_ROLES:
          return action.payload;
        default:
          return state;
      }
    }
    static LogOut(state: any = {}, action: ActionModel) {
      switch (action.type) {
        case ActionTypes.Account.Log_Out:
          return action.payload;
        default:
          return state;
      }
    }
    static GetConfig(state: any = {}, action: ActionModel) {
      switch (action.type) {
        case ActionTypes.Settings.GET_ALL_SETTINGS:
          return action.payload;
        default:
          return state;
      }
    }
  }
  export class MerchantService {
    static GetMerchantDetails(state: any = {}, action: ActionModel) {
      switch (action.type) {
        case ActionTypes.Merchants.Merchant_By_ID:
          return action.payload;
        default:
          return state;
      }
    }
  }
  export class GerneralService {
    static GetBanks(state: any = {}, action: ActionModel) {
      switch (action.type) {
        case ActionTypes.SetUp.Get_All_Banks:
          return action.payload;
        default:
          return state;
      }
    }
    static GetCategories(state: any = {}, action: ActionModel) {
      switch (action.type) {
        case ActionTypes.Users.Get_All_Categories:
          return action.payload;
        default:
          return state;
      }
    }
    static GetIndustries(state: any = {}, action: ActionModel) {
      switch (action.type) {
        case ActionTypes.Users.Get_All_Industries:
          return action.payload;
        default:
          return state;
      }
    }
  }
}
