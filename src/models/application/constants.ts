export const ROUTE_PATH = {
  Landing: "/",
  GetStarted: "/get-started",
  Dashboard: "/dashboard",
  Merchant: "/merchant",
  Roles: "/roles",
  Users: "/users",
  Profile: "/profile",
  MerchantApproval: "/approval/merchant",
  Transaction: "/payment/transaction",
  Store: "/payment/store",
  Provider: "/setup/provider",
  Bin: "/setup/bin",
  Institution: "setup/institution",
  TransactionManager: "setup/transaction-manager",
  Login: import.meta.env.VITE_AUTH_DOMAIN,
};

export enum KycStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  DECLINED = "DECLINED",
}
export enum AppStorageKeys {
  Token = "*****",
  UserInfo = "***",
  MerchantPortalToken = "**",
}
export enum APIResponseCode {
  Success = "00",
  BadRequest = "ERR_BAD_REQUEST",
  RedirectToXpressPay = "05",
  Invalid = "04",
  Pending = "06",
  Failed = "02"
}
