import { ActionTypes } from "../actions/types";
import { ActionModel } from "../../models/application/action";
import { MerchantUserState } from "../state/merchantUsers";

export class StateReducers {
  static Loading(state: any = {}, action: ActionModel) {
    switch (action.type) {
      case ActionTypes.PageUtility.Page_Loading:
        return action.payload;
      default:
        return state;
    }
  }
  static MertchantUserPageState(state: any = {}, action: ActionModel) {
    switch (action.type) {
      case ActionTypes.MerchantUserPage.Open_Edit_Modal:
        return MerchantUserState.OpenEditModal(action.payload);
      case ActionTypes.MerchantUserPage.Open_Create_Modal:
        return MerchantUserState.OpenCreateModal(action.payload);
      case ActionTypes.MerchantUserPage.Set_Loading:
        return action.payload;
      case ActionTypes.MerchantUserPage.Set_Modal:
        return MerchantUserState.SetModal(action.payload);
      case ActionTypes.MerchantUserPage.Set_Default_Colums_Rows:
        return action.payload;
      case ActionTypes.MerchantUserPage.Set_User_Request:
        return MerchantUserState.SetUser(action.payload);
      case ActionTypes.MerchantUserPage.Open_Alert_Modal:
        return action.payload;
      default:
        return state;
    }
  }
  static GetUsers(state: any = {}, action: ActionModel) {
    switch (action.type) {
      case ActionTypes.MerchantUserPage.Get_User:
        return action.payload;
      default:
        return state;
    }
  }
  static ValidateReceipt(state: any = {}, action: ActionModel) {
    switch (action.type) {
        case ActionTypes.Merchants.Set_Receipt:
          return action.payload;
      default:
        return state;
    }
  }

  static UploadReducer(state: any = {}, action: ActionModel) {
    switch (action.type) {
      case ActionTypes.CompliancePage.Upload_List:
        return action.payload;
      default:
        return state;
    }
  }
  static Notify(state: any = {}, action: ActionModel) {
    switch (action.type) {
      case ActionTypes.Merchants.Set_Notification:
        return action.payload;
      default:
        return state;
    }
  }
}
