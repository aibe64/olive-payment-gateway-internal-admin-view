import { OliveButton, OliveField, OliveForm } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse, State } from "@/models";
import { APIRequest } from "@/models";
import { endpoints } from "@/service";
import { useFormStore, useModalStore } from "@/store";
import { Divider, Switch } from "antd";
import { FC, useCallback, useEffect, useState } from "react";

export const UpdateInstitution: FC<{
  records?: APIResponse.Banks;
}> = ({ records }) => {
  const { set } = useModalStore();
  const {
    setFormState,
    clearForm,
    setPayload,
    payload,
  }: State.Form<APIRequest.BankRequest> = useFormStore();
  const { callGetData, fetching, data } = useAPI<Array<APIResponse.Provider>>({
    isDataTable: false,
  });
  const [providerItem, setProviderItem] = useState<
    { label: string; value: string }[]
  >([]);

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

  useEffect(() => {
    if (records) {
      setFormState("payload", {
        ...records,
      });
    } else {
      clearForm();
    }
  }, [records, setFormState, clearForm]);

  return (
    <OliveForm<APIRequest.BankRequest>
      callApi
      apiConfig={{
        endpoint: endpoints.SetUp.UpdateBanks,
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
        name="bankName"
        label="Bank Name"
        type="text"
        key={"1"}
        readonly
      />
      <OliveField
        name="provider"
        label="Processor"
        loading={fetching}
        key={"3"}
        type="select"
        items={providerItem}
      />
      <Divider />
      <div className="grid grid-cols-2 gap-3 gap-y-6 mb-5">
        <div className="flex gap-2">
          <label htmlFor="status">Visible To Payment</label>
          <Switch
            onChange={(checked) =>
              setPayload("isVisibleToMerchantForPayment", checked)
            }
            checked={payload?.isVisibleToMerchantForPayment ?? false}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status"> Name Required</label>
          <Switch
            onChange={(checked) => setPayload("isNameRequired", checked)}
            checked={payload?.isNameRequired ?? false}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status"> Date of Birth Required</label>
          <Switch
            onChange={(checked) => setPayload("isDateOfBirthRequired", checked)}
            checked={payload?.isDateOfBirthRequired ?? false}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status"> BVN Required</label>
          <Switch
            onChange={(checked) => setPayload("isBvnRequired", checked)}
            checked={payload?.isBvnRequired ?? false}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status"> Phone Number Required</label>
          <Switch
            onChange={(checked) => setPayload("isPhoneNumberRequired", checked)}
            checked={payload?.isPhoneNumberRequired ?? false}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status"> PIN Required</label>
          <Switch
            onChange={(checked) => setPayload("isPinRequired", checked)}
            checked={payload?.isPinRequired ?? false}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status"> Narration Required</label>
          <Switch
            onChange={(checked) => setPayload("isNarrationRequired", checked)}
            checked={payload?.isNarrationRequired ?? false}
          />
        </div>
      </div>
      <Divider />
      <OliveButton.Submit title={"Update Institution"} />
    </OliveForm>
  );
};
