import apiConfig from "../../apiConfig";
import { GET } from "../../apiService";
import { Response } from "../../../models/client/apiResponse";
import { Request } from "../../../models/client/apiRequest";
import { ActionTypes } from "../../actions/types";
import store from "../../store";
import { State } from "../../../models/application/state";
const domain = sessionStorage.getItem("$$$") as string;
export namespace GeneralThunkService {
  export class MerchantDetailsService {
    static GetMerchantDetails = async (
      dispatch: any,
      state: Request.MerchantAccountRequest = new Request.MerchantAccountRequest()
    ) => {
      state.loading = true;
      state.isFirstTimeRegistration = true;
      dispatch({
        type: ActionTypes.Merchants.Merchant_By_ID,
        payload: { ...state, loading: true },
      });
      if (Number.isInteger(parseInt(localStorage.getItem("****") as string))) {
        const response: Response.API = await GET(
          domain +
            apiConfig.Merchants.MerchantByID +
            localStorage.getItem("****")
        );
        if (response.success) {
          const merchantDetails: Request.MerchantAccountRequest = response.data;
          state = merchantDetails;
          state.loading = false;
          state.isFirstTimeRegistration = false;
          dispatch({
            type: ActionTypes.Merchants.Merchant_By_ID,
            payload: state,
          });
        } else {
          state.loading = false;
          state.isFirstTimeRegistration = true;
          dispatch({
            type: ActionTypes.Merchants.Merchant_By_ID,
            payload: state,
          });
        }
      }
    };
    static UpdateFromThunkState = async (dispatch: any, state: {}) => {
      dispatch({ type: ActionTypes.Merchants.Merchant_By_ID, payload: state });
    };
    static FetchIndustries = async (
      dispatch: any,
      state: Array<Response.Industries> = new Array<Response.Industries>()
    ) => {
      const response = await GET(domain + apiConfig.Users.GetAllIndustries);
      if (response.success) {
        state = response.data.$values;
        dispatch({
          type: ActionTypes.Users.Get_All_Industries,
          payload: state,
        });
      } else {
        dispatch({
          type: ActionTypes.Users.Get_All_Industries,
          payload: state,
        });
      }
    };
    static FetchBanks = async (
      dispatch: any,
      state: Array<Response.Banks> = new Array<Response.Banks>()
    ) => {
      const response = await GET(domain + apiConfig.SetUp.GetAllBanks);
      if (response.success) {
        state = response.data.$values;
        dispatch({ type: ActionTypes.SetUp.Get_All_Banks, payload: state });
      } else {
        dispatch({
          type: ActionTypes.Users.Get_All_Industries,
          payload: state,
        });
      }
    };
    static FetchMerchantCategories = async (
      dispatch: any,
      state: Array<Response.MerchantCategories> = new Array<Response.MerchantCategories>()
    ) => {
      const response = await GET(domain + apiConfig.Users.GetAllCategories);
      if (response.success) {
        state = response.data.$values;
        dispatch({
          type: ActionTypes.Users.Get_All_Categories,
          payload: state,
        });
      } else {
        dispatch({
          type: ActionTypes.Users.Get_All_Categories,
          payload: state,
        });
      }
    };
  }
  export class PageService {
    static Loading(dispatch: any, state: State.PageUtility) {
      state.loading = true;
      dispatch({ type: ActionTypes.PageUtility.Page_Loading, payload: state });
    }
    static UnLoad(dispatch: any, state: State.PageUtility) {
      state.loading = false;
      dispatch({ type: ActionTypes.PageUtility.Page_Loading, payload: state });
    }
    static UploadList(
      dispatch: any,
      state: State.UploadList = new State.UploadList()
    ) {
      dispatch({
        type: ActionTypes.CompliancePage.Upload_List,
        payload: state,
      });
    }
  }
}
