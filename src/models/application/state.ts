import { FormInstance, TourStepProps } from "antd";
import { APIResponse } from "../client";
import { OliveModalConfig } from "./arguments";

export namespace State {
  export type Actions<T> = {
    setState: <K extends keyof T>(key: K, value: T[K]) => void;
    setAllState: (newState: T) => void;
  };

  export interface Modal {
    setModalState: <K extends keyof Modal>(key: K, value: Modal[K]) => void;
    setAllModalState: (newState: State.Modal) => void;
    open?: boolean;
    body?: JSX.Element;
    showCloseButton?: boolean;
    title?: string | JSX.Element;
    width?: number;
    closable?: boolean;
    clearPayloadOnClose?: boolean;
    set: ({}: OliveModalConfig) => void;
    toggle: () => void;
    styles: any
  }

  export interface PageState<T> {
    setState: <K extends keyof T>(key: K, value: T[K]) => void;
    setAllState: (newState: T) => void;
  }

  export interface Form<T = any> {
    setFormState: <K extends keyof State.Form>(
      key: K,
      value: State.Form[K]
    ) => void;
    setAllFormState: (newState: T) => void;
    clearForm: () => void;
    isProcessing?: boolean;
    form?: FormInstance<T>;
    payload?: T;
    endpoint?: string;
    getUrl?: string
    customPayload?: T;
    submitForm?: boolean;
    fieldKeysToUpdateFromAPIresponse?: any;
    validationStatusByFieldName?: Array<{
      fieldName: string;
      status: "" | "success" | "warning" | "error" | "validating" | undefined;
    }>;
    method?: "POST" | "PUT" | "DELETE" | "GET";
    showToastAfterApiResponse?: boolean;
    clearPayloadAfterApiSuccessResponse?: boolean;
    headers?: Headers;
    fields: Array<{ name: string; value: string }>;
    onSuccess?: (apiResponse?: APIResponse.API<any>) => void;
    onError?: (apiResponse?: APIResponse.API<null>) => void;
    setIsProcessing: (isProcessing?: boolean) => void;
    setPayload: <K extends keyof T>(key: T[K] | T[K][], value: T[K]) => void;
    callBackFunction?: (apiResponse?: any) => void;
    set: (
      payload: T,
      endpoint: string,
      method?: "POST" | "PUT" | "DELETE" | "GET",
      callBackFunction?: () => void
    ) => void;
  }

  export interface Layout extends State.Actions<Layout> {
    validatingToken?: boolean;
    showLogout?: boolean;
    isApproved?: boolean;
    pageName?: string;
    startTour?: boolean
    tours?: TourStepProps[] | undefined;
  }

  export interface UI extends Actions<State.UI> {
    modal: Modal;
    componentSteps?: number;
    billSteps?: number;
    px?: number;
    py?: number;
  }
}
