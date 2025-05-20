import { State } from ".";
import { APIResponse } from "../client";

export interface AppState<T = any> extends State.Actions<AppState> {
  loadingPage?: boolean;
  dayOptions?: "TODAY" | "YESTERDAY" | "DAYS_7" | "DAYS_30";
  tableData?: T;
  originalTableData?: T;
  totalDataCount?: number;
  storeTransactionForDownloadData?: APIResponse.StoreTransaction[];
  transactionDataForDownload?: APIResponse.Transaction[];
  splitTransactionDataForDownload?: APIResponse.SplitTransaction[];
  storeSummary?: APIResponse.StoreTransactionSummaryResponse;
  transactionSummaryData?: APIResponse.TransactionSummaryResponse;
  transactionData?: APIResponse.TransactionsData;
  storeTransactionData?: APIResponse.StoreTransactionsData;
  transactionPageNumber?: number;
  storeTransactionPageLimit?: number;
  splitTransactionData?: APIResponse.SplitTransactionsData;
  splitTransactionPageNumber?: number;
  splitTransactionPageLimit?: number;
  storeTransactionPageNumber?: number;
  transactionPageLimit?: number;
  openTransactionFilter?: boolean;
  merchantItem?:  { label: string; value: number }[]
  chartData?: APIResponse.YearlyTransactionsResponse;
  loadingChart?: boolean;
  loadingSummary?: boolean;
  dashboardFilterCurrency?: string
  auditTrailsData?: APIResponse.AuditTrails
  originalAuditTrailsData?: APIResponse.AuditTrails
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
