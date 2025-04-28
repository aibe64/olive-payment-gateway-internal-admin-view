import { XpressButton, XpressField, XpressForm } from "@/components";
import { AppConfig } from "@/config";
import { useAPI } from "@/hooks";
import { APIResponse, State } from "@/models";
import { APIRequest } from "@/models";
import { endpoints } from "@/service";
import { useFormStore, useModalStore } from "@/store";
import { Switch } from "antd";
import { FC, useCallback, useEffect, useState } from "react";

export const UpdateQrSubMerchant: FC<{
  isCreate: boolean;
  records?: APIResponse.QrSubMerchant;
}> = ({ isCreate, records }) => {
  const { callGetData, fetching, data } = useAPI<Array<APIResponse.QrMerchant>>(
    {}
  );
  const [merchantItem, setMerchantItem] = useState<
    { label: string; value: string }[]
  >([]);
  const { set } = useModalStore();
  const {
    clearForm,
    payload,
    setPayload,
  }: State.Form<APIRequest.QrSubMerchant> = useFormStore();

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
    callGetData(`${AppConfig.NQR_API_BASE_URL}${endpoints.QR.GetQrMerchant}`);
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setMerchantItem(
        data.map((merchant) => ({
          label: merchant.merchantName,
          value: merchant.merchantNum,
        }))
      );
    }
  }, [data]);

  return (
    <XpressForm<APIRequest.QrSubMerchant>
      callApi
      extraValues={{
        id: !isCreate ? records?.id : undefined,
        isHub: payload?.isHub ?? false,
      }}
      apiConfig={{
        endpoint: isCreate
          ? `${AppConfig.NQR_API_BASE_URL}${endpoints.QR.CreateSubMerchant}`
          : `${AppConfig.NQR_API_BASE_URL}${endpoints.QR.UpdateQrSubMerchant}`,
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
        label="Sub Merchant Name"
        type="text"
        placeholder="Enter BIN"
        key={"1"}
        required={isCreate}
      />
        <XpressField
        name="email"
        label="Email"
        validator="email"
        placeholder="Enter Email"
        key={"1"}
        required={isCreate}
      />
         <XpressField
        name="phoneNumber"
        label="Phone Number"
        type="tel"
        placeholder="Enter Phone Number"
        key={"1"}
        required={isCreate}
      />
      <XpressField
        name="merchantNumber"
        label="Merchant"
        loading={fetching}
        key={"2"}
        type="select"
        items={merchantItem}
        required={isCreate}
      />
      <XpressField
        name="channel"
        label="Channel"
        loading={fetching}
        key={"2"}
        type="select"
        items={[
          { label: "PG", value: 1 },
          { label: "POS", value: 2 },
        ]}
        required={isCreate}
      />
      {payload?.channel === 2 ? (
        <XpressField
          name="terminalId"
          label="Terminal ID"
          key="8"
          required={isCreate}
        />
      ) : (
        <></>
      )}
      <div className="flex flex-col gap-3 mb-3">
        <label htmlFor="status">Is Connected To Hub</label>
        <Switch
          className="w-[50px]"
          onChange={(checked) => setPayload("isHub", checked)}
          checked={payload?.isHub ?? false}
        />
      </div>
      {!payload?.isHub ? (
        <XpressField
          name="notificationUrl"
          label="Notification URL"
          key="13"
          required={isCreate}
          validator="url"
        />
      ) : (
        <></>
      )}
      <XpressButton.Submit
        title={isCreate ? "Create Sub Merchant" : "Update Sub Merchant"}
      />
    </XpressForm>
  );
};
