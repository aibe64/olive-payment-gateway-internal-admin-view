import { OliveButton, OliveField, OliveForm } from "@/components";
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
    callGetData(`${AppConfig.NQR_API_BASE_URL}${endpoints.NQR.GetQrMerchant}`);
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
    <OliveForm<APIRequest.QrSubMerchant>
      callApi
      extraValues={{
        id: !isCreate ? records?.id : undefined,
        isHub: payload?.isHub ?? false,
        phonenumber: payload?.phonenumber
          ? `+234${payload?.phonenumber}`
          : undefined,
      }}
      apiConfig={{
        endpoint: isCreate
          ? `${AppConfig.NQR_API_BASE_URL}${endpoints.NQR.CreateSubMerchant}`
          : `${AppConfig.NQR_API_BASE_URL}${endpoints.NQR.UpdateQrSubMerchant}`,
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
        name="name"
        label="Sub Merchant Name"
        type="text"
        placeholder="Enter BIN"
        key={"1"}
        required={isCreate}
      />
      <OliveField
        name="email"
        label="Email"
        validator="email"
        placeholder="Enter Email"
        key={"1"}
        required={isCreate}
      />
      <OliveField
        name="phoneNumber"
        label="Phone Number"
        type="tel"
        placeholder="Enter Phone Number"
        key={"1"}
        required={isCreate}
      />
      <OliveField
        name="merchantNumber"
        label="Merchant"
        loading={fetching}
        key={"2"}
        type="select"
        items={merchantItem}
        required={isCreate}
      />
      <OliveField
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
        <OliveField
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
        <OliveField
          name="notificationUrl"
          label="Notification URL"
          key="13"
          required={isCreate}
          validator="url"
        />
      ) : (
        <></>
      )}
      <OliveButton.Submit
        title={isCreate ? "Create Sub Merchant" : "Update Sub Merchant"}
      />
    </OliveForm>
  );
};
