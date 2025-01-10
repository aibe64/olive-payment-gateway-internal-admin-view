import apiConfig from "./apiConfig";
import { GET, POST } from "./apiService";
import { Response } from "../models/client/apiResponse";
import { ActionTypes } from "./actions/types";
export namespace ThunkService {
    export class AccountService {
        static GetAdminRoles = async (dispatch: any, state: Array<Response.MerchantRoles> =
            new Array<Response.MerchantRoles>()) => {
            const response = await GET(apiConfig.Account.GetAdminRoles)
            if (response.success) {
                return dispatch({ type: ActionTypes.Account.GET_ALL_ROLES, payload: response.data.$values });
            } else {
                return dispatch({ type: ActionTypes.Account.GET_ALL_ROLES, payload: state });
            }
        };
        static GetConfig = async (dispatch: any, state: {}) => {
            const url = window.location.origin + "/config.json"
            await fetch(url).then((response) => {
                response.json().then(async (settings) => {
                    sessionStorage.setItem("$$$", settings.ApiDomain);
                    sessionStorage.setItem("sso", settings.SSODomain);
                    state = settings;
                    dispatch({ type: ActionTypes.Settings.GET_ALL_SETTINGS, payload: state })
                });
            });
        }
        static GetRoleResources = async (dispatch: any, roleAndPermissions: Array<Response.RoleResources> = new Array<Response.MerchantRoles>()) => {
            const response = await GET(apiConfig.Account.GetRoleResources);
            if (response.success) {
                roleAndPermissions = response.data?.$values;
                return dispatch({ type: ActionTypes.Account.Get_Role_Resources, payload: roleAndPermissions });
            } else {
                return dispatch({ type: ActionTypes.Account.Get_Role_Resources, payload: roleAndPermissions });
            }
        };
        static GetPermissions = async (dispatch: any, permissions: Response.Permissions[] = new Array<Response.Permissions>()) => {
            const response = await GET(apiConfig.Account.GetPermissions);
            if (response.success) {
                permissions = response.data?.$values;
                return dispatch({ type: ActionTypes.Account.Get_Permissions, payload: permissions });
            } else {
                return dispatch({ type: ActionTypes.Account.Get_Permissions, payload: permissions });
            }
        };

        static CreateRoleResources = async (request: any) => {
            return async function CreateRoleResourcesThunk(dispatch: any, state: {} = {}) {
                const response = await POST(apiConfig.Account.CreateRoleResources, request);
                if (response.success) {
                    await AccountService.GetRoleResources(dispatch);
                    return dispatch({ type: ActionTypes.Account.Get_Permissions, payload: state });
                } else {
                    return dispatch({ type: ActionTypes.Account.Get_Permissions, payload: state });
                }
            }

        };
        static UpdateRoleResources = async (request: any) => {
            return async function UpdateRoleResourcesThunk(dispatch: any, state: {} = {}) {
                const response = await POST(apiConfig.Account.CreateRoleResources, request);
                if (response.success) {
                    await AccountService.GetRoleResources(dispatch);
                    return dispatch({ type: ActionTypes.Account.Get_Permissions, payload: state });
                } else {
                    return dispatch({ type: ActionTypes.Account.Get_Permissions, payload: state });
                }
            }
        };
    }


}






