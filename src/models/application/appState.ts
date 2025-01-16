import { State } from ".";

export interface AppState<T = any> extends State.Actions<AppState> {
    loadingPage?: boolean
    dayOptions?: "TODAY" | "YESTERDAY" | "DAYS_7" | "DAYS_30",
    tableData?: T;
    originalTableData?: T;
    totalDataCount?: number;
}

interface Authority {
    authority: string;
  }
  
  export interface MerchantPortalDetails {
    authorities: Authority[];
    email: string;
    exp: number;
    iat: number;
    iss: string;
    merchantId: string;
    sub: string;
    userId: number;
    userType: string;
  }