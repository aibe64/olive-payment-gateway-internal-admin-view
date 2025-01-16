export const ROUTE_PATH = {
  Landing: "/",
  GetStarted: "/get-started",
  Dashboard: "/dashboard",
  Users: "/user",
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
}
