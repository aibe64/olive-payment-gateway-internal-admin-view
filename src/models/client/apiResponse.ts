import { UploadFile } from "antd/lib/upload/interface";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export namespace Response {
  export class API {
    data?: any;
    responseCode?: string;
    responseMessage?: string;
    jwtToken?: string;
    refreshToken?: string;
    success?: boolean;
  }

  export class Data<T> {
    responseCode: string = "";
    responseMessage: string = "";
    data: T | undefined;
    jwtToken?: string;
    refreshToken?: string;
    success?: boolean;
  }

  export interface AxiosError<T = any, D = any> extends Error {
    config: AxiosRequestConfig<D>;
    code?: string;
    request?: any;
    response?: AxiosResponse<T, D>;
    isAxiosError: boolean;
    toJSON: () => object;
  }

  export class Settings {
    ApiDomain?: string;
    SSODomain?: string;
    PaymentLink?: string;
    Role?: any;
    ApiDomain2?: string;
    SSOBackendDomain?: string;
    DocumentationLink?: string;
  }

  export class UserInfo {
    firstName?: string;
    lastName?: string;
    email?: string;
    referralCode?: string;
    myReferralCode?: string;
    isFirstimeLogin?: boolean;
    phoneNumber?: string;
    roleId?: number;
    merchantId?: number;
    isRegistrationCompleted?: boolean;
    isSelfOnboarding?: boolean;
    businessName?: string;
    isInternalUser?: boolean;
    code?: any;
    token?: string;
  }

  export interface Industries {
    $id: string;
    id: number;
    industryName: string;
  }

  export interface IndustriesResponse {
    $id: string;
    $values: Industries[];
  }

  export interface MerchantCategories {
    $id: string;
    id: number;
    category: string;
  }

  export interface MerchantCategoriesResponse {
    $id: string;
    $values: MerchantCategories[];
  }

  export class Banks {
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

  export interface BanksResponse {
    $id: string;
    $values: Banks[];
  }

  export interface FileResponse {
    $id: string;
    filename: string;
    url: string;
    fileType: string;
  }

  export class UploadedFiles {
    fileType?: string;
    fileResponse?: Array<FileResponse>;
  }

  export class BusinessIdentification {
    $id?: string;
    comment?: string;
    categoryName?: string;
    directorName?: string;
    isAccepted?: boolean;
    url?: string;
    identification?: string;
    identificationNumber?: string;
    bvn?: string;
    boardResolution?: string;
    files?: BusinessIdentificationFiles[] | null;
  }
  export class BusinessIdentificationFiles {
    id?: number;
    comment?: string;
    name?: string;
    isAccepted?: boolean;
    url?: string;
    identification?: string;
    identificationNumber?: string;
  }

  export class Identification {
    $id?: string;
    comment?: string;
    fileName?: string;
    fileType?: string;
    isAccepted?: boolean;
    url?: string;
    identification?: string;
    identificationNumber?: string;
  }

  export class SettlementAccountResponse {
    $id?: string;
    accountName?: string;
    accountNumber?: string;
  }

  export class Files {
    userIdentification?: Values;
    businessIdentification?: BusinessIdentification;
    governmentIdentification?: Values;
  }

  export class Values {
    $values?: Array<Identification>;
  }

  export class MerchantDetails {
    $id?: string;
    sn?: number;
    key?: number;
    accountName?: string;
    bankCode?: string;
    businessAddress?: string;
    comments?: string;
    approvedBy?: string;
    updatedBy?: string;
    businessEmail?: string;
    businessName?: string;
    merchantName?: string;
    businessNumber?: string;
    businessType?: string;
    disputeEmail?: string;
    dateUpdated?: string;
    kycStatus?: string;
    id?: number;
    merchantID?: number;
    industry?: string;
    isRegistrationCompleted?: boolean;
    isActive?: boolean;
    kycDocument?: Files;
    transactionLimit?: string;
    logo?: string;
    merchantCategory?: string;
    merchantKey?: string;
    productDescription?: string;
    serviceCategory?: string;
    settlementAccountNumber?: string;
    isChargeTransferedToCustomer?: boolean;
    staffSize?: string;
    supportEmail?: string;
    userId?: string;
    website?: string;
    dateProfiled?: string;
    action?: any;
    status?: any;
    useBin?: boolean;
    useDefault?: boolean;
    useStaticRoute?: boolean;
    defaultProvider?: string;
    staticRouteProvider?: string;
    qrPayment?: boolean;
    accountPayment?: boolean;
    tokenization?: boolean;
    bankTrasferPayment?: boolean;
    ussdPayment?: boolean;
    cardPayment?: boolean;
    walletPayment?: boolean;
    chargeName?: string;
    chargeType?: string;
    bvn?: string;
    chargeValue?: string;
    whoToCharge?: string;
    approvalStatus?: number;
    disapprovedComment?: string;
    isPaymentPageCustomizationEnabled?: boolean;
    webHookUrl?: string = "";
    isKeysVisible?: boolean;
    oldMerchantId?: string;
    eNaira?: boolean;
    receiveInternationalPayment?: boolean;
  }

  export class KYCResponse {
    $id?: string;
    comment?: any;
    fileName?: string;
    fileType?: string;
    id?: number;
    identification?: string;
    identificationNumber?: string;
    isAccepted?: boolean;
    isNew?: boolean;
    isRejected?: boolean;
    dateApproved?: string;
    dateCreated?: Date;
    dateDisapproved?: string;
    dateModified?: string;
    isApproved?: boolean;
    isDisapproved?: boolean;
    fileDescription?: string;
    remarks?: string;
    merchantId?: number;
    documentUrl?: string;
    showKycDocument?: boolean = true;
    kycFiles?: Array<UploadFile>;
  }

  export class TransactionLimit {
    $id?: string;
    id?: number;
    name?: string;
    limit?: string;
    dateCreated?: string;
    dateModified?: any;
    key?: number;
  }

  export class TransactionLimitResponse {
    $id?: string;
    $values?: TransactionLimit[];
  }

  export class MockCountries {
    name?: string;
    code?: string;
  }

  export class ProviderResponse {
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

  export class BinResponse {
    key?: number;
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
  export class CardBrandResponse {
    $id?: string;
    id?: number;
    brand?: string;
    dateCreated?: Date;
    dateModified?: any;
  }

  export class MerchantUsersResponse {
    $id?: string;
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    userId?: string;
    businessName?: string;
    isDeveloper?: boolean;
    phoneNumber?: string;
    roleId?: number;
    dateCreated?: any;
    referralCode?: string;
    myReferralCode?: any;
    howDoYouKnowAboutUs?: string;
    merchantId?: number;
    isActive?: boolean;
    userRole?: MerchantUserRole;
    status?: any;
    key?: number;
    role?: string;
  }

  export class MerchantUserRole {
    $id?: string;
    id?: number;
    name?: string;
    description?: string;
    datecreated?: string;
    roleResources?: any;
  }

  export class MerchantRoles {
    $id?: string;
    datecreated?: Date;
    description?: string;
    id?: number;
    name?: string;
    roleResources?: any;
  }

  export class SSOUsers {
    $id?: string;
    key?: number;
    userId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    roleId?: number;
    referralCode?: any;
    myReferralCode?: any;
    isSelfOnboarding?: boolean;
    role?: string;
    userRole?: MerchantRoles;
  }

  export class TransactionReport {
    $id?: string;
    id?: number;
    firstname?: string;
    lastname?: string;
    organization?: string;
    address?: string;
    accountNumber?: string;
    accountName?: string;
    dateOfBirth?: string;
    amount?: any;
    paymentType?: string;
    publicKey?: string;
    clientRedirectUrl?: string;
    cardPan?: string;
    cvv?: string;
    expiryMonth?: string;
    expiryYear?: string;
    email?: string;
    currency?: string;
    transactionReference?: string;
    xpressReference?: string;
    providerReference?: string;
    redirectUrl?: string;
    billingZip?: string;
    billingAddress?: string;
    billingCity?: string;
    billingState?: string;
    billingCountry?: string;
    country?: string;
    phoneNumber?: string;
    deviceFingerPrint?: string = "";
    ip?: string = "";
    metas?: string = "";
    narration?: string;
    authModelUsed?: string;
    authUrl?: string;
    cardBin?: string;
    brand?: string;
    cardType?: string;
    otp?: string;
    processor?: string;
    merchant?: number;
    bankCode?: string;
    bvn?: string;
    paymentResponseCode?: string;
    paymentResponseMessage?: string;
    authenticatePaymentResponseCode?: string;
    authenticatePaymentResponseMessage?: string;
    dateCreated?: string;
    dateModified?: string;
    billerCode?: string;
    mandateCode?: string;
    transType?: string;
    authData?: string;
    metaData?: any;
    isReportPush?: boolean;
    reportPushDate?: string;
    productId?: string;
    productDescription?: string;
    reference?: string;
    transactionInformation?: string;
    paymentMethod?: string;
    status?: any;
    datePaid?: string;
    key?: number;
    merchantName?: string;
    oldMerchantId?: any;
    oldGatewayMerchantId?: any;
    transactionNumber?: any;
    oldMerchantKey?: string;
    eNaira?: boolean;
    chargeType?: any;
    chargeValue?: any;
  }
  export class AdditionalTransactionReport {
    $id?: string;
    id?: number;
    accountNumber?: string;
    accountName?: string;
    total_Amount_Paid?: number;
    paymentType?: string;
    cardPan?: string;
    email?: string;
    payment_Reference?: string;
    xpressReference?: string;
    narration?: string;
    merchant?: number;
    paymentResponseCode?: string;
    paymentResponseMessage?: string;
    payment_Date?: Date;
    settlement_Date?: Date;
    metaData?: string;
    programme_Type?: any;
    charges?: number;
    name_of_Payer?: string;
    matric_No?: string;
    level?: string;
    course?: string;
    phone?: string;
    purpose?: string;
    net_Amount_Received?: number;
    settlementDate?: string;
  }

  export class Permissions {
    $id?: string;
    id?: number;
    claim?: string;
    name?: string;
    roleResources?: any;
    isChecked?: boolean;
  }

  export class RoleResourcesValues {
    $id?: string;
    $values?: Array<Permissions>;
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
    roleResources?: RoleResourcesValues;
  }

  export class Menu {
    key?: string;
    icon?: string;
    name?: string;
    topBarKey?: string;
    url?: string;
    menuId?: string;
    claim?: string;
  }

  export class MerchantApproval {
    $id?: string;
    key?: number;
    merchantId?: number;
    businessName?: string;
    businessNumber?: string;
    bankCode?: string;
    accountName?: string;
    settlementAccountNumber?: string;
    tokenization?: boolean;
    businessType?: string;
    card?: any;
    account?: any;
    bank?: any;
    wallet?: any;
    ussd?: any;
    qr?: any;
    cardPayment?: boolean;
    accountPayment?: boolean;
    ussdPayment?: boolean;
    qrPayment?: boolean;
    walletPayment?: boolean;
    bankTrasferPayment?: boolean;
    chargeType?: string;
    chargeValue?: string;
    isChargeTransferedToCustomer?: boolean;
    transactionLimit?: number;
    isActive?: boolean;
    createdByUserId?: number;
    dateCreated?: string;
    approvedByUserId?: number;
    dateApproved?: string;
    isApproved?: boolean;
    disapprovedByUserId?: number;
    dateDisapproved?: string;
    isDisapproved?: boolean;
    disapprovedComment?: string;
    approvalDate?: string;
    approvalStatus?: any;
    isKeysVisible?: boolean;
    eNaira?: boolean;
    receiveInternationalPayment?: boolean;
  }

  export interface SubscriptionPlan {
    planName: string;
    intervalCode: string;
    invoiceLimit: number;
  }

  export interface Field {
    fieldName: string;
    orderCode: number;
  }

  export interface PaymentPage {
    key?: number;
    $id: string;
    id: number;
    businessName: string;
    name: string;
    pageName: string;
    description: string;
    amount: number;
    isFixedAmount: boolean;
    isPhoneNumberRequired: boolean;
    paymentPageLink: string;
    callBackUrl: string;
    isTestMode: boolean;
    pageType: string;
    additionalFields: string;
    isActive: boolean;
    successMessage: string;
    notificationEmail: string;
    paymentPageLinkReference: string;
    dateCreated: string;
    isDeleted: boolean;
    status?: any;
    type?: any;
    link?: any;
  }
  export class PaymentPageTransactions {
    $id?: string;
    id?: number;
    firstname?: string;
    lastname?: string;
    accountNumber?: any;
    accountName?: any;
    dateOfBirth?: any;
    amount?: number;
    paymentType?: string;
    publicKey?: string;
    clientRedirectUrl?: any;
    cardPan?: string;
    expiryMonth?: string;
    expiryYear?: string;
    email?: string;
    currency?: string;
    transactionReference?: string;
    xpressReference?: string;
    providerReference?: string;
    redirectUrl?: any;
    billingZip?: any;
    billingAddress?: any;
    billingCity?: any;
    billingState?: any;
    billingCountry?: any;
    country?: string;
    phoneNumber?: string;
    narration?: any;
    authModelUsed?: any;
    authUrl?: string;
    cardBin?: string;
    brand?: string;
    cardType?: any;
    otp?: string;
    processor?: string;
    merchant?: number;
    bankCode?: any;
    bvn?: any;
    paymentResponseCode?: string;
    paymentResponseMessage?: string;
    authenticatePaymentResponseCode?: string;
    authenticatePaymentResponseMessage?: string;
    dateCreated?: string;
    dateModified?: Date;
    billerCode?: any;
    mandateCode?: any;
    transType?: any;
    authData?: any;
    metaData?: string;
    productId?: string;
    productDescription?: string;
    transactionNumber?: any;
    merchantName?: string;
  }
  export class ProductImageValues {
    $id?: string;
    id?: number;
    url?: any;
    fileName?: any;
    createdByUserId?: number;
    dateCreated?: Date;
    updatedByUserId?: number;
    dateModified?: Date;
  }

  export class ProductImages {
    $id?: string;
    $values?: ProductImageValues[];
  }

  export class Product {
    $id?: string;
    id?: number;
    key?: number;
    merchantId?: number;
    productName?: string;
    name?: string;
    productReference?: string;
    description?: string;
    productUrl?: string;
    currency?: string;
    unitPrice?: number;
    price?: string;
    inStock?: any;
    stock?: any;
    minimumOrder?: number;
    maximumOrder?: number;
    stockLimitAlert?: number;
    isUnlimited?: boolean;
    isActive?: boolean;
    productImages?: ProductImages;
    createdByUserId?: number;
    dateCreated?: string;
    updatedByUserId?: number;
    dateModified?: Date;
    merchant?: any;
    deliveryLocation?: string;
    deliveryFee?: number;
    deliveryPrice?: string;
    isPayOnDelivery?: boolean;
    isDeliveryAddressRequired?: boolean;
    deliveryNoteOption?: string;
    callBackUrl?: string;
    successMessage?: string;
    notificationEmail?: string;
    options?: string;
    checked?: boolean;
  }
  export class ProductTransactions {
    $id?: string;
    firstName?: string;
    lastName?: string;
    accountNumber?: any;
    accountName?: any;
    amount: number = 0;
    quantity: number = 0;
    email?: string;
    dateCreated?: any;
    deliveryDetails?: any;
    dateOfBirth?: any;
    paymentType?: string;
    cardPan?: string;
    expiryMonth?: string;
    expiryYear?: string;
    currency?: string;
    transactionReference?: string;
    country?: string;
    phoneNumber?: string;
    brand?: string;
    processor?: string;
    paymentResponseCode?: string;
    paymentResponseMessage?: string;
  }
  export class ProductTransactionExtraFields {
    FirstName?: string;
    LastName?: string;
    PhoneNumber?: string;
    DeliveryFee?: number;
    DeliveryStreetAddress?: string;
    deliveryStateAddress?: any;
    deliveryCountryAddress?: any;
    DeliveryNote?: any;
    ShippingRegion?: string;
    IsPayOnDelivery?: boolean;
  }
  export class ProductUplooadImages {
    $id?: string;
    filename?: string;
    url?: string;
  }

  export class StorePage {
    id?: number;
    key?: number;
    storeProduct?: any;
    storeName?: string;
    currency?: string;
    storeLink?: any;
    link?: any;
    storeReference?: string;
    isActive?: boolean;
    themeColor?: string;
    welcomeMessage?: string;
    description?: string;
    phoneNumber?: string;
    whatappNumber?: string;
    email?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    isDeleted?: boolean;
    isArchived?: boolean;
    isDeliveryAddressRequired?: boolean;
    deliveryNoteOption?: string;
    deliveryFee?: string;
    deliveryLocation?: string;
    callBackUrl?: string;
    successMessage?: string;
    notificationEmail?: string;
    orders?: number;
    revenue?: any;
    status?: any;
    orderCount?: number;
    numberOfProducts?: number;
    dateCreated?: string;
  }

  export class Products {
    $id?: string;
    id?: number;
    merchantId?: number;
    productName?: string;
    productReference?: string;
    description?: string;
    productUrl?: string;
    currency?: string;
    unitPrice?: number;
    inStock?: number;
    minimumOrder?: number;
    maximumOrder?: number;
    stockLimitAlert?: number;
    isUnlimited?: boolean;
    isActive?: boolean;
    deliveryLocation?: string;
    deliveryFee?: number;
    isPayOnDelivery?: boolean;
    isDeliveryAddressRequired?: boolean;
    deliveryNoteOption?: string;
    callBackUrl?: string;
    successMessage?: string;
    notificationEmail?: string;
    options?: string;
    productImages?: ProductImages;
    createdByUserId?: number;
    dateCreated?: Date;
    updatedByUserId?: number;
    dateModified?: Date;
    merchant?: any;
  }

  export class StoreProducts {
    $id?: string;
    id?: number;
    productID?: number;
    isActive?: boolean;
    storeID?: number;
    product?: Products;
    createdByUserID?: number;
    dateCreated?: Date;
    modifiedByUserID?: any;
    dateModified?: any;
  }
  export class CartValue {
    $id?: string;
    productName?: string;
    productReference?: string;
    quantity?: number;
    totalAmount?: number;
  }

  export class Cart {
    $id?: string;
    $values?: CartValue[];
  }

  export class StoreTransactions {
    $id?: string;
    productID?: number;
    firstName?: string;
    lastName?: string;
    accountNumber?: string;
    accountName?: string;
    amount?: number;
    cart?: Cart;
    email?: string;
    dateCreated?: string;
    deliveryDetails?: string;
    dateOfBirth?: any;
    paymentType?: string;
    cardPan?: string;
    expiryMonth?: any;
    expiryYear?: any;
    currency?: any;
    transactionReference?: string;
    tranReference?: any;
    country?: string;
    phoneNumber?: string;
    brand?: any;
    processor?: string;
    paymentResponseCode?: string;
    paymentResponseMessage?: string;
  }
  export class Notification {
    $id?: string;
    id?: number;
    pageKey?: string;
    isVisited?: boolean;
    notificationMessage?: string;
    dateCreated?: Date;
    dateModified?: Date;
    merchantId?: number;
    isAdmin?: boolean;
  }
  export interface TransactionReceipt {
    $id: string;
    id: number;
    firstname: string;
    lastname: string;
    accountNumber: string;
    accountName: string;
    dateOfBirth?: any;
    amount: number;
    paymentType: string;
    publicKey: string;
    clientRedirectUrl?: any;
    cardPan: string;
    expiryMonth: string;
    expiryYear: string;
    email: string;
    currency: string;
    transactionReference: string;
    xpressReference: string;
    providerReference?: any;
    redirectUrl?: any;
    billingZip?: any;
    billingAddress?: any;
    billingCity?: any;
    billingState?: any;
    billingCountry?: any;
    country: string;
    phoneNumber?: any;
    narration?: any;
    authModelUsed?: any;
    authUrl?: any;
    cardBin: string;
    brand: string;
    cardType?: any;
    otp?: any;
    processor: string;
    merchant: number;
    bankCode: string;
    bvn?: any;
    paymentResponseCode: string;
    paymentResponseMessage: string;
    authenticatePaymentResponseCode: string;
    authenticatePaymentResponseMessage: string;
    dateCreated: string;
    dateModified: string;
    billerCode?: any;
    mandateCode?: any;
    transType?: any;
    authData?: any;
    metaData?: any;
    isReportPush: boolean;
    reportPushDate?: any;
    productId: string;
    productDescription: string;
    transactionNumber?: any;
    merchantName: string;
    oldMerchantKey: string;
    oldGatewayMerchantId?: any;
  }
}
