/* eslint-disable @typescript-eslint/no-use-before-define */
import { Request } from "../client/apiRequest";
import { Response } from "../client/apiResponse";
import { FormAttributeModel } from "./formAttributeModel";
import { State } from "./state";

export namespace Props {
  export class RegistrationProps {
    alert: AlertModel = new AlertModel("success", "");
    HandleSubmit(e: React.FormEvent<HTMLFormElement>) {}
    FetchConfig() {}
    setShow(show: boolean = false) {}
    executing?: boolean;
    validated?: boolean;
    isLoading?: boolean;
    noInternet?: boolean;
    disableField?: boolean;
    invalidUser?: boolean;
    userAccount?: Request.UserAccount;
    setChangeUserAccount(e: React.SetStateAction<Request.UserAccount>) {}
    CheckIsDeveloper(e: React.ChangeEvent<HTMLInputElement>) {}
    setFieldValue(number: string) {}
    GoBack() {}
  }

  export class ButtonLoaderProps {
    executing?: boolean;
    actionName?: string;
  }

  export class NotificationModalProps {
    open: boolean = false;
    handleClose() {}
  }

  export class AlertProps {
    alert?: AlertModel;
    setShow(
      show: boolean = false,
      isError: boolean = true,
      message: string = ""
    ) {
      this.alert = !isError
        ? new AlertModel("success", message)
        : new AlertModel("error", message);
      this.alert?.setShow(true);
    }
  }

  export class AlertModel {
    message?: string;
    type?: string;
    show: boolean = false;
    constructor(type: string, message: string, show: boolean = false) {
      this.message = message;
      this.type = type;
      this.show = show;
    }
    setShow(show: boolean = false) {
      this.show = show;
    }
  }

  export class ComplianceProps {
    onSubmitNextButton(
      e: React.FormEvent<HTMLFormElement>,
      tabName: string,
      isPreview: boolean = true,
      tabActiveStatus: number = 0
    ) {}
    onClickPreviousButton(tabName: string, isPreview: boolean) {}
    setMerchant(e: React.SetStateAction<Request.MerchantAccountRequest>) {}
    setFieldValue(number: string) {}
    complianceTab?: string;
    setComplianceTab(value: React.SetStateAction<string>) {}
    validated?: boolean;
    isPreview?: boolean;
    merchant?: Request.MerchantAccountRequest;
    banks?: Array<Response.Banks>;
    uploading?: boolean;
    showIndividualMerchantCategory?: boolean;
    accountResponse?: Response.SettlementAccountResponse;
    setShowIndividualMerchantCategory(e: React.SetStateAction<boolean>) {}
    SetBusinessIdentificationValidID(value: string, fileCategory: string) {}
    SetBusinessIdentificationValidIDIdentification(
      value: string,
      fileCategory: string
    ) {}
    UploadFile(
      files: File,
      fileTCategory: string,
      isBusinessFiles: boolean = false
    ) {}
    setUserIdentification(
      e: React.SetStateAction<Array<Request.UserIdentification>>
    ) {}
    setBusinessIdentification(
      e: React.SetStateAction<Request.BusinessIdentification>
    ) {}
    userIdentification?: Array<Request.UserIdentification>;
    businessIdentification?: Request.BusinessIdentification;
    governmentIdentification?: Array<Request.GovernmentIdentification>;
    SetDocumentComplianceTab() {}
    ValidateAccount(accountNumber: string, bankCode: string) {}
    isValidating?: boolean = false;
    ChangeDocumentCategory(
      value: string,
      fileCategory: string,
      isIDnumber: boolean = false
    ) {}
    SaveProfile(
      tabName: string,
      isCompleted: boolean = false,
      tabActiveStatus: number,
      registrationStatus: number,
      tabNumber: number
    ) {}
  }

  export class MerchantProfilePreview {
    merchant?: Request.MerchantAccountRequest;
    SaveProfile(
      tabName: string,
      isCompleted: boolean = false,
      tabActiveStatus: number,
      registrationStatus: number,
      tabNumber: number
    ) {}
    complianceTab?: string;
    setComplianceTab(value: React.SetStateAction<string>) {}
    setMerchant(e: React.SetStateAction<Request.MerchantAccountRequest>) {}
    userIdentification?: Array<Request.UserIdentification>;
    governmentIdentification?: Array<Request.GovernmentIdentification>;
    businessIdentification?: Request.BusinessIdentification;
    banks?: Array<Response.Banks>;
    onClickPreviousButton(tabName: string, isPreview: boolean) {}
  }

  export class TabProps {
    isPreview?: boolean;
    merchant?: Request.MerchantAccountRequest;
    tabName?: string;
    tabActiveStatus?: number;
  }

  export class TestKeyProps {
    privateKey?: string;
    publicKey?: string;
  }

  export interface MerchantKycTableProps {
    datatable?: any;
    approvedApprovalDatatable?: any;
    rejectedApprovalDatatable?: any;
    allApprovalDatatable?: any;
    activeButtons?: FormAttributeModel.ActiveApprovalButton;
  }

  export class DataTable {
    columns?: [];
    rows?: [];
    size?: number;
    loading?: boolean;
  }

  export class FilterButtonProps {
    Search(value: string) {}
    activeButtons?: FormAttributeModel.ActiveApprovalButton;
    ActivateButton(buttonCode: number) {}
    excelData?: ExcelData;
  }
  export class ExcelData {
    title?: string = "";
    buttonName: string = "Download"
    rows?: [];
    column?: [];
    fileName?: string = "";
  }

  export class SetupHeaders {
    Search(value: string) {}
    OpenCreateSetupMenuModal() {}
    showAddButton?: boolean;
    addButtonNmae?: string;
  }

  export class Header {
    Search(value: string) {}
    OpenCreateModal() {}
    excelData?: ExcelData;
    showCreateButton?: boolean;
  }

  export class ProviderModal {
    setModal(e: React.SetStateAction<boolean>) {}
    showModal?: boolean;
    banks?: Array<Response.Banks>;
    providerRequest?: Request.ProviderRequest;
    setProviderRequest(e: React.SetStateAction<Request.ProviderRequest>) {}
    CreateProvider() {}
    UpdateProvider() {}
    loading?: boolean;
    isEdit?: boolean;
    isError?: boolean;
    errorMessage?: string;
  }
  export class MerchantModal {
    setModal(e: React.SetStateAction<boolean>) {}
    showModal?: boolean;
    merchantRequest?: Request.RegisteredMerchantRequest;
    setMerchantRequest(
      e: React.SetStateAction<Request.RegisteredMerchantRequest>
    ) {}
    UpdateMerchant() {}
    ValidateAccountNumber() {}
    MapMerchant() {}
    loading?: boolean;
    processingMapping?: boolean;
    isError?: boolean;
    errorMessage?: string;
    transactionLimits?: Response.TransactionLimitResponse;
    validating?: boolean;
  }
  export class TransactionReprtModal {
    setModal(e: React.SetStateAction<boolean>) {}
    showModal?: boolean;
    transaction?: Response.TransactionReport;
  }
  export class MerchantApprovalModal {
    setModal(e: React.SetStateAction<boolean>) {}
    showModal?: boolean;
    merchantRequest?: Request.MerchantApproval;
    setMerchantRequest(e: React.SetStateAction<Request.MerchantApproval>) {}
    ApproveMerchant() {}
    DisapproveMerchant() {}
    loading?: boolean;
    loadingDisapproval?: boolean;
    isError?: boolean;
    errorMessage?: string;
  }
  export class InstitutionModal {
    setModal(e: React.SetStateAction<boolean>) {}
    showModal?: boolean;
    institutionRequest?: Request.BankRequest;
    setInstitutionRequest(e: React.SetStateAction<Request.BankRequest>) {}
    UpdateInstitution() {}
    loading?: boolean;
    isEdit?: boolean;
    isError?: boolean;
    errorMessage?: string;
  }
  export class MerchantUserModalProps {
    setModal(e: React.SetStateAction<boolean>) {}
    showModal?: boolean;
    userRequest?: Request.MerchantUserRequest;
    setUserRequest(e: React.SetStateAction<Request.MerchantUserRequest>) {}
    CreateUser() {}
    UpdateUser() {}
    loading?: boolean;
    isEdit?: boolean;
    isError?: boolean;
    errorMessage?: string;
    roles?: Array<Response.MerchantRoles>;
  }
  export class MerchantRoleResourcesModalProps {
    setModal(e: React.SetStateAction<boolean>) {}
    showModal?: boolean;
    roleResourcesRequest?: Request.RoleAndPermission;
    setRoleResourcesRequest(
      e: React.SetStateAction<Request.RoleAndPermission>
    ) {}
    CreateRoleResources() {}
    UpdateRoleResources() {}
    loading?: boolean;
    isEdit?: boolean;
    isError?: boolean;
    errorMessage?: string;
  }
  export class BinHeader {
    Search(value: string) {}
    OpenCreateBinModal() {}
  }

  export class BinModal {
    setModal(e: React.SetStateAction<boolean>) {}
    cardBrand?: Array<Response.CardBrandResponse>;
    showModal?: boolean;
    binRequest?: Request.BinRequest;
    providers?: Array<Response.ProviderResponse>;
    setBinRequest(e: React.SetStateAction<Request.BinRequest>) {}
    CreateBin() {}
    UpdateBin() {}
    loading?: boolean;
    isEdit?: boolean;
    isError?: boolean;
    show?: boolean;
    errorMessage?: string;
  }
  export class TransactionManageModal {
    setModal(e: React.SetStateAction<boolean>) {}
    cardBrand?: Array<Response.CardBrandResponse>;
    showModal?: boolean;
    tranManagerRequest?: Request.TransactionManagerRequest;
    providers?: Array<Response.ProviderResponse>;
    setTranManagerRequest(
      e: React.SetStateAction<Request.TransactionManagerRequest>
    ) {}
    UpdateTransactionManager() {}
    loading?: boolean;
  }
  export class TransactionLimitModal {
    setModal(e: React.SetStateAction<boolean>) {}
    showModal?: boolean;
    tranLimitRequest?: Request.TransactionLimitRequest;
    setTranLimitRequest(
      e: React.SetStateAction<Request.TransactionLimitRequest>
    ) {}
    UpdateTransactionLimit() {}
    CreateTransactionLimit() {}
    loading?: boolean;
    isCreate?: boolean;
  }
  export class TranManagerHeader {
    Search(value: string) {}
  }
  export class TranLimitHeader {
    showAddButton?: boolean;
    Search(value: string) {}
    OpenCreateModal() {}
  }

  export class MerchantDetails {
    merchant?: Response.MerchantDetails;
    merchantKycRequest?: Request.MerchantKYCRequest;
    setMerchantKycRequest(
      e: React.SetStateAction<Request.MerchantKYCRequest>
    ) {}
    CancelViewMerchantKYC() {}
    executingFileViewer?: boolean;
    ViewFile(
      fileId: number,
      uri: string,
      fileName: string,
      download: boolean
    ) {}
    DownloadAllDocuments() {}
    ApproveMerchantKYC() {}
    validated?: boolean;
    executing?: boolean;
    appoval?: FormAttributeModel.ActiveApprovalButton;
    transactionLimit?: Response.TransactionLimitResponse;
  }

  export class EditMerchantProps {
    merchant?: Response.MerchantDetails;
    showModal?: boolean;
    setModal(e: React.SetStateAction<boolean>) {}
  }

  export class ModalAlertProps {
    show?: boolean;
    hide?: boolean;
    message?: string;
    noOfApproveditem?: string;
    noOfDissapprovedItem?: string;
    isApproved?: boolean;
    isSuccess?: boolean = true;
    handleClose() {}
  }

  export class ActivateBusinessProps {
    isCompleteRegistration?: boolean;
  }

  export class LeftSideBarProps {
    pageTitle?: string;
    setPageTitle(e: React.SetStateAction<string>) {}
    menu?: Array<Response.Menu>;
    CollapseMenu() {}
    OpenMenu(menuName: string) {}
    menus?: Menus;
    page?: { key: string; subKey: string };
  }
  export class Menus {
    Payment?: string;
    Vas?: string;
    Commerce?: string;
    Transfers?: string;
    BusinessProfile?: string;
    Setup?: string;
    Users?: string;
    Home?: string;
  }

  export class FileViewerProps {
    fileByte?: string;
    fileSize?: string;
    fileName?: string;
    CancelFileViewer() {}
    fileExtension?: string;
  }
  export class ReportHeader {
    startDate?: string;
    endDate?: string;
    download() {}
    downloadMetaData?: ()=>{}
    onChangeDateRange(date: any, dateString: any) {}
    Search(value: string, filterType: string = "") {}
    merchants?: Array<Response.MerchantDetails>;
    disableMerchant?: boolean;
    excelData?: ExcelData;
    excelMetaData?: ExcelData;
    downloading?: boolean;
    isMerchant?:boolean;
  }

  export class CookiesProps {
    handleClose() {}
    handlePrivacy() {}
  }

  export class UnAuthorizedPageProps {
    claim?: string;
  }
  export class PGTheme {
    setModal(e: React.SetStateAction<boolean>) {}
  }

  export class PGThemeModalProps extends PGTheme {
    showModal?: boolean;
    loading?: boolean;
    isError?: boolean;
    errorMessage?: string;
    color?: string;
    setColor(e: React.SetStateAction<string>) {}
  }
  export class VideoTour {
    TakeATourVideo() {}
  }

  export interface UploadDiv {
    showButton?: boolean;
    size?: "large" | "small";
    uploadType: keyof State.UploadList;
  }

  export class CommercePageHeaderProps {
    pageName?: "product" | "payment";
  }
}
