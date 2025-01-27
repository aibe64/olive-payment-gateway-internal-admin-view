import { APIResponseCode } from "../application";

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
    id?: number | null;
    userId?: string | null;
    businessName?: string | null;
    businessType?: any | null;
    businessNumber?: string | null;
    staffSize?: string | null;
    industry?: string | null;
    serviceCategory?: string | null;
    businessEmail?: string | null;
    supportEmail?: string | null;
    disputeEmail?: string | null;
    businessAddress?: string | null;
    settlementAccountNumber?: string | null;
    accountName?: string | null;
    bankCode?: string | null;
    isActive?: boolean | null;
    cardPayment?: boolean | null;
    accountPayment?: boolean | null;
    ussdPayment?: boolean | null;
    qrPayment?: boolean | null;
    walletPayment?: boolean | null;
    bankTransferPayment?: any | null;
    transactionLimit?: number | null;
    logo?: any | null;
    dateProfiled?: string | null;
    dateUpdated?: string | null;
    website?: string | null;
    twitterAccount?: string | null;
    facebookAccount?: any | null;
    instagramAccount?: string | null;
    isRegistrationCompleted?: boolean | null;
    productDescription?: string | null;
    merchantCategory?: any | null;
    kycStatus?: string | null;
    updatedBy?: string | null;
    webHookUrl?: string | null;
    useBin?: boolean | null;
    useStaticRoute?: boolean | null;
    staticRouteProvider?: any | null;
    useDefault?: boolean | null;
    defaultProvider?: any | null;
    categoryName?: any | null;
    directorName?: any | null;
    bvn?: any | null;
    registrationStatus?: any | null;
    chargeType?: string | null;
    chargeValue?: string | null;
    isChargeTransferedToCustomer?: boolean | null;
    comments?: any | null;
    merchantKYC?: any | null;
    merchantKey?: any | null;
    approvalStatus?: number | null;
    disapprovedComment?: any | null;
    isPaymentPageCustomizationEnabled?: boolean | null;
    directIntegrationStatus?: number | null;
    oldMerchantId?: any | null;
    oldGatewayMerchantId?: any | null;
    isKeysVisible?: boolean | null;
    tokenization?: boolean | null;
    eNaira?: boolean | null;
    merchantPortalId?: string | null;
    chargeCap?: number | null;
    receiveInternationalPayment?: boolean | null;
    whoToCharge?: string;
    isProcessingFees?: boolean;
    bankName?: string;
  }

  export interface MerchantApproval {
    id: number;
    merchantId: number;
    cardPayment: boolean;
    accountPayment: boolean;
    ussdPayment: boolean;
    qrPayment: boolean;
    walletPayment: boolean;
    bankTransferPayment: boolean;
    chargeType: string;
    chargeValue: string;
    isChargeTransferedToCustomer: boolean;
    transactionLimit: number;
    isActive: boolean;
    createdByUserId: number;
    dateCreated: string;
    approvedByUserId: any;
    dateApproved: any;
    isApproved: boolean;
    disapprovedByUserId: any;
    dateDisapproved: any;
    isDisapproved: boolean;
    disapprovedComment: any;
    businessName: string;
    businessType: any;
    businessNumber: string;
    settlementAccountNumber: string;
    accountName: string;
    bankCode: string;
    eNaira: boolean;
    receiveInternationalPayment: boolean;
  }
  export interface UserActivity {
    id: number;
    accessCode: string;
    createdAt: string;
    message: string;
    reference: string;
    transactionId: string;
    type: string;
    __typename: string;
  }
  export interface Transaction {
    _typename: string;
    id: string;
    transactionReference: string;
    firstname: string;
    lastname: string;
    amount: number;
    paymentType: string;
    publicKey: string;
    clientRedirectUrl: string;
    expiryMonth: string;
    expiryYear: string;
    email: string;
    currency: string;
    transactionId: string;
    xpressReference: string;
    providerReference: string;
    phoneNumber: string;
    narration: string;
    cardBin: string;
    brand: string;
    cardType: string;
    processor: string;
    merchantId: string;
    paymentResponseCode: APIResponseCode;
    paymentResponseMessage: string;
    dateCreated: string;
    dateModified: string;
    billerCode: string;
    mandateCode: string;
    transType: string;
    cardPan: string;
    metaData: string;
    productDescription: string;
    productId: string;
    merchantName: string;
    transactionNumber: string;
    transactionDate: string;
    userActivities: UserActivity[];
  }
  export interface StoreTransaction {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    customerAddress: string;
    merchantName: string;
    city: string;
    country: string;
    deliveryNotes: string;
    isBeneficiary: boolean;
    totalAmount: number;
    dateCreated: string;
    dateUpdated: string;
    isSuccessful: boolean;
    transactionId: string;
    status: APIResponseCode;
    storeName: string;
    paymentResponseMessage: string;
    productDescription: string;
    paymentDate: string;
    paymentReference: string;
    metaData: string;
    merchantId: string;
    isDelivered?: boolean;
    __typename: string;
    discount: {
      code: string;
      discountAmount: number;
    };
    deliveryDetails: {
      customerAddress: string;
      deliveryFee: number;
      region: string;
    };
    productPurchased: {
      id: string;
      productName: string;
      quantity?: number;
      amount: number;
      isLiked: boolean;
      rating: number;
      comment: string;
    }[];
  }

  export interface TransactionsData {
    transactions: {
      items: Transaction[];
      totalCount: number;
      pageNumber: number;
      pageSize: number;
    };
  }

  export interface StoreTransactionsData {
    storeTransactions: {
      items: StoreTransaction[];
      totalCount: number;
      pageNumber: number;
      pageSize: number;
    };
  }

  export interface StoreTransactionSummaryResponse {
    storeTransactionSummarry: {
      item: StoreTransactionSummaryItems;
    };
  }
  export interface StoreTransactionSummaryItems {
    totalOrders: number;
    totalNonDiscountedOrders: number;
    totalDiscountedOrders: number;
    totalGrossSales: number;
    totalNetSales: number;
    totalNonDiscountedAmount: number;
    totalDiscountedAmount: number;
    totalCompletedProductAmount: number;
    totalAbandonedProductAmount: number;
    totalCompletedProduct: number;
    totalAbandonedProduct: number;
    totalSuccessful: number;
    totalSuccessfulAmount: number;
    averageItemsPerOrder: number;
    averageOrderValue: number;
    totalCartProduct: number;
    totalFailed: number;
    totalFailedAmount: number;
    topProducts: { totalQuantity: number; productName: string }[];
    topCustomers: { totalQuantityOrder: number; name: string; email: string }[];
  }

  export interface TransactionSummaryResponse {
    transactionSummarry: {
      item: {
        transactionVolume: number;
        totalTransactionAmount: number;
        nextSettlementAmount: number;
        totalCardTransactionAmount: number;
        totalUSSDTransactionAmount: number;
        totalTransferTransactionAmount: number;
        totalAccountTransactionAmount: number;
        totalQRAmount: number;
        totalENairaTransactionAmount: number;
        totalWalletAmount: number;
      };
    };
  }

  export interface YearlyTransactionsResponse {
    yearlyTransactions: {
      items: {
        transactionMonth: string;
        totalTransactions: number;
        totalTransactionAmount: number;
        totalSuccessfulAmount: number;
        totalSuccessful: number;
        totalFailedAmount: number;
        totalFailed: number;
        totalPending: number;
        totalPendingAmount: number;
      }[];
    };
  }
  export interface Provider {
    $id?: string;
    key?: number;
    account?: any;
    isAccount?: boolean;
    bankTransfer?: any;
    isBankTransfer?: boolean;
    bank?: any;
    isBank?: boolean;
    card?: any;
    isCard?: boolean;
    dateCreated?: string;
    dateModified?: string;
    id?: number;
    isActive?: boolean;
    name?: string;
    qr?: any;
    isQR?: boolean;
    shortName?: string;
    ussd?: any;
    isUssd?: boolean;
    wallet?: any;
    isWallet?: boolean;
    status?: string;
  }

  export interface Bin {
    $id?: string;
    binName?: string;
    bin?: string;
    cardBrand?: string;
    dateCreated?: string;
    status?: string;
    dateModified?: any;
    id?: number;
    isActive?: boolean;
    isOthersRequired?: boolean;
    othersRequired: any;
    isPinRequired?: boolean;
    pinRequired?: any;
    provider?: string;
  }

  export interface Banks {
    $id?: string;
    id?: number;
    key?: number;
    bankName?: string;
    bankCode?: string;
    logoUrl?: any;
    isPhoneNumberRequired?: boolean;
    phoneNumberRequired?: any;
    dateOfBirthRequired?: any;
    bvnRequired?: any;
    narrationRequired?: any;
    nameRequired?: any;
    pinRequired?: any;
    visibleonPayment?: any;
    isDateOfBirthRequired?: boolean;
    isBvnRequired?: boolean;
    isNarrationRequired?: boolean;
    isNameRequired?: boolean;
    isPinRequired?: boolean;
    isVisibleToMerchantForPayment?: boolean;
    provider?: string;
    dateCreated?: any;
    dateModified?: any;
    processor?: string;
  }

  export interface Permission {
    id: number
    name: string
    description: any
    roleResources: any
  }

  export interface Roles {
    id: number;
    name: string;
    roleName: string;
    description: string;
    dateCreated: string;
    dateModified: string;
    isActive?: boolean;
    roleResources: Array<Permissions>;
  }

  export class Permissions {
    $id?: string;
    id?: number;
    claim?: string;
    name?: string;
    roleResources?: any;
    isChecked?: boolean;
    resourceId?: number;
  }

  export class RoleResources {
    $id?: string;
    id?: number;
    key?: number;
    name?: string;
    description?: string;
    isActive?: boolean;
    numberOfPermissions?: number;
    active?: any;
    roleResources?: Array<Permissions>;
  }

  export class TableData<T> {
    [key: string]: T;
    constructor(keyName: string, items: T) {
      this[keyName] = items;
    }
  }

  export interface InternalUsers {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
    roleId: number;
    isActive: boolean;
    roles: any;
    roleName?: string;
    isInternalUser: boolean;
  }

  export interface SubAccount {
    id: number;
    merchantId: number;
    subAccountName: string;
    subAccountEmail: string;
    splitType: "percentage" | "flat";
    bankName: string;
    bankCode: string;
    accountNumber: string;
    accountName: string;
    flatAmount: number;
    merchantSharePercentage: number;
    subAccountShareOfPercentage: number;
    dateCreated: string;
    dateModified: any;
    createdBy: string;
    updatedBy: any;
  }
  export interface SubAccountGroup {
    id: number;
    groupName: string;
    splitType: string;
    deductFeeFrom: string;
    subAccounts?: SubAccountDetails[];
    dateCreated: string;
    dateModified: any;
    createdBy: string;
    updatedBy: any;
  }
  export interface SubAccountDetails {
    amount?: number;
    percentage?: number;
    id: number;
    subAccountName?: string;
  }
}

export interface BaseQueryErrorResponse {
  status: number;
  data: APIResponse.API<null>;
}
