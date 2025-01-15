import { Encryption } from "./encryption";
import { Response } from "../../models/client/apiResponse";
import apiUrl from "../../service/apiConfig";
import { GET } from "../../service/apiService";
export class PagePermission {

    static async IsUserPermitted(claim: string, rolesAndPermissions: Response.RoleResources[] | null = null) {
        let userInfo: Response.UserInfo | undefined = undefined
        if (sessionStorage.getItem("***")) {
            userInfo = JSON.parse(
                Encryption.decrypt(sessionStorage.getItem("***") as string)
            );
        } else {
            return false
        }

        let roleAndPermissions: Array<Response.RoleResources> = [];
        if (rolesAndPermissions !== null && userInfo) {
            const roleResources: Response.RoleResources = rolesAndPermissions.filter(function (data: Response.RoleResources) {
                return data.id === userInfo?.roleId
            })[0];
            sessionStorage.setItem('&&&', Encryption.encrypt(JSON.stringify(roleResources.roleResources?.$values)))
            if (roleResources.roleResources?.$values?.findIndex(x => x.claim === claim) as number > -1) {
                return true
            } else {
                return false
            }
        } else {
            const response = await GET(apiUrl.Account.GetRoleResources, false, userInfo?.token as string);
            if (response.success && userInfo) {
                roleAndPermissions = response.data?.$values;
                const roleResources: Response.RoleResources = roleAndPermissions.filter(function (data: Response.RoleResources) {
                    return data.id === userInfo?.roleId
                })[0];
                sessionStorage.setItem('&&&', Encryption.encrypt(JSON.stringify(roleResources.roleResources?.$values)))
                if (roleResources.roleResources?.$values?.findIndex(x => x.claim === claim) as number > -1) {
                    return true
                } else {
                    return false
                }
            }
        }

    }

    static IsUserActionPermitted(claim: string): boolean {
        if (sessionStorage.getItem('&&&')) {
            let roleResources: Array<Response.Permissions> = JSON.parse(Encryption.decrypt(sessionStorage.getItem('&&&') as string));
            roleResources = JSON.parse(roleResources as any)
            if (roleResources?.findIndex(x => x.claim === claim) as number > -1) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }

    }
}