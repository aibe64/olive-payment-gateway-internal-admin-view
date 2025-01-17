import { AppConfig } from "@/config";
import { AppStorageKeys } from "@/models";
import { AppStorage } from "@/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

type BaseQueryType = ReturnType<typeof fetchBaseQuery>;

export const baseQueryWithReauth: (baseQuery: BaseQueryType) => BaseQueryType =
  (baseQuery) => async (args: any, api: any, extraOptions: any) => {
    let result = (await baseQuery(args, api, extraOptions)) as any;
    if (result.error && result.error.status === 401) {
      window.location.href = "/";
      sessionStorage.clear();
    }
    return result;
  };

export const baseQuery = fetchBaseQuery({
  baseUrl: AppConfig.API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = AppStorage.getItem(AppStorageKeys.Token) as string; 
    headers.set("Authorization", `bearer ${token}`);
    return headers;
  },
});
