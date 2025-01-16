import { Notify } from "@/components";
import {
  FormAction,
  APIResponseCode,
  APIResponse,
  BaseQueryErrorResponse,
  AppState,
} from "@/models";
import { useGetDataOnClickMutation, usePostDataMutation } from "@/service";
import { useFormStore, usePageStore } from "@/store";
import { camelCaseToTitle } from "@/lib";
import { useCallback, useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface APIHook {
  callGetApiOnRender?: boolean;
  queryDataEndpoint?: string;
  paginateAPI?: boolean;
  isDataTable?: boolean;
}

export const useAPI = <T>({
  callGetApiOnRender,
  queryDataEndpoint,
  paginateAPI,
  isDataTable,
}: APIHook) => {
  const [postData, postDataResult] = usePostDataMutation();
  const [getData, getDataResult] = useGetDataOnClickMutation();
  const [callBack, setCallBack] = useState<
    ((apiResponse?: T) => void) | undefined
  >();
  const formState = useFormStore((state) => state);
  const { setState } = usePageStore<AppState>((state) => state);
  const [data, setData] = useState<T | undefined>();
  const [reloadTable, setReloadTable] = useState(isDataTable);

  const handleGetDataResponse = useCallback(
    (
      response?:
        | {
            data: any;
            error?: undefined;
          }
        | {
            data?: undefined;
            error: FetchBaseQueryError | SerializedError;
          },
      isDataTable?: boolean
    ) => {
      const result = response ?? getDataResult;
      if (result.data) {
        const response = result.data;
        if (
          formState.onSuccess &&
          response.responseCode === APIResponseCode.Success
        ) {
          formState.onSuccess(response.data);
        }
        setData(response.data);
        if (reloadTable || isDataTable) {
          setState("tableData", response.data);
          setState("originalTableData", response.data);
        }
        setCallBack(undefined);
        if (paginateAPI) setState("totalDataCount", response?.totalCount);
        formState.setIsProcessing(false);
      } else if (result.error) {
        setData([] as any);
        setState("totalDataCount", 0);
        setState("tableData", []);
        setState("originalTableData", []);
        formState.setIsProcessing(false);
        const error: BaseQueryErrorResponse =
        result.error as BaseQueryErrorResponse;
        if (formState.onError) {
          formState.onError(error?.data);
        } else if (!callGetApiOnRender) {
          Notify(
            error?.data?.responseMessage ??
              "Sorry, an error occurred from the server while fetching details",
            false
          );
        }
      }
    },
    [
      getDataResult.data,
      getDataResult.error,
      setCallBack,
      formState.setIsProcessing,
      formState.onSuccess,
      formState.onError,
      callGetApiOnRender,
      paginateAPI,
      reloadTable,
      setState,
      setData,
    ]
  );

  const fetchData = useCallback(
    async <T>(
      endpoint: string,
      headers: Headers,
      onSuccess?: (apiResponse?: T) => void,
      onError?: (apiResponse?: APIResponse.API<null>) => void
    ) => {
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers,
        });
        if (response.ok) {
          const result = await response.json();
          if (result?.data) {
            setData(result?.data);
            if (onSuccess) onSuccess(result?.data);
          }
        } else if (response.status === 401) {
          window.location.href = "/";
        } else {
          const result = await response.json();
          if (onError) onError(result);
        }
      } catch {
        if (onError)
          Notify(
            "Error occurred on the server. Please try again later.",
            false
          );
      }
    },
    []
  );

  const callGetData = useCallback(
    async <T, H = any>(
      endpoint: string,
      onSuccess?: (apiResponse?: APIResponse.API<T>) => void,
      onError?: (apiResponse?: APIResponse.API<null>) => void,
      headers?: H,
      isDataTable?: boolean
    ) => {
      formState.setIsProcessing(true);
      formState.setFormState("onSuccess", onSuccess);
      formState.setFormState("onError", onError);
      const response = await getData({ url: endpoint, headers });
      handleGetDataResponse(response, isDataTable);
    },
    [
      getData,
      formState.setIsProcessing,
      formState.setFormState,
      formState.setFormState
    ]
  );

  const callPostData = useCallback(
    async (action: FormAction) => {
      const {
        request,
        url,
        customRequest,
        callBackApiResponse,
        showToastAfterApiResponse,
        clearPayloadAfterApiSuccessResponse,
        reloadTable,
      } = action;
      formState.setFormState("isProcessing", true);
      const response = await postData({
        url: url ?? "",
        request: customRequest ?? request,
      });
      const clear =
        clearPayloadAfterApiSuccessResponse ??
        formState.clearPayloadAfterApiSuccessResponse;
      formState.setAllFormState({
        ...formState,
        isProcessing: false,
        payload: clear ? {} : formState.payload,
        customPayload: undefined,
        clearPayloadAfterApiSuccessResponse: false,
      });
      if (
        response.data &&
        response.data?.responseCode === APIResponseCode.Success
      ) {
        if (showToastAfterApiResponse)
          Notify(response.data?.responseMessage, true);
        if (reloadTable && formState.getUrl) {
          setReloadTable(true);
          if (formState.getUrl?.includes("?")) {
            const url = `${
              formState.getUrl?.split("?")[0]
            }?pageNumber=${1}&pageSize=${10}`;
            getData({ url });
          } else {
            getData({ url: formState.getUrl });
          }
        }
        if (callBackApiResponse) callBackApiResponse(response.data?.data);
      } else if (response.error) {
        const error: any = response?.error;
        if (error?.status && error.status === 400) {
          generateBadRequestErrorMessage(error);
        } else if (error.status !== 401) {
          Notify(
            "Sorry, Error occurred from the server while posting details",
            false
          );
        }
      } else if (
        response.data &&
        response.data?.responseCode !== APIResponseCode.Success
      ) {
        Notify(response.data?.responseMessage, false);
      }
    },
    [
      formState,
      postData,
      formState.setFormState,
      formState.setAllFormState,
      getData,
      formState.getUrl,
    ]
  );

  const generateBadRequestErrorMessage = (error: any) => {
    if (error?.data?.responseMessage) {
      Notify(error?.data?.responseMessage, false);
    } else {
      const apiError: APIResponse.Error = error?.data;
      const errorFields: string[] = Object.keys(apiError.errors);
      let message = `${camelCaseToTitle(errorFields[0])} is required`;
      Notify(message.replace("$.", ""), false);
    }
  };

  const fetchGetApiOnRender = useCallback(() => {
    if (callGetApiOnRender && queryDataEndpoint && !data) {
      formState.setFormState("onSuccess", undefined);
      formState.setFormState("onError", undefined);
      let url = queryDataEndpoint;
      if (paginateAPI)
        url = `${queryDataEndpoint}pageNumber=${1}&pageSize=${10}`;
      if (isDataTable) formState.setFormState("getUrl", url);
      getData({ url });
    }
  }, [
    callGetApiOnRender,
    queryDataEndpoint,
    getData,
    data,
    paginateAPI,
    formState.setFormState,
    isDataTable,
  ]);

  useEffect(() => {
    handleGetDataResponse();
  }, [handleGetDataResponse]);

  useEffect(() => {
    fetchGetApiOnRender();
  }, [fetchGetApiOnRender]);

  return {
    postData,
    posting: postDataResult.isLoading,
    postDataResponseData: postDataResult?.data?.data,
    fetching: getDataResult.isLoading,
    callPostData,
    callGetData,
    callBack,
    fetchData,
    data,
  };
};
