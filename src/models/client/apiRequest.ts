export namespace Request {
  export class ValidateUser {
    appKey?: string;
    token?: string;
  }
  export class UserAccount {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    businessName?: string;
    referralCode?: string;
    isDeveloper?: boolean;
    isNotDeveloper?: boolean;
    howDoYouKnowAboutUs?: string;
    myReferralCode?: string;
    roleId?: number;
  }

  export class FileRequest {
    name?: string;
    url?: string;
    fileType?: string;
  }

  export class KYCDocument {
    $id?: string;
    dateCreated?: Date;
    documentUrl?: string;
    fileName?: string;
    fileType?: any;
    isApproved?: boolean;
  }

  export class MerchantKYC {
    $id?: string;
    $values?: Array<KYCDocument>;
  }

  export class UserIdentification {
    $id?: string;
    comment?: string;
    fileName?: string;
    fileType?: string;
    isAccepted?: boolean;
    url?: string;
    identification?: string;
    identificationNumber?: string;
  }

  export class BusinessIdentification {
    $id?: string;
    id?: number;
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
    fileName?: string;
    fileType?: string;
    isAccepted?: boolean;
    url?: string;
    identification?: string;
    identificationNumber?: string;
  }
  export class GovernmentIdentification {
    id?: number;
    comment?: string;
    fileName?: string;
    fileType?: string;
    isAccepted?: boolean;
    url?: string;
    identification?: string;
    identificationNumber?: string;
  }

  export class Files {
    userIdentification?: Array<UserIdentification> | null | any;
    businessIdentification?: BusinessIdentification | null;
    governmentIdentification?: Array<GovernmentIdentification> | null;
  }

  export class BusinessIDUpload {
    File?: File[];
  }
  export class UserIDUpload {
    File?: File[];
  }

  export class Uploads {
    businessIDUpload?: BusinessIDUpload;
    userIDUpload?: UserIDUpload;
  }
  export class MerchantKey {
    $id?: string;
    testPrivateKey?: string;
    testPublicKey?: string;
    livePrivateKey?: string;
    livePublicKey?: string;
  }

  export class MerchantAccountRequest {
    merchantId?: number;
    $id?: "";
    id?: number;
    tabNumber?: number = 1;
    businessName?: string;
    businessType?: string;
    businessNumber?: string;
    staffSize?: string;
    industry?: string;
    serviceCategory?: string;
    merchantCategory?: string;
    businessEmail?: string;
    supportEmail?: string;
    disputeEmail?: string;
    businessAddress?: string;
    settlementAccountNumber?: string;
    accountName?: string;
    bankCode?: string;
    website?: string;
    twitterAccount?: string;
    facebookAccount?: string;
    instagramAccount?: string;
    productDescription?: string;
    isCompleted?: boolean;
    isRegistrationCompleted?: boolean;
    files?: Files;
    kyc?: Files;
    bvn?: string;
    kycStatus?: string;
    tabActiveStatus?: number;
    kycDocument?: Files | any;
    newFiles?: KYCFilesDetails;
    merchantKey?: MerchantKey;
    validDocument?: string;
    registrationStatus?: number = 0;
    utilityBill?: string;
    isProfileCompleted?: boolean;
    isAccountCompleted?: boolean;
    isDocumentUploaded?: boolean;
    isContactCompleted?: boolean;
    loading?: boolean;
    isFirstTimeRegistration?: boolean;
    webHookUrl?: string;
    isKeysVisible?: boolean;
    individualCategory?: string;
  }

  export class TransactionLimitRequest {
    id?: number = 0;
    name?: string = "";
    limit?: string = "";
  }

  export class KYCFilesDetails {
    kycDocument?: Files;
    bvn?: string;
  }

  export class IdentificationRequest {
    id?: number;
    isAccepted?: boolean;
    isRejected?: boolean;
    remarks?: string;
    name?: string;
    url?: string;
    $id?: string;
    comment?: string;
    identification?: string;
    identificationNumber?: string;
    isNew?: boolean = true;
    disabled?: boolean = false;
  }

  export class MerchantKYCRequest {
    merchantId?: number;
    transactionLimit?: string;
    comment?: string;
    approved?: boolean;
    reUploadFile?: boolean;
    reasonForReUpload?: string;
    isApproved?: boolean = false;
    disableField?: boolean = false;
    userIdentification?: Array<IdentificationRequest> | null;
    businessIdentification?: Array<IdentificationRequest> | null;
    governmentIdentification?: Array<IdentificationRequest> | null;
  }
  export class MerchantKYCRequestFiles {
    files?: Array<IdentificationRequest>;
  }

  export class KycRequest {
    merchantId?: number;
    reUploadFiles?: Array<ReUploadFile>;
  }
  export class ReUploadFile {
    id?: number;
    fileName?: string;
    documentUrl?: string;
    isAccepted?: boolean;
  }

  export class ProviderRequest {
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

  export class BinRequest {
    id?: number;
    binName?: string;
    provider?: string;
    isActive?: boolean;
    isOthersRequired?: boolean;
    isPinRequired?: boolean;
    cardBrand?: string;
  }

  export class TransactionManagerRequest {
    merchantId?: number;
    useBin?: boolean;
    useStaticRoute?: boolean;
    useDefaultProvider?: boolean;
    staticRouteProvider?: string;
    defaultProvider?: string;
    merchantName?: string;
    isActive?: boolean;
  }
  export class MerchantUserRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    phoneNumber?: string;
    roleId?: number;
    token?: string;
    appKey?: string;
    merchantId?: number;
    roleName?: string;
    userId?: string;
  }
  export class RegisteredMerchantRequest {
    merchantId?: number;
    businessName?: string;
    businessType?: string;
    businessNumber?: string;
    businessEmail?: string;
    supportEmail?: string;
    disputeEmail?: string;
    businessAddress?: string;
    settlementAccountNumber?: string;
    accountName?: string;
    bankCode?: string;
    bankName?: string;
    logo?: string;
    cardPayment?: boolean;
    accountPayment?: boolean;
    tokenization?: boolean;
    ussdPayment?: boolean;
    qrPayment?: boolean;
    walletPayment?: boolean;
    bankTrasferPayment?: boolean;
    isProcessingFees?: boolean;
    transactionLimit?: string;
    isActive?: boolean;
    chargeName?: string;
    chargeType?: string;
    chargeValue?: string;
    whoToCharge?: string;
    approvalStatus?: number;
    isKeysVisible?: boolean;
    disapprovedComment?: string;
    isPaymentPageCustomizationEnabled?: boolean;
    oldMerchantId?: string;
    oldMerchantIdForPayload?: string;
    oldMerchantExist?: boolean;
    eNaira?: boolean;
    receiveInternationalPayment?: boolean
  }

  export class BankRequest {
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
    id?: number;
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
  export class MerchantApproval {
    merchantId?: number;
    businessName?: string;
    bankCode?: string;
    accountName?: string;
    businessNumber?: string;
    settlementAccountNumber?: string;
    businessType?: string;
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
    dateCreated?: Date;
    approvedByUserId?: number;
    dateApproved?: Date;
    isApproved?: boolean;
    disapprovedByUserId?: number;
    dateDisapproved?: Date;
    isDisapproved?: boolean;
    disapprovedComment?: string;
    isKeysVisible?: boolean;
    tokenization?: boolean;
    eNaira?: boolean;
    receiveInternationalPayment?: boolean
  }
  export class PaymentPage {
    id?: number;
    merchantId?: number;
    businessName?: string;
    pageName?: string;
    description?: string;
    amount?: number;
    price?: string;
    isFixedAmount?: boolean;
    isPhoneNumberRequired?: boolean;
    paymentPageLink?: string;
    paymentPageLinkReference?: string;
    callBackUrl?: string;
    successMessage?: string;
    notificationEmail?: string;
    isTestMode?: boolean;
    pageType?: string;
    additionalFields?: string;
    isActive?: boolean;
    isDeleted?: boolean;
  }
  export class ProductImage {
    filename?: string | null;
    url?: string | null;
    uid?: string;
    id?: number;
    operation?: string;
  }

  export class Product {
    id?: number;
    productName?: string;
    productReference?: string;
    description?: string;
    productUrl?: string;
    currency?: string;
    unitPrice?: number;
    price?: string;
    inStock?: number;
    minimumOrder?: number;
    maximumOrder?: number;
    isUnlimited?: boolean;
    isActive?: boolean;
    stockLimitAlert?: number;
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
    productImages?: ProductImage[];
  }

  export class StoreProduct {
    productID?: number;
    isActive?: boolean;
    operation?: string;
  }

  export class StorePage {
    id?: number;
    storeProducts?: StoreProduct[];
    storeName?: string;
    currency?: string;
    storeLink?: string;
    storeReference?: string;
    isActive?: boolean;
    themeColor?: string;
    welcomeMessage?: string;
    description?: any;
    phoneNumber?: string;
    whatappNumber?: string;
    email?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    isDeleted?: boolean;
    isArchived?: boolean;
    isDeliveryAddressRequired?: boolean;
    deliveryFee?: string;
    deliveryLocation?: string;
    callBackUrl?: string;
    successMessage?: string;
    notificationEmail?: string;
    deliveryPrice?: string;
    deliveryNoteOption?: string;
  }
  export class Notification {
    id?: number;
    isVisited?: boolean;
    merchantId?: number;
  }
}
