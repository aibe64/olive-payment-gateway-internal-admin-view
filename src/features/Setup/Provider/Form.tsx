import { XpressButton, XpressField, XpressForm } from "@/components";
import { APIResponse, State } from "@/models";
import { APIRequest } from "@/models";
import { endpoints } from "@/service";
import { useFormStore, useModalStore } from "@/store";
import { Divider, Switch } from "antd";
import { FC, useCallback, useEffect } from "react";

export const UpdateProvider: FC<{
  isCreate: boolean;
  records?: APIResponse.Provider;
}> = ({ isCreate, records }) => {
  const { set } = useModalStore();
  const {
    setFormState,
    clearForm,
    setPayload,
    payload,
  }: State.Form<APIRequest.Provider> = useFormStore();

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

  return (
    <XpressForm<APIRequest.Provider>
      callApi
      extraValues={{
        id: !isCreate ? records?.id : undefined,
      }}
      apiConfig={{
        endpoint: isCreate
          ? endpoints.SetUp.CreateProvider
          : endpoints.SetUp.UpdateProvider,
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
        label="Provider Name"
        type="text"
        placeholder="Enter provider name"
        key={"1"}
        required={isCreate}
      />
      <XpressField
        name="shortName"
        label="Short Name"
        key={"2"}
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
      <div className="grid grid-cols-3 gap-3 gap-y-6 mb-5">
        <div className="flex gap-2">
          <label htmlFor="status">Transfer</label>
          <Switch
            onChange={(checked) => setPayload("bankTransfer", checked)}
            checked={payload?.bankTransfer ?? false}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status">Card</label>
          <Switch
            onChange={(checked) => setPayload("card", checked)}
            checked={payload?.card ?? false}
          />
        </div>{" "}
        <div className="flex gap-2">
          <label htmlFor="status">USSD</label>
          <Switch
            onChange={(checked) => setPayload("ussd", checked)}
            checked={payload?.ussd ?? false}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status"> Account</label>
          <Switch
            onChange={(checked) => setPayload("account", checked)}
            checked={payload?.account ?? false}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status">QR</label>
          <Switch
            onChange={(checked) => setPayload("qr", checked)}
            checked={payload?.qr ?? false}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status">Wallet</label>
          <Switch
            onChange={(checked) => setPayload("wallet", checked)}
            checked={payload?.wallet ?? false}
          />
        </div>
      </div>
      <Divider />
      <XpressButton.Submit
        title={isCreate ? "Create Provider" : "Update Provider"}
        disabled={false}
      />
    </XpressForm>
  );
};
