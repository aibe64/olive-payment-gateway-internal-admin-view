import {
  APIResponse,
  AppPermissions,
  AppStorageKeys,
  ROUTE_PATH,
} from "@/models";
import { endpoints } from "@/service";
import { AppStorage } from "@/store";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAPI } from "./useApi";

export const useAppPermission = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState<string>("");
  const userInfo = AppStorage.getItem<APIResponse.LoginInfo>(
    AppStorageKeys.UserInfo
  );
  const { data } = useAPI<Array<APIResponse.Roles>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.Account.GetRoleResources,
  });

  const handleAuthorization = useCallback(
    (userPermissions: (string | undefined)[]) => {
      switch (path) {
        case ROUTE_PATH.Bin:
          if (!userPermissions.includes(AppPermissions.ViewBin)) {
            navigate(ROUTE_PATH.UnAuthorize);
          }
          break;
        case ROUTE_PATH.Institution:
          if (!userPermissions.includes(AppPermissions.ViewInstitutions)) {
            navigate(ROUTE_PATH.UnAuthorize);
          }
          break;
        case ROUTE_PATH.Merchant:
          if (!userPermissions.includes(AppPermissions.ViewMerchant)) {
            navigate(ROUTE_PATH.UnAuthorize);
          }
          break;
        case ROUTE_PATH.MerchantApproval:
          if (!userPermissions.includes(AppPermissions.ViewMerchantApproval)) {
            navigate(ROUTE_PATH.UnAuthorize);
          }
          break;
        case ROUTE_PATH.Provider:
          if (!userPermissions.includes(AppPermissions.ViewProvider)) {
            navigate(ROUTE_PATH.UnAuthorize);
          }
          break;
        case ROUTE_PATH.Roles:
          if (!userPermissions.includes(AppPermissions.ViewAllRoles)) {
            navigate(ROUTE_PATH.UnAuthorize);
          }
          break;
        case ROUTE_PATH.Transaction:
          if (
            !userPermissions.includes(AppPermissions.ViewTransactionsReport)
          ) {
            navigate(ROUTE_PATH.UnAuthorize);
          }
          break;
        case ROUTE_PATH.TransactionManager:
          if (
            !userPermissions.includes(
              AppPermissions.ViewAllCardTransactionManager
            )
          ) {
            navigate(ROUTE_PATH.UnAuthorize);
          }
          break;
        case ROUTE_PATH.Users:
          if (!userPermissions.includes(AppPermissions.ViewAllUsers)) {
            navigate(ROUTE_PATH.UnAuthorize);
          }
          break;
        default:
          break;
      }
    },
    [path]
  );

  useEffect(() => {
    if (Array.isArray(data) && userInfo) {
      const userRole = data.find((role) => role.id === userInfo.roleId);
      if (userRole) {
        const userRoleResources = userRole.roleResources.map(
          (item) => item.name
        );
        handleAuthorization(userRoleResources);
      } else {
       // navigate(ROUTE_PATH.UnAuthorize);
      }
    }
  }, [path, userInfo?.roleId]);
  
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);
};
