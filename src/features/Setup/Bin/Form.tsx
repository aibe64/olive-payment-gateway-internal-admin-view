import { OliveButton, OliveField, OliveForm } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse, State } from "@/models";
import { APIRequest } from "@/models";
import { endpoints } from "@/service";
import { useFormStore, useModalStore } from "@/store";
import { Divider, Switch } from "antd";
import { FC, useCallback, useEffect, useState } from "react";

export const UpdateBin: FC<{
  isCreate: boolean;
  records?: APIResponse.Bin;
}> = ({ isCreate, records }) => {
  const { callGetData, fetching, data } = useAPI<Array<{ brand: string }>>({});
  const {
    callGetData: callProvider,
    fetching: loadingProvider,
    data: providers,
  } = useAPI<Array<{ shortName: string }>>({});
  const [brandItem, setBrandItem] = useState<
    { label: string; value: string }[]
  >([]);
  const [providerItem, setProviderItem] = useState<
    { label: string; value: string }[]
  >([]);
  const { set } = useModalStore();
  const {
    setFormState,
    clearForm,
    setPayload,
    payload,
  }: State.Form<APIRequest.Bin> = useFormStore();

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
    if (records && !isCreate) {
      setFormState("payload", {
        name: records?.binName,
        ...records,
      });
    } else {
      clearForm();
    }
  }, [records, setFormState, isCreate, clearForm]);

  useEffect(() => {
    callGetData(endpoints.SetUp.GetAllBrands);
  }, []);

  useEffect(() => {
    callProvider(endpoints.SetUp.GetAllProviders);
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setBrandItem(
        data.map((item) => ({ label: item.brand, value: item.brand }))
      );
    }
  }, [data]);

  useEffect(() => {
    if (Array.isArray(providers)) {
      setProviderItem(
        providers.map((provider) => ({
          label: provider.shortName,
          value: provider.shortName,
        }))
      );
    }
  }, [providers]);

  return (
    <OliveForm<APIRequest.Bin>
      callApi
      extraValues={{
        id: !isCreate ? records?.id : undefined,
        isActive: payload?.isActive ? true : false,
      }}
      apiConfig={{
        endpoint: isCreate
          ? endpoints.SetUp.CreateBin
          : endpoints.SetUp.UpdateBin,
        showToastAfterApiResponse: true,
        method: "POST",
        reloadTable: true,
        callBack() {
          closeModal();
        },
      }}
      className="px-2 gap-0"
    >
      <OliveField
        name="binName"
        label="BIN"
        type="text"
        placeholder="Enter BIN"
        key={"1"}
        required={isCreate}
        validator={"bin"}
        maxLength={8}
        minLength={6}
      />
      <OliveField
        name="cardBrand"
        label="Card Brand"
        loading={fetching}
        key={"2"}
        type="select"
        items={brandItem}
        required={isCreate}
      />
      <OliveField
        name="provider"
        label="Provider"
        loading={loadingProvider}
        key={"9"}
        type="select"
        items={providerItem}
        required={isCreate}
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
          <label htmlFor="status">PIN Required</label>
          <Switch
            onChange={(checked) => setPayload("isPinRequired", checked)}
            checked={payload?.isPinRequired ?? false}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status">Others Required</label>
          <Switch
            onChange={(checked) => setPayload("isOthersRequired", checked)}
            checked={payload?.isOthersRequired ?? false}
          />
        </div>
      </div>
      <Divider />
      <OliveButton.Submit title={isCreate ? "Create BIN" : "Update BIN"} />
    </OliveForm>
  );
};
