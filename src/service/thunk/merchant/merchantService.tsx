import { GET, POST, PostUpload } from "../../apiService";
import { Response } from "../../../models/client/apiResponse";
import { Request } from "../../../models/client/apiRequest";
import apiConfig from "../../apiConfig";
import { ActionTypes } from "../../actions/types";
import { State } from "../../../models/application/state";
import store from "../../store";
import { Notification } from "../../../shared/components/notification";
import { Appsettings } from "../../../models/enums/appSettings";

export class MerchantThunkService {
  static async UpdateMerchant(dispatch: any, state: State.ComplianceState) {
    state.loading = true;
    state.isPreview = true;
    dispatch({
      type: ActionTypes.CompliancePage.Set_Compliance_Page_State,
      payload: state,
    });
    const response = await POST(state.apiToCall, state.request);
    if (response.success) {
      localStorage.setItem("****", "" + response.data.merchantId);
      if (state.isCompletedProfile === false) {
        state.successMessage = "Updated Successfully";
        state.complianceTab = setComplianceTabNextState(
          state.complianceTab as string
        );
        store.dispatch({
          type: ActionTypes.CompliancePage.Set_Compliance_Page_State,
          payload: { ...state, loading: false, isPreview: false },
        });

        Notification(
          state.disableFields
            ? "Your merchant details has ben updated successfully.  Your documents will also be reviewed , and feedback provided in 24hrs"
            : "Your merchant details are saved as DRAFT successfully",
          true
        );
      } else {
        state.successMessage = "Updated Successfully";
        state.complianceTab = setComplianceTabNextState(
          state.complianceTab as string
        );
        store.dispatch({
          type: ActionTypes.CompliancePage.Set_Compliance_Page_State,
          payload: { ...state, loading: false, isPreview: false },
        });
      }
    } else {
      state.isError = true;
      state.merchant.registrationStatus = state.registrationStatus - 1;
      store.dispatch({
        type: ActionTypes.CompliancePage.Set_Compliance_Page_State,
        payload: { ...state, loading: false },
      });
      Notification("Records not saved successfully. Please try again", false);
    }
  }
  static async UploadKYC(dispatch: any, state: State.ComplianceState) {
    const data: FormData = new FormData();
    let Files: File[] = [];
    Files.push({ ...(state.file as File) });
    data.append("files", state.file as File);
    const response = await PostUpload(
      state.domain + apiConfig.Merchants.UploadKYCDocument,
      data
    );
    if (response.success) {
      store.dispatch(MerchantThunkService.SetUploadKYCState as any);
    } else {
      store.dispatch(MerchantThunkService.SetUploadKYCErrorState as any);
    }
  }
  static async SetUploadKYCState(
    dispatch: any,
    response: Response.API,
    state: State.ComplianceState
  ) {
    state.fileStatus = "done";
    if (response?.data) {
      if (state.merchant.merchantCategory === "Business") {
        state = await uploadBusinessDocument(
          state.file as File,
          state.fileCategory as string,
          response.data?.$values![0].url,
          response.data?.$values![0].filename,
          state
        );
      } else if (state.merchant.merchantCategory === "Individual") {
        let userIdentifications: Request.UserIdentification[] =
          state.userIdentification;
        let userIdentificationIndex = userIdentifications!.findIndex(
          (x) => x.fileType === state.fileCategory
        );
        userIdentifications![userIdentificationIndex].url =
          response.data?.$values![0].url;
        userIdentifications![userIdentificationIndex].fileName =
          response.data?.$values![0].filename;
        state.userIdentification = userIdentifications;
      } else {
        let govtIdentifications: Request.GovernmentIdentification[] =
          state.govtIdentification;
        let govtIdentificationIndex = govtIdentifications!.findIndex(
          (x) => x.fileType === state.fileCategory
        );
        if (govtIdentificationIndex >= 0) {
          govtIdentifications![govtIdentificationIndex].url =
            response.data?.$values![0].url;
          govtIdentifications![govtIdentificationIndex].fileName =
            response.data?.$values![0].filename;
        } else {
          govtIdentifications.push({
            url: response.data?.$values![0].url,
            identification: state.fileCategory,
            identificationNumber: "",
            fileType: state.fileCategory,
            fileName: response.data?.$values![0].filename,
          });
        }
        state.govtIdentification = govtIdentifications;
      }
      if (response?.data?.$values) {
      }
    }
    dispatch({
      type: ActionTypes.CompliancePage.Set_Compliance_Page_State,
      payload: state,
    });
  }
  static SetUploadKYCErrorState(
    dispatch: any,
    response: Response.API,
    state: State.ComplianceState
  ) {
    state.fileStatus = "error";
    dispatch({
      type: ActionTypes.CompliancePage.Set_Compliance_Page_State,
      payload: state,
    });
  }
  static SetState = (dispatch: any, state: State.ComplianceState) => {
    dispatch({
      type: ActionTypes.CompliancePage.Set_Compliance_Page_State,
      payload: state,
    });
  };
  static LoadPage = (dispatch: any, state: State.ComplianceState) => {
    state = {
      ...state,
      loading: true,
    };
    dispatch({
      type: ActionTypes.CompliancePage.Set_Compliance_Page_State,
      payload: state,
    });
  };
  static GetNotification = async (state: State.Notification) => {
    const merchantId =
      localStorage.getItem("****") !== "null"
        ? localStorage.getItem("****")
        : 0;
    const response = await GET(
      apiConfig.Merchants.GetNotification + merchantId
    );
    if (response.success) {
      let data = [];
      if (response.data !== null && !Array.isArray(response.data)) {
        data.push(response.data);
      } else {
        data = response.data?.$values;
      }
      if (merchantId === 0) {
        data = data.filter((x: any) => x.pageKey === "AdminKYC");
      }
      data.forEach((element: any) => {
        element.isAdmin = merchantId === 0;
      });
      data.reverse();
      store.dispatch({
        type: ActionTypes.Merchants.Set_Notification,
        payload: {
          ...state,
          data,
        },
      });
    }
  };
  static UpdateNotification = async (state: State.Notification) => {
    const response = await POST(
      apiConfig.Merchants.UpdateNotification,
      state.request
    );
    let data = [];
    if (response.data !== null && !Array.isArray(response.data)) {
      data.push(response.data);
    } else {
      data = response.data;
    }
    if (response.success) {
      store.dispatch({
        type: ActionTypes.Merchants.Set_Notification,
        payload: {
          ...state,
          data,
        },
      });
    }
  };
  static ValidateReceipt = async (state: State.TransactionReceipt) => {
    const response = await GET(
      `${apiConfig.Merchants.ValidateReceipt}${state.transactionReference}`
    );
    if (response.data !== null) {
      let data = response.data;
      // data.metaData = [
      //   {
      //     Name: "Matric",
      //     Value: "FUO/16/sample",
      //   },
      //   { Name: "Fullname", Value: "Akinlabi Abdulkabeer" },
      //   { Name: "Department", Value: "Computer Science" },
      //   { Name: "Level", Value: "production" },
      //   { Name: "Phone", Value: "+2348035" },
      //   {
      //     Name: "Purpose",
      //     Value:
      //       "0=school+fee&1=Convocation+Fee%28Test%29&2=Portal+Access+Fee%28Test%29&3=Medical+test+for+Drugs%28Test%29&4=Studio+Fee%28Test%29&5=Matric+Gown%28Test%29&6=Examination+Fee%28Test%29&7=Parent+forum%28Test%29&8=Penalty+Fee%28Test%29&9=Bursary+Fee%28Test%29&10=Balogun+Payment",
      //   },
      // ];
      store.dispatch({
        type: ActionTypes.Merchants.Set_Receipt,
        payload: {
          ...state,
          response: data,
          processing: false,
          showError: false,
        },
      });
    } else {
      store.dispatch({
        type: ActionTypes.Merchants.Set_Receipt,
        payload: {
          ...state,
          response: undefined,
          processing: false,
          showError: true,
        },
      });
    }
  };
}

const setComplianceTabNextState = (tabname: string): string => {
  switch (tabname) {
    case Appsettings.ComplianceTabName.Profile:
      return Appsettings.ComplianceTabName.Document;
    case Appsettings.ComplianceTabName.Document:
      return Appsettings.ComplianceTabName.Contact;
    case Appsettings.ComplianceTabName.Contact:
      return Appsettings.ComplianceTabName.Account;
    case Appsettings.ComplianceTabName.Account:
      return Appsettings.ComplianceTabName.SuccessAlert;
    default:
      return tabname;
  }
};
const uploadBusinessDocument = (
  File: File,
  fileCategory: string,
  url: string,
  fileName: string,
  state: State.ComplianceState
): State.ComplianceState => {
  let businessIdentifications: Request.BusinessIdentification =
    state.businessIdentification as Request.BusinessIdentification;
  if (businessIdentifications.files) {
    let businessIdentificationIndex: number =
      businessIdentifications.files!.findIndex(
        (x) => x.fileType === fileCategory
      );
    let file = businessIdentifications.files![businessIdentificationIndex];
    if (file) {
      businessIdentifications.files![businessIdentificationIndex].url = url;
      businessIdentifications.files![businessIdentificationIndex].fileName =
        fileName;
    } else {
      businessIdentifications.files.push({
        url: url,
        identification: fileCategory,
        identificationNumber: "",
        fileType: fileCategory,
        fileName: fileName,
      });
    }
  } else {
    businessIdentifications.files =
      new Array<Request.BusinessIdentificationFiles>();
    businessIdentifications.files.push({
      url: url,
      identification: fileCategory,
      identificationNumber: "",
      fileType: fileCategory,
      fileName: fileName,
    });
  }
  state.businessIdentification = businessIdentifications;
  return state;
};
