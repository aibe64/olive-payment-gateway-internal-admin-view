export namespace APIResponse {
  export class API<T> {
    responseCode: string = "";
    responseMessage: string = "";
    data: T | undefined;
  }
  export interface Error {
    type: string;
    title: string;
    status: number;
    traceId: string;
    errors: any;
  }
  export interface LoginInfo {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: any;
    referralCode: any;
    myReferralCode: any;
    isFirstimeLogin: boolean;
    isSelfOnboarding: boolean;
    token: string;
    userRole: string;
    roleId: number;
    merchantId: any;
    roleResources: string[];
    isRegistrationCompleted: any;
    code: any;
    message: any;
    businessName: any;
    isInternalUser: boolean;
  }
  export interface User {
    createdBy?: string;
    creationDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    roleName?: string;
  }
 
  export interface MerchantDetails {
    id?: number | null
    userId?: string | null
    businessName?: string | null
    businessType?: any | null
    businessNumber?: string | null
    staffSize?: string | null
    industry?: string | null
    serviceCategory?: string | null
    businessEmail?: string | null
    supportEmail?: string | null
    disputeEmail?: string | null
    businessAddress?: string | null
    settlementAccountNumber?: string | null
    accountName?: string | null
    bankCode?: string | null
    isActive?: boolean | null
    cardPayment?: boolean | null
    accountPayment?: boolean | null
    ussdPayment?: boolean | null
    qrPayment?: boolean | null
    walletPayment?: boolean | null
    bankTransferPayment?: any | null
    transactionLimit?: number | null
    logo?: any | null
    dateProfiled?: string | null
    dateUpdated?: string | null
    website?: string | null
    twitterAccount?: string | null
    facebookAccount?: any | null
    instagramAccount?: string | null
    isRegistrationCompleted?: boolean | null
    productDescription?: string | null
    merchantCategory?: any | null
    kycStatus?: string | null
    updatedBy?: string | null
    webHookUrl?: string | null
    useBin?: boolean | null
    useStaticRoute?: boolean | null
    staticRouteProvider?: any | null
    useDefault?: boolean | null
    defaultProvider?: any | null
    categoryName?: any | null
    directorName?: any | null
    bvn?: any | null
    registrationStatus?: any | null
    chargeType?: string | null
    chargeValue?: string | null
    isChargeTransferedToCustomer?: boolean | null
    comments?: any | null
    merchantKYC?: any | null
    merchantKey?: any | null
    approvalStatus?: number | null
    disapprovedComment?: any | null
    isPaymentPageCustomizationEnabled?: boolean | null
    directIntegrationStatus?: number | null
    oldMerchantId?: any | null
    oldGatewayMerchantId?: any | null
    isKeysVisible?: boolean | null
    tokenization?: boolean | null
    eNaira?: boolean | null
    merchantPortalId?: string | null
    chargeCap?: number | null
    receiveInternationalPayment?: boolean | null
    whoToCharge?: string
    isProcessingFees?: boolean
    bankName?: string
  }
 
 
 
  export class CategoriesReport {
    name: string = "";
    value: number = 0;
  }

  export class BillersReport {
    name: string = "";
    value: number = 0;
  }

  export class ProductsReport {
    name: string = "";
    value: number = 0;
  }

  export class Statistics {
    pendingTransaction?: number = 0;
    pendingTransactionCount?: number = 0;
    totalTransaction: number = 0;
    totalTransactionCount: number = 0;
    successfulTransaction: number = 0;
    successfulTransactionCount: number = 0;
    failedTransaction: number = 0;
    failedTransactionCount: number = 0;
    categoriesReport: CategoriesReport[] = new Array<CategoriesReport>();
    billersReport: BillersReport[] = new Array<BillersReport>();
    productsReport: ProductsReport[] = new Array<ProductsReport>();
  }

  export class TransactionDtos {
    id: number = 0;
    amount: number = 0;
    categoryName: string = "";
    productName: string = "";
    productCode?: string = "";
    billerName: string = "";
    billerCode: string = "";
    requestId: string = "";
    referenceNumber: string = "";
    billerReferenceNumber: string = "";
    billerStatusCode: string = "";
    billerStatusMessage: string = "";
    transactionDate: string = "";
    merchantId: string = "";
    performedBy?: string = "";
    mdCustomer: boolean = false;
  }

  export class TableData<T> {
    [key: string]: T;
    constructor(keyName: string, items: T) {
      this[keyName] = items;
    }
  }

  export class TopTenTransaction {
    hasNextRecord: boolean = false;
    totalCount: number = 0;
    transactionDTOS: TransactionDtos[] = new Array<TransactionDtos>();
  }
}

export interface BaseQueryErrorResponse {
  status: number;
  data: APIResponse.API<null>;
}
