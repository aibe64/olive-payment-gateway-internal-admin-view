import { ActionTypes } from "../actions/types";
import { ActionModel } from "../../models/application/action";
import { MerchantUserState } from "../state/merchantUsers";
import { ComplianceState } from "../state/complianceState";
import { AccountThunkService } from "../thunk/merchant/accountService";
import { MerchantThunkService } from "../thunk/merchant/merchantService";
import { CommerceThunkService } from "../thunk/merchant/commerce";
import { CommerceStateBusiness } from "../state/commerce";

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
      case ActionTypes.MerchantUserPage.Create_User:
        AccountThunkService.CreateUser(() => {}, action.payload);
        return action.payload;
      case ActionTypes.MerchantUserPage.Update_User:
        AccountThunkService.UpdateUser(() => {}, action.payload);
        return action.payload;
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
      case ActionTypes.Merchants.Validate_Receipt:
        MerchantThunkService.ValidateReceipt(action.payload)
        return action.payload;
        case ActionTypes.Merchants.Set_Receipt:
          return action.payload;
      default:
        return state;
    }
  }
  static PaymentPageReducer(state: any = {}, action: ActionModel) {
    switch (action.type) {
      case ActionTypes.PaymentPage.Set_Payment_Page_Modal:
        return action.payload;
      case ActionTypes.PaymentPage.Set_Payment_Page_State:
        return action.payload;
      case ActionTypes.PaymentPage.Set_View_Payment_Page:
        action.payload = CommerceStateBusiness.UpdatePaymentPageRequest(
          action.payload
        );
        CommerceThunkService.GetTransactions(() => {}, action.payload);
        return action.payload;
      case ActionTypes.PaymentPage.Add_Page:
        action.payload = CommerceStateBusiness.UpdateField(action.payload);
        CommerceThunkService.AddPaymentPage(() => {}, action.payload);
        return action.payload;
      case ActionTypes.PaymentPage.Get_Payment_Page:
        CommerceThunkService.GetPaymentPages(() => {}, action.payload);
        return action.payload;
      case ActionTypes.PaymentPage.Validate_Link:
        CommerceThunkService.ValidateLink(() => {}, action.payload);
        return action.payload;
      default:
        return state;
    }
  }
  static ProductPageReducer(state: any = {}, action: ActionModel) {
    switch (action.type) {
      case ActionTypes.ProductPage.Set_Product_Page_Modal:
        return action.payload;
      case ActionTypes.ProductPage.Set_Product_Page_State:
        return action.payload;
      case ActionTypes.ProductPage.Add_Product_Options:
        action.payload = CommerceStateBusiness.AddOptions(action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Update_Product_Options:
        action.payload = CommerceStateBusiness.UpdateOptions(action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Remove_Product_Options:
        action.payload = CommerceStateBusiness.DeleteOptions(action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Update_Product_Page_Request:
        action.payload = CommerceStateBusiness.UpdateProductPageRequest(
          action.payload
        );
        return action.payload;
      case ActionTypes.ProductPage.RetainProductPageRequest:
        action.payload = CommerceStateBusiness.RetainProductPageRequest(
          action.payload
        );
        return action.payload;
      case ActionTypes.ProductPage.Get_Product_transactions:
        CommerceThunkService.GetProductTransactions(() => {}, action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Add_Product:
        CommerceThunkService.AddProductPage(() => {}, action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Update_Product:
        CommerceThunkService.UpdateProductPage(() => {}, action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Delete_Product:
        CommerceThunkService.DeleteProduct(() => {}, action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Duplicate_Product:
        CommerceThunkService.DuplicateProduct(() => {}, action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Get_Product_Page:
        CommerceThunkService.GetProductPage(() => {}, action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Get_Product_Page_By_Id:
        CommerceThunkService.GetProductPageById(() => {}, action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Validate_Product_Link:
        CommerceThunkService.ValidateProductLink(() => {}, action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Update_Product_Options_To_Server:
        action.payload = CommerceStateBusiness.DeleteOptions(action.payload);
        CommerceThunkService.UpdateProductOptions(() => {}, action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Update_Product_Variants_To_Server:
        CommerceThunkService.UpdateProductOptions(() => {}, action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Add_Variants:
        action.payload = CommerceStateBusiness.AddVariants(action.payload);
        CommerceThunkService.UpdateProductOptions(() => {}, action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Remove_Variants:
        action.payload = CommerceStateBusiness.DeleteVariants(action.payload);
        CommerceThunkService.UpdateProductOptions(() => {}, action.payload);
        return action.payload;
      case ActionTypes.ProductPage.Update_Variants:
        action.payload = CommerceStateBusiness.UpdateVariants(action.payload);
        CommerceThunkService.UpdateProductOptions(() => {}, action.payload);
        return action.payload;
      default:
        return state;
    }
  }
  static StorePageReducer(state: any = {}, action: ActionModel) {
    switch (action.type) {
      case ActionTypes.StorePage.Set_Store_Page_State:
        action.payload = CommerceStateBusiness.UpdateStoreDelivery(action.payload)
        return action.payload;
      case ActionTypes.StorePage.Add_Store:
        CommerceThunkService.CreateStorePage(() => {}, action.payload);
        return action.payload;
      case ActionTypes.StorePage.Get_Store_Products:
        CommerceThunkService.GetStoreProduct(() => {}, action.payload);
        return action.payload;
      case ActionTypes.StorePage.Get_Product_Not_In_Store:
        CommerceThunkService.GetProductNotInStore(() => {}, action.payload);
        return action.payload;
      case ActionTypes.StorePage.Update_Store:
        CommerceThunkService.UpdateStorePage(() => {}, action.payload);
        return action.payload;
      case ActionTypes.StorePage.Delete_Store:
        CommerceThunkService.DeleteStorePage(() => {}, action.payload);
        return action.payload;
      case ActionTypes.StorePage.Edit_Store_Products:
        action.payload = CommerceStateBusiness.UpdateStoreProductRequest(
          action.payload
        );
        CommerceThunkService.UpdateStoreProductPage(() => {}, action.payload);
        return action.payload;
      case ActionTypes.StorePage.Add_Product_To_Store:
        CommerceThunkService.UpdateStoreProductPage(() => {}, action.payload);
        return action.payload;
      case ActionTypes.StorePage.Update_Store_Products:
        action.payload = CommerceStateBusiness.UpdateStoreProduct(
          action.payload
        );
        return action.payload;
      case ActionTypes.StorePage.Retain_Store_Page_Request:
        action.payload = CommerceStateBusiness.UpdateStoreRequest(
          action.payload
        );
        return action.payload;
      case ActionTypes.StorePage.Update_Store_Page_Request:
        CommerceThunkService.GetStoreByID(() => {}, action.payload);
        return action.payload;
      case ActionTypes.StorePage.Get_Store_Page:
        CommerceThunkService.GetStorePage(() => {}, action.payload);
        return action.payload;
      case ActionTypes.StorePage.Get_Store_Page_By_Id:
        CommerceThunkService.GetStorePageById(() => {}, action.payload);
        return action.payload;
      case ActionTypes.StorePage.Validate_Store_Link:
        CommerceThunkService.ValidateStoreLink(() => {}, action.payload);
        return action.payload;
      case ActionTypes.StorePage.Get_Store_Transactions:
        CommerceThunkService.GetStoreTransactions(() => {}, action.payload);
        return action.payload;
      case ActionTypes.StorePage.RetainStorePageRequest:
        action.payload = CommerceStateBusiness.UpdateStoreRequest(
          action.payload
        );
        return action.payload;
      case ActionTypes.StorePage.Update_Product_On_StorePage:
        CommerceThunkService.UpdateProductOnStorePage(() => {}, action.payload);
        return action.payload;
      default:
        return state;
    }
  }
  static CompliancePageReducer(state: any = {}, action: ActionModel) {
    switch (action.type) {
      case ActionTypes.CompliancePage.Set_Compliance_Page_State:
        return action.payload;
      case ActionTypes.CompliancePage.Set_Compliance_Page_API_State:
        return ComplianceState.UpdateMerchantDetails(action.payload);
      case ActionTypes.CompliancePage.set_Default_Compliance_Page_State:
        return ComplianceState.UpdateDefaultState(action.payload);
      case ActionTypes.CompliancePage.OnSubmit_Next_Button:
        return ComplianceState.OnNextButton(action.payload);
      case ActionTypes.CompliancePage.Update_Merchant_Profile:
        action.payload = ComplianceState.SetRequest(action.payload);
        MerchantThunkService.UpdateMerchant(() => {}, action.payload);
        return action.payload;
      case ActionTypes.CompliancePage.Upload_KYC:
        MerchantThunkService.UploadKYC(() => {}, action.payload);
        return action.payload;
      case ActionTypes.CompliancePage.OnClick_Next_Button:
        return (action.payload = ComplianceState.OnClickPreviousButton(
          action.payload
        ));
      case ActionTypes.CompliancePage
        .Set_BusinessIdentification_ValidID_Identification:
        return (action.payload =
          ComplianceState.SetBusinessIdentificationValidIDIdentification(
            action.payload
          ));
      case ActionTypes.CompliancePage.Set_Govt_ValidID_Identification:
        return (action.payload = ComplianceState.SetGovenmentIdentification(
          action.payload
        ));
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
      case ActionTypes.Merchants.Get_Notification:
        MerchantThunkService.GetNotification(action.payload);
        return action.payload;
      case ActionTypes.Merchants.Update_Notification:
        MerchantThunkService.UpdateNotification(action.payload);
        return action.payload;
      default:
        return state;
    }
  }
}
