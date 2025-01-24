import { XpressButton, XpressField, XpressForm } from "@/components";
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
  const [brandItem, setBrandItem] = useState<
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
    if (Array.isArray(data)) {
      setBrandItem(
        data.map((item) => ({ label: item.brand, value: item.brand }))
      );
    }
  }, [data]);

  return (
    <XpressForm<APIRequest.Bin>
      callApi
      extraValues={{
        id: !isCreate ? records?.id : undefined,
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
      <XpressField
        name="name"
        label="BIN Name"
        type="text"
        placeholder="Enter category name"
        key={"1"}
        required
      />
      <XpressField
        name="cardBrand"
        label="Card Brand"
        loading={fetching} 
        key={"2"}
        required
        type="select"
        items={brandItem}
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
          <label htmlFor="status">Pin Required</label>
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
      <XpressButton.Submit title={isCreate ? "Create Bin" : "Update Bin"} />
    </XpressForm>
  );
};
