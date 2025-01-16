import { baseQuery, baseQueryWithReauth } from "./config";
import { createApi } from "@reduxjs/toolkit/query/react";

const globalApi = createApi({
  reducerPath: "global",
  baseQuery: baseQueryWithReauth(baseQuery),
  tagTypes: ["GetData"],
  endpoints(builder) {
    return {
      getData: builder.query({
        query: (url) => {
          return {
            url,
          };
        },
        providesTags: ["GetData"],
      }),
      getDataOnClick: builder.mutation({
        query: (request) => {
          return {
            url: request.url,
            method: "GET",
            headers: request?.headers,
          };
        },
      }),
      getSelectedValue: builder.query({
        query: (url) => {
          return {
            url,
          };
        },
      }),
      postData: builder.mutation({
        query: (data: {
          url: string;
          request?: string;
          id?: any;
          headers?: any;
        }) => {
          const { url, request, headers } = data;
          return {
            url,
            method: "POST",
            body: request,
            headers,
          };
        },
        invalidatesTags: (_result, _error, arg) => [
          { type: "GetData", id: arg.id },
        ],
      }),
    };
  },
});

export const {
  useGetDataQuery,
  useGetDataOnClickMutation,
  usePostDataMutation,
  useGetSelectedValueQuery,
  useLazyGetDataQuery,
} = globalApi;
export { globalApi };
