import { XpressButton, XpressField, XpressForm } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse, State } from "@/models";
import { APIRequest } from "@/models";
import { endpoints } from "@/service";
import { useFormStore, useModalStore } from "@/store";
import { Divider, Switch } from "antd";
import { FC, useCallback, useEffect, useState } from "react";

export const UpdateManager: FC<{
  records?: APIResponse.MerchantDetails;
}> = ({ records }) => {
  const { callGetData, fetching, data } = useAPI<Array<APIResponse.Provider>>(
    {isDataTable: false}
  );
  const [providerItem, setProviderItem] = useState<
    { label: string; value: string }[]
  >([]);
  const { set } = useModalStore();
  const {
    setFormState,
    clearForm,
    setPayload,
    payload,
  }: State.Form<APIRequest.TransactionManager> = useFormStore();

  const closeModal = useCallback(() => {
    set({
      open: false,
      showCloseButton: undefined,
      title: undefined,
      body: undefined,
      clearPayloadOnClose: true,
    });
    clearForm();
  }, [set]);

  useEffect(() => {
    if (records) {
      setFormState("payload", {
        ...records,
      });
    } else {
      clearForm();
    }
  }, [records, setFormState, clearForm]);

  useEffect(() => {
    callGetData(endpoints.SetUp.GetAllProviders);
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setProviderItem(
        data.map((item) => ({
          label: item.shortName ?? "",
          value: item.shortName ?? "",
        }))
      );
    }
  }, [data]);

  return (
    <XpressForm<APIRequest.TransactionManager>
      callApi
      extraValues={{ merchantId: records?.id ?? 0, isActive: true }}
      apiConfig={{
        endpoint: endpoints.SetUp.ManageCardTransaction,
        showToastAfterApiResponse: true,
        method: "POST",
        reloadTable: true,
        callBack() {
          closeModal();
        },
      }}
      className="px-2 gap-0"
    >
      <XpressField
        name="businessName"
        label="Merchant Name"
        type="text"
        key={"1"}
        readonly
      />
      <XpressField
        name="staticRouteProvider"
        label="Static Route Processor"
        loading={fetching}
        key={"2"}
        type="select"
        items={providerItem}
      />
      <XpressField
        name="defaultProvider"
        label="Default Processor"
        loading={fetching}
        key={"3"}
        type="select"
        items={providerItem}
      />
      <div className="flex gap-2">
        <label htmlFor="status">Status</label>
        <Switch
          onChange={(checked) => setPayload("isActive", checked)}
          checked={payload?.isActive ?? false}
        />
      </div>
      <Divider />
      <div className="grid grid-cols-2 gap-3 gap-y-6 mb-5">
        <div className="flex gap-2">
          <label htmlFor="status">Default Provider</label>
          <Switch
            onChange={(checked) => setPayload("useDefaultProvider", checked)}
            checked={payload?.useDefaultProvider ?? false}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status">Use Static Route</label>
          <Switch
            onChange={(checked) => setPayload("useStaticRoute", checked)}
            checked={payload?.useStaticRoute ?? false}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status">Use Bin</label>
          <Switch
            onChange={(checked) => setPayload("useBin", checked)}
            checked={payload?.useBin ?? false}
          />
        </div>
      </div>
      <Divider />
      <XpressButton.Submit title={"Update Transaction Manager"} />
    </XpressForm>
  );
};
