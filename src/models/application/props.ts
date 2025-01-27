import { FC, ReactNode } from "react";
import { FormInstance, Rule } from "antd/es/form/index";
import {
  ColumnGroupType,
  ColumnType,
  TableRowSelection,
} from "antd/es/table/interface";
import {
  ActionDetails,
  ApiConfigModel,
  ValidateFetchConfig,
} from "./arguments";
import { MenuProps } from "rc-menu";

export namespace Props {
  export interface LandingPageLayout {
    appName: string;
    appMotto: string;
    appDescription: string;
    appDescriptionImage: string;
    appLogo: string;
  }
  export interface MenuListProps {
    label: string;
    path?: string;
    icon?: FC<{
      color: string;
    }>;
    children?: MenuListProps[];
  }
  export interface TableData<T> {
    dataSource: T[];
    originalSource?: T[];
    columns: (ColumnGroupType<T> | ColumnType<T>)[];
    spinning?: boolean;
    hideSizeChanger?: boolean;
    total?: number;
    rowCount?: number;
    pageSize?: number;
    onPagination?: (page: number, size: number) => void;
    onRowSelection?: (_rowIndex: number, record: any) => void;
    shouldExpand?: boolean;
    actions?: ReactNode[];
    emptyDataTableDescriptionText?: string;
    scrollX?: number;
    isNotPaginated?: boolean;
    emptyParagraphText?: string;
    emptyHeadingText?: string | JSX.Element;
    rowSelection?: TableRowSelection<T>;
    page?: number;
  }

  export interface Filter {
    isPaginated?: boolean;
    filterTypes?: Array<"dateRange" | "status" | JSX.Element>;
    customSelectedValue?: JSX.Element;
    hideFilterField?: boolean;
    customFilter?: JSX.Element;
    onCallBackFilter?: () => void;
    statusOptions?: Array<{
      label: string;
      value: string | number | boolean | undefined;
    }>;
    statusKey?: string;
  }

  export interface Field {
    name: string;
    value?: any;
    required?: boolean;
    label?: string | ReactNode[];
    formClassNames?: string;
    labelClassNames?: string;
    fieldErrorMessage?: string;
    telHeight?: string;
    customFieldValidationRules?: Rule[];
    disabledDate?: any;
    defaultValue?: any;
    classNames?: string;
    addonBefore?: any;
    checkboxChildren?: string | JSX.Element;
    validator?:
      | "bvn"
      | "email"
      | "phone"
      | "onlyAphabet"
      | "onlyNumber"
      | "url"
      | "exist_on_db"
      | "bin"
      | "amountRange";
    validatorFetchConfig?: ValidateFetchConfig;
    showPasswordMeter?: boolean;
    type?:
      | "password"
      | "select"
      | "date"
      | "tel"
      | "search"
      | "number"
      | "dropdown"
      | "text"
      | "text-area"
      | "checkbox"
      | "email";

    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    items?: Array<{ label?: string; value?: any }>;
    isAmountField?: boolean;
    dropDownItems?: MenuProps["items"];
    onSelectDropDownCallBack?: (value: any) => void;
    onOpenDropDown?: () => void;
    validateStatus?: "" | "success" | "warning" | "error" | "validating";
    hasFeedback?: boolean;
    help?: string;
    loading?: boolean;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
    onSearch?: () => void | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    validate?: any;
    showCount?: boolean;
    searchText?: string;
    confirmPassword?: { passwordkey?: string };
    readonly?: boolean;
    defaultCountryFlag?: string;
    defaultCountryCode?: string;
    placeholder?: string;
    onChange?: (val: string) => void;
  }
  export interface Button {
    form?: FormInstance;
    title: string;
    htmlType?: "button" | "submit" | "reset" | "link" | undefined;
    block?: boolean;
    onClick?: () => void;
    loading?: boolean;
    classNames?: string;
    callApi?: boolean;
    disabled?: boolean;
    customApiConfigs?: {
      endpoint: string;
      method: "POST" | "GET";
      callBackFunction?: (apiResponse?: any) => void;
      customPayload: any;
    };
  }
  export interface SubmitButton extends Button {
    form?: FormInstance;
  }
  export interface FormProp<T> extends React.HTMLAttributes<T> {
    form?: FormInstance<T>;
    children?: JSX.Element[] | JSX.Element;
    classNames?: string;
    apiCallBackResponse?: () => void;
    customValues?: any;
    extraValues?: T;
    postUrl?: string;
    callFetch?: boolean;
    payloadRemovedKey?: string;
    layout?: "vertical" | "horizontal";
    onCallBack?: () => void;
    onFinish?: ((values: T) => void) | undefined;
    apiKeys?: Array<string>;
    callApi?: boolean;
    apiConfig?: ApiConfigModel;
    requiredMark?: boolean;
  }
  export interface TableAction<T> {
    record?: T;
    pageName: string;
    actions: Array<{
      title: string;
      action: TableActions;
      modalWidth?: number;
      downloadName?: string;
    }>;
    components?: {
      Edit?: JSX.Element;
      View?: JSX.Element;
      Download?: JSX.Element;
      Custom?: JSX.Element;
    };
    details?: Array<ActionDetails>;
  }
}
export type TableActions =
  | "View"
  | "Edit"
  | "Update"
  | "Approve"
  | "Disapprove"
  | "Delete"
  | "Activate"
  | "Others"
  | "Deactivate"
  | "Download"
  | "Custom"
  | "none"
  | "Status";
