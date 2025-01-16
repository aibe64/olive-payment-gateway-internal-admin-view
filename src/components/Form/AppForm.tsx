import { useAPI } from "@/hooks";
import { Form } from "antd";
import { useCallback } from "react";
import { useAppForm } from "@/hooks";
import { Props } from "@/models";

export const XpressForm = <T,>({
  children,
  className,
  layout,
  callApi,
  onCallBack,
  apiConfig,
  extraValues,
  requiredMark = true,
}: Props.FormProp<T>) => {
  const { payload, form } = useAppForm();
  const { callPostData, callGetData } = useAPI({});

  const onSubmit = useCallback(() => {
    if (callApi) {
      if (onCallBack) onCallBack();
      if (apiConfig?.method === "GET") {
        callGetData(apiConfig.endpoint, apiConfig.callBack);
      } else {
        callPostData({
          request: { ...payload, ...extraValues },
          url: apiConfig?.endpoint as string,
          customRequest: apiConfig?.customPayload,
          callBackApiResponse: apiConfig?.callBack,
          showToastAfterApiResponse: apiConfig?.showToastAfterApiResponse,
          reloadTable: apiConfig?.reloadTable,
        });
      }
    } else if (onCallBack) onCallBack();
  }, [callApi, apiConfig, onCallBack, callGetData, callPostData]);

  return (
    <Form
      form={form}
      initialValues={apiConfig?.customPayload}
      fields={
        payload && typeof payload === "object" && !Array.isArray(payload)
          ? Object.entries(payload).map(([key, value]) => {
              return { name: key, value };
            })
          : []
      }
      layout={layout ?? "vertical"}
      className={className}
      onFinish={onSubmit}
      requiredMark={requiredMark}
    >
      {children}
    </Form>
  );
};
