export interface ApiConfigModel {
  endpoint: string;
  method: "POST" | "PUT" | "DELETE" | "GET";
  callBack?: (response: any) => void;
  customPayload?: any;
  showToastAfterApiResponse?: boolean;
  clearPayloadAfterApiSuccessResponse?: boolean;
}
export interface ValidateFetchConfig {
  apiUrl: string;
  validateNetworkNumber?: boolean;
  queryValidationCriteria?: {
    isNewlyCreatedValue?: boolean;
    createdValue?: string;
  };
  removeValueSpaces?: boolean;
  network?: string;
  max?: number;
  min?: number;
  fieldKeysToUpdateFromAPIresponse?: Array<{
    apiResponseKey: string;
    fieldKey: string;
  }>;
}
export interface FormAction {
  request?: any;
  url: string;
  callBackApiResponse?: (apiResponse: any) => void;
  callBackAction?: () => void;
  callAPI?: boolean;
  customRequest?: any;
  showToastAfterApiResponse?: boolean;
  method?: "GET" | "POST";
  clearPayloadAfterApiSuccessResponse?: boolean;
  reloadTable?: boolean;
}

export interface ApiConfigModel {
  endpoint: string;
  method: "POST" | "PUT" | "DELETE" | "GET";
  callBack?: (response: any) => void;
  customPayload?: any;
  showToastAfterApiResponse?: boolean;
  clearPayloadAfterApiSuccessResponse?: boolean;
  reloadTable?: true;
}
export interface ValidateFetchConfig {
  apiUrl: string;
  validateNetworkNumber?: boolean;
  removeValueSpaces?: boolean
  network?: string;
  max?: number;
  min?: number;
  fieldKeysToUpdateFromAPIresponse?: Array<{
    apiResponseKey: string;
    fieldKey: string;
  }>;
}

export interface XpressModalConfig {
  open?: boolean;
  body?: JSX.Element;
  showCloseButton?: boolean;
  title?: string | JSX.Element;
  width?: number;
  closable?: boolean;
  clearPayloadOnClose?: boolean;
}
