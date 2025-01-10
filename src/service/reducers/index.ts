import { combineReducers } from "redux";
import { APIServiceReducers } from "./apiService";
import { StateReducers } from "./stateService";

export const AllReducers = combineReducers({
    getAdminRoles: APIServiceReducers.AccountService.GetAllRoles,
    logOut: APIServiceReducers.AccountService.LogOut,
    getConfig:APIServiceReducers.AccountService.GetConfig,
    MerchantDetails: APIServiceReducers.MerchantService.GetMerchantDetails,
    getIndustries: APIServiceReducers.GerneralService.GetIndustries,
    getCategories: APIServiceReducers.GerneralService.GetCategories,
    getBanks: APIServiceReducers.GerneralService.GetBanks,
    getRoles:APIServiceReducers.AccountService.GetAllRoles,
    getUsers: StateReducers.GetUsers,
    paymentPageState: StateReducers.PaymentPageReducer,
    productPageState: StateReducers.ProductPageReducer,
    storePageState: StateReducers.StorePageReducer,
    compliancePageState: StateReducers.CompliancePageReducer, 
    merchantUserPageState: StateReducers.MertchantUserPageState,
    pageUtility: StateReducers.Loading,
    uploadList: StateReducers.UploadReducer,
    validateUserState: APIServiceReducers.AccountService.User,
    notificationState: StateReducers.Notify,
    receiptDetails: StateReducers.ValidateReceipt
})