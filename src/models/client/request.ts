export namespace APIRequest {
  export interface MerchantRequest {
    id: number;
    userId: string;
    businessName: string;
    businessType: string;
    businessNumber: string;
    staffSize: string;
    industry: string;
    serviceCategory: string;
    businessEmail: string;
    supportEmail: string;
    disputeEmail: string;
    businessAddress: string;
    settlementAccountNumber: string;
    accountName: string;
    bankCode: string;
    isActive: boolean;
    cardPayment: boolean;
    accountPayment: boolean;
    ussdPayment: boolean;
    qrPayment: boolean;
    walletPayment: boolean;
    bankTransferPayment: boolean;
    businessLogo: string;
    transactionLimit: number;
    dateProfiled: string;
    dateUpdated: string;
    website: string;
    twitterAccount: string;
    facebookAccount: string;
    instagramAccount: string;
    isRegistrationCompleted: boolean;
    productDescription: string;
    merchantCategory: string;
    kycStatus: string;
    updatedBy: string;
    webHookUrl: string;
    useBin: boolean;
    useStaticRoute: boolean;
    staticRouteProvider: string;
    useDefault: boolean;
    defaultProvider: string;
    categoryName: string;
    directorName: string;
    bvn: string;
    registrationStatus: string;
    chargeType: string;
    firstName: string;
    lastName: string;
    chargeValue: string;
    chargeCap: number;
    isKycApproved: boolean;
    isChargeTransferedToCustomer: boolean;
    comments: string;
    approvalStatus: number;
    disapprovedComment: string;
    isPaymentPageCustomizationEnabled: boolean;
    directIntegrationStatus: number;
    oldMerchantId: string;
    oldGatewayMerchantId: string;
    isKeysVisible: boolean;
    disabled: boolean;
    tokenization: boolean;
    eNaira: boolean;
    receiveInternationalPayment: boolean;
    merchantPortalId: string;
  }

  export interface QrMerchant {
    id?: number;
    institutionNumber?: string;
    type?: string;
    merchantNum?: string;
    merchantName?: string;
    merchantTIN?: string;
    contact?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    bankCode?: string;
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    transactionFeeBearer?: string;
    emv?: string;
    createdAt?: string;
    updatedAt?: string;
    isHub?: boolean;
    notificationUrl?: string;
  }

  export interface QrSubMerchant {
    name?: string;
    merchantNumber?: string;
    phonenumber?: string;
    email?: string;
    channel?: number;
    terminalId?: string;
    id?: number;
    isHub?: boolean;
    notificationUrl?: string;
  }

  export interface TransactionsVars {
    page: number;
    limit: number;
    filter: TransactionsFilters;
  }

  export interface TransactionsFilters {
    customerEmail?: string | null;
    reference?: string | null;
    transactionId?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    cardBrand?: string | null;
    paymentMethod?: string | null;
    status?: string | null;
    storeName?: string | null;
    merchantId?: number | null;
    currency?: string | null;
  }

  export interface StoreTransactionsVars {
    page: number;
    limit: number;
    filter: {
      customerEmail?: string | null;
      reference?: string | null;
      transactionId?: string | null;
      startDate?: string | null;
      endDate?: string | null;
      cardBrand?: string | null;
      paymentMethod?: string | null;
      status?: string | null;
      storeName?: string | null;
      currency?: string | null;
    };
  }
  export interface StoreTransactionFilterInput {
    customerEmail?: string | null;
    reference?: string | null;
    transactionId?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    cardBrand?: string | null;
    paymentMethod?: string | null;
    status?: string | null;
  }
  export interface StoreOverviewFilterVar {
    filter: {
      customerEmail?: string | null;
      reference?: string | null;
      transactionId?: string | null;
      startDate?: string | null;
      endDate?: string | null;
      cardBrand?: string | null;
      paymentMethod?: string | null;
      status?: string | null;
    };
  }

  export interface TransactionFilterVar {
    filter: {
      customerEmail?: string | null;
      reference?: string | null;
      transactionId?: string | null;
      startDate?: string | null;
      endDate?: string | null;
      cardBrand?: string | null;
      paymentMethod?: string | null;
      status?: string | null;
      merchantId?: number | null;
      currency?: string | null;
    };
  }

  export interface TransactionFilterInput {
    customerEmail?: string | null;
    reference?: string | null;
    transactionId?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    cardBrand?: string | null;
    paymentMethod?: string | null;
    status?: string | null;
    currency?: string | null;
  }

  export interface YearlyTransactionsFilterInput {
    filter: {
      year: string;
    };
  }

  export class Provider {
    name?: string;
    shortName?: string;
    card?: boolean;
    account?: boolean;
    ussd?: boolean;
    isActive?: boolean;
    id?: number;
    bankTransfer?: boolean;
    wallet?: boolean;
    qr?: boolean;
  }

  export interface Bin {
    id?: number;
    binName?: string;
    provider?: string;
    isActive?: boolean;
    isOthersRequired?: boolean;
    isPinRequired?: boolean;
    cardBrand?: string;
  }

  export class TransactionManager {
    merchantId?: number;
    useBin?: boolean;
    useStaticRoute?: boolean;
    useDefaultProvider?: boolean;
    staticRouteProvider?: string;
    defaultProvider?: string;
    merchantName?: string;
    isActive?: boolean;
  }

  export interface BankRequest {
    id?: number;
    bankName?: string;
    bankCode?: string;
    isPhoneNumberRequired?: boolean;
    phoneNumberRequired?: any;
    dateOfBirthRequired?: any;
    bvnRequired?: any;
    narrationRequired?: any;
    nameRequired?: any;
    visibleonPayment?: any;
    isDateOfBirthRequired?: boolean;
    isBvnRequired?: boolean;
    isNarrationRequired?: boolean;
    isNameRequired?: boolean;
    isPinRequired?: boolean;
    isVisibleToMerchantForPayment?: boolean;
    provider?: string;
  }

  export class RoleAndPermission {
    roleName?: string;
    roleId?: number;
    description?: string;
    isActive?: boolean;
    permissions?: Array<Permission>;
  }
  export class Permission {
    id?: number;
    claim?: string;
    isChecked?: boolean;
    name?: string;
  }

  export interface InternalUsers {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    userId?: string;
    roleId?: number;
    isActive?: boolean;
    isInternalUser?: boolean;
  }
  export interface PaymentMethod {
    id?: number;
    paymentType?: number;
    feeType?: string;
    defaultCharge?: number;
    chargeCap?: number;
    description?: string;
    isEnabledGlobal?: boolean;
    isDefault?: boolean;
  }
  export interface StorePaymentMethod extends PaymentMethod {
    feeType?: string
    isActive?: boolean
    fee?: number
  }
}
