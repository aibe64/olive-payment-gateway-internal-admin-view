import { State } from "../../models/application/state";
import { Request } from "../../models/client/apiRequest";
import { Appsettings } from "../../models/enums/appSettings";
import apiConfig from "../apiConfig";
import { Notification } from "../../shared/components/notification";

export class ComplianceState {
  static UpdateMerchantDetails(state: State.ComplianceState) {
    state.merchant.businessEmail = sessionStorage.getItem("*********") as string;
    if (state.merchant.isRegistrationCompleted === true) {
      // history.push("/Dashboard");
      window.location.href = "/Dashboard";
      return;
    }
    if (
      state.merchant.merchantCategory ===
        Appsettings.MerchantCategory.Individual1 ||
      state.merchant.merchantCategory ===
        Appsettings.MerchantCategory.Individual2
    ) {
      state.showIndividualMerchantCategory = true;
    }
    state.merchant.merchantId = state.merchant.id;
    state.merchant.kycDocument = state.merchant.kyc
      ? state.merchant.kyc
      : state.merchant.kycDocument;
    if (state.apiResponse?.kycDocument?.businessIdentification) {
      state.merchant.files = state.merchant.kycDocument;
      state.businessIdentification!.files =
        state.apiResponse?.kycDocument?.businessIdentification.files.$values;
      state.businessIdentification!.bvn =
        state.apiResponse?.kycDocument?.businessIdentification.bvn;
      state.businessIdentification!.id =
        state.apiResponse?.kycDocument?.businessIdentification.id;
      state.businessIdentification!.categoryName =
        state.apiResponse?.kycDocument?.businessIdentification.categoryName;
      state.businessIdentification!.directorName =
        state.apiResponse?.kycDocument?.businessIdentification.directorName;
    }
    if (
      state.merchant.kycDocument?.userIdentification ||
      state.merchant.kycDocument?.userIdentification !== null
    ) {
      state.merchant.files = state.merchant.kycDocument;
      state.userIdentification =
        state.apiResponse?.kycDocument?.userIdentification?.$values;
    } else {
      let userIdentifications = new Array<Request.UserIdentification>();
      userIdentifications.push({
        identification: "",
        fileType: Appsettings.ComplianceFileType.ValidIdentification,
        url: "",
        fileName: "",
        identificationNumber: "",
      });
      userIdentifications.push({
        identification: "",
        fileType: Appsettings.ComplianceFileType.UtilityBill,
        url: "",
        fileName: "",
        identificationNumber: "",
      });
      state.userIdentification = userIdentifications;
    }
    if (
      Array.isArray(
        state.apiResponse?.kycDocument?.governmentIdentification?.$values
      )
    ) {
      state.merchant.files = state.merchant.kycDocument;
      state.govtIdentification =
        state.apiResponse?.kycDocument?.governmentIdentification?.$values;
    }
    state.merchant = setMerchantStatusDetails(state.merchant);
    state.loading = false;
    return state;
  }
  static UpdateDefaultState(state: State.ComplianceState) {
    const businessName: string = sessionStorage.getItem("*******")
      ? (sessionStorage.getItem("*******") as string)
      : "";
    state.merchant.businessName = businessName;
    state.merchant.individualCategory = state.merchant.merchantCategory
    state.merchant.businessEmail = sessionStorage.getItem("*********") as string;
    let userIdentifications = new Array<Request.UserIdentification>();
    userIdentifications.push({
      identification: "",
      fileType: Appsettings.ComplianceFileType.ValidIdentification,
      url: "",
      fileName: "",
      identificationNumber: "",
    });
    userIdentifications.push({
      identification: "",
      fileType: Appsettings.ComplianceFileType.UtilityBill,
      url: "",
      fileName: "",
      identificationNumber: "",
    });
    state.userIdentification = userIdentifications;
    state.loading = false;
    return state;
  }

  static OnNextButton(state: State.ComplianceState) {
    if (
      state.tabName === Appsettings.ComplianceTabName.Document &&
      state.isPreview === true
    ) {
      state = validateDocument(state);
      if (!state.isError) {
        state.complianceTab = state.tabName;
        state.tabNumber = state.tabActiveStatus - 1;
        return state;
      } else {
        state.isPreview = false;
        return state;
      }
    } else {
      if (
        state.merchant.merchantCategory ===
        Appsettings.MerchantCategory.Individual1 || state.merchant.merchantCategory ===
        Appsettings.MerchantCategory.Individual2
      ) {
        state = {
          ...state,
          govtIdentification: new Array<Request.GovernmentIdentification>(),
          businessIdentification: {},
        };
        state.showIndividualMerchantCategory = true;
      }
      if (state.merchant.businessType === "Starter Business") {
        state = {
          ...state,
          govtIdentification: new Array<Request.GovernmentIdentification>(),
          userIdentification: new Array<Request.UserIdentification>(),
        };
      } else if (
        state.merchant.merchantCategory ===
        Appsettings.MerchantCategory.Government
      ) {
        state = {
          ...state,
          userIdentification: new Array<Request.UserIdentification>(),
        };
      } else if (state.merchant.businessType === "Registered Business") {
        state = {
          ...state,
          govtIdentification: new Array<Request.GovernmentIdentification>(),
          userIdentification: new Array<Request.UserIdentification>(),
        };
      }
      state.complianceTab = state.tabName;
      state.tabNumber = state.tabActiveStatus - 1;
    }

    return state;
  }
  static SetRequest(state: State.ComplianceState) {
    let request: Request.MerchantAccountRequest =
      new Request.MerchantAccountRequest();
    const merchant: Request.MerchantAccountRequest = state.merchant;
    merchant.registrationStatus = state.registrationStatus;
    merchant.tabActiveStatus = state.tabActiveStatus;
    merchant.tabNumber = state.tabNumber;
    merchant.isRegistrationCompleted = state.isCompletedProfile;
    request.merchantId = merchant.merchantId
      ? merchant.merchantId
      : merchant.id;
    request.businessName = merchant.businessName;
    request.businessType = merchant.businessType;
    request.businessNumber = merchant.businessNumber
      ? merchant.businessNumber
      : "";
    request.staffSize = merchant.staffSize ? merchant.staffSize : "";
    request.industry = merchant.industry ? merchant.industry : "";
    request.merchantCategory = merchant.merchantCategory
      ? merchant.merchantCategory
      : "";
    request.serviceCategory = merchant.serviceCategory
      ? merchant.serviceCategory
      : "";
    request.supportEmail = merchant.supportEmail ? merchant.supportEmail : "";
    request.disputeEmail = merchant.disputeEmail ? merchant.disputeEmail : "";
    request.businessAddress = merchant.businessAddress
      ? merchant.businessAddress
      : "";
    request.settlementAccountNumber = merchant.settlementAccountNumber
      ? merchant.settlementAccountNumber
      : "";
    request.accountName = merchant.accountName ? merchant.accountName : "";
    request.bankCode = merchant.bankCode ? merchant.bankCode : "";
    request.website = merchant.website ? merchant.website : "";
    request.twitterAccount = merchant.twitterAccount
      ? merchant.twitterAccount
      : "";
    request.facebookAccount = merchant.facebookAccount
      ? merchant.facebookAccount
      : "";
    request.instagramAccount = merchant.instagramAccount
      ? merchant.instagramAccount
      : "";
    request.productDescription = merchant.productDescription
      ? merchant.productDescription
      : "";
    request.bvn = merchant.bvn ? merchant.bvn : "";
    request.registrationStatus = state.registrationStatus;
    let newFiles: Request.KYCFilesDetails = new Request.KYCFilesDetails();
    newFiles.bvn = merchant.bvn ? merchant.bvn : "";
    newFiles.kycDocument = new Request.Files();
    newFiles.kycDocument = {
      businessIdentification:
        state.merchant.merchantCategory ===
          Appsettings.MerchantCategory.Business ||
        state.merchant.merchantCategory === "Registered"
          ? state.businessIdentification
          : null,
      userIdentification:
        state.merchant.merchantCategory ===
        Appsettings.MerchantCategory.Individual1 || state.merchant.merchantCategory ===
        Appsettings.MerchantCategory.Individual2
          ? state.userIdentification.filter((x) => x.url !== "")?.length > 0
            ? state.userIdentification.filter((x) => x.url !== "")
            : null
          : null,
      governmentIdentification:
        state.merchant.merchantCategory ===
        Appsettings.MerchantCategory.Government
          ? state.govtIdentification.filter(
              (x: Request.GovernmentIdentification) => x.url !== ""
            )?.length > 0
            ? state.govtIdentification
            : null
          : null,
    };
    request.newFiles = newFiles;
    request.isCompleted = state.isCompletedProfile;
    if (parseInt(sessionStorage.getItem("****") as string) > 0) {
      state.apiToCall = state.domain + apiConfig.Merchants.Update;
      request.businessEmail = merchant.businessEmail
        ? merchant.businessEmail
        : "";
      request.merchantId = parseInt(sessionStorage.getItem("****") as string);
      request.id = request.merchantId;
    } else {
      request.businessEmail = "";
      state.apiToCall = state.domain + apiConfig.Merchants.Profile;
    }
    state.request = request;
    return state;
  }

  static OnClickPreviousButton(state: State.ComplianceState) {
    switch (state.tabName) {
      case Appsettings.ComplianceTab.Profile:
        state.complianceTab = Appsettings.ComplianceTabName.Profile;
        return state;
      case Appsettings.ComplianceTab.Contact:
        state.complianceTab = Appsettings.ComplianceTabName.Contact;
        return state;
      case Appsettings.ComplianceTab.Account:
        state.complianceTab = Appsettings.ComplianceTabName.Account;
        return state;
      case Appsettings.ComplianceTab.SuccessAlert:
        state.complianceTab = Appsettings.ComplianceTabName.SuccessAlert;
        return state;
      default:
        state.complianceTab = Appsettings.ComplianceTabName.Document;
        return state;
    }
  }
  static SetBusinessIdentificationValidIDIdentification(
    state: State.ComplianceState
  ) {
    let businessIdentifications: Request.BusinessIdentification =
      state.businessIdentification as Request.BusinessIdentification;
    if (businessIdentifications.files) {
      let businessIdentificationIndex: number =
        businessIdentifications.files!.findIndex(
          (x) => x.fileType === state.fileCategory
        );
      let file = businessIdentifications.files![businessIdentificationIndex];
      if (file) {
        businessIdentifications.files![
          businessIdentificationIndex
        ].identificationNumber = state.identificationNumber;
      } else {
        businessIdentifications.files.push({
          url: "",
          identification: state.identification,
          identificationNumber: state.identificationNumber,
          fileType: state.fileCategory,
          fileName: "",
        });
      }
    } else {
      businessIdentifications.files =
        new Array<Request.BusinessIdentificationFiles>();
      businessIdentifications.files.push({
        url: "",
        identification: state.identification,
        identificationNumber: state.identificationNumber,
        fileType: state.fileCategory,
        fileName: "",
      });
    }
    state.businessIdentification = businessIdentifications;
    return state;
  }
  static SetGovenmentIdentification(state: State.ComplianceState) {
    let govtIdentifications: Array<Request.GovernmentIdentification> =
      state.govtIdentification;
    if (govtIdentifications) {
      let govtIdentificationIndex: number = govtIdentifications!.findIndex(
        (x) => x.fileType === state.fileCategory
      );
      let file = govtIdentifications![govtIdentificationIndex];
      if (file) {
        govtIdentifications![govtIdentificationIndex].identificationNumber =
          state.identificationNumber;
        govtIdentifications![govtIdentificationIndex].identification =
          state.identification;
      } else {
        govtIdentifications.push({
          url: "",
          identification: state.identification,
          identificationNumber: state.identificationNumber,
          fileType: state.fileCategory,
        });
      }
    } else {
      govtIdentifications = new Array<Request.GovernmentIdentification>();
      govtIdentifications.push({
        url: "",
        identification: state.identification,
        identificationNumber: state.identificationNumber,
        fileType: state.fileCategory,
      });
    }
    return state;
  }
  static SetTimeSince(date: any) {
    var seconds = Math.floor(((new Date() as any) - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " year(s) ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " month(s) ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " day(s) ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) > 15
      ? Math.floor(seconds) + " seconds ago"
      : " Just now";
  }
}
const setMerchantStatusDetails = (
  merchant: Request.MerchantAccountRequest
): Request.MerchantAccountRequest => {
  merchant.individualCategory = merchant.merchantCategory
  if (
    merchant.businessName &&
    merchant.staffSize &&
    merchant.businessType &&
    merchant.serviceCategory &&
    merchant.industry
  ) {
    merchant.isProfileCompleted = true;
  }
  if (
    merchant.businessEmail &&
    merchant.businessNumber &&
    merchant.businessAddress
  ) {
    merchant.isContactCompleted = true;
  }
  if (
    merchant.bankCode &&
    merchant.settlementAccountNumber &&
    merchant.accountName
  ) {
    merchant.isAccountCompleted = true;
  }
  return merchant;
};

const validateDocument = (
  state: State.ComplianceState
): State.ComplianceState => {
  if (state.merchant.merchantCategory === "Government") {
    const isValid =
      state.govtIdentification.filter(function (
        data: Request.UserIdentification
      ) {
        return data.url === "";
      }).length <= 0;
    if (!isValid) {
      state.isError = true;
      state.errorMessage =
        "One of the document is not uploaded. Please upload and try again.";
      Notification(state.errorMessage, !state.isError);
    } else {
      state.isError = false;
      state.errorMessage = "";
    }
  }
  if (state.merchant.merchantCategory === "Business") {
    if (
      state.merchant.businessType ===
        Appsettings.MerchantCategory.StarterBusiness &&
      state.businessIdentification?.files!?.length <= 1
    ) {
      state.isError = true;
      state.errorMessage =
        "One of the document is not uploaded. Please upload and try again.";
      Notification(state.errorMessage, !state.isError);
      return state;
    }
    const isValid =
      state.businessIdentification?.files!?.filter(function (
        data: Request.UserIdentification
      ) {
        return data.url === "";
      }).length <= 0;
    if (!isValid) {
      state.isError = true;
      state.errorMessage =
        "One of the document is not uploaded. Please upload and try again.";
      Notification(state.errorMessage, !state.isError);
      return state;
    } else {
      state.isError = false;
      state.errorMessage = "";
      return state;
    }
  }
  if (state.merchant.merchantCategory === "Individual") {
    const isValid =
      state.userIdentification.filter(function (
        data: Request.UserIdentification
      ) {
        return data.url === "";
      }).length <= 0;
    if (!isValid) {
      state.isError = true;
      state.errorMessage =
        "One of the document is not uploaded. Please upload and try again.";
      Notification(state.errorMessage, !state.isError);
      return state;
    } else {
      state.isError = false;
      state.errorMessage = "";
      return state;
    }
  }
  return state;
};
