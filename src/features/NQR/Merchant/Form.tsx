import { OliveButton, OliveField, OliveForm } from "@/components";
import { nibssBanks } from "@/data";
import { APIResponse, State } from "@/models";
import { APIRequest } from "@/models";
import { endpoints } from "@/service";
import { useFormStore, useModalStore } from "@/store";
import { AppConfig } from "@/config";
import { Switch } from "antd";
import { FC, useCallback, useEffect } from "react";

export const UpdateMerchantQR: FC<{
  isCreate: boolean;
  records?: APIResponse.QrMerchant;
}> = ({ isCreate, records }) => {
  const { set } = useModalStore();
  const {
    setFormState,
    clearForm,
    setPayload,
    payload,
  }: State.Form<APIRequest.QrMerchant> = useFormStore();

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
        tin: records?.merchantTIN,
      });
    } else {
      clearForm();
    }
  }, [records, setFormState, isCreate, clearForm]);

  return (
    <OliveForm<APIRequest.QrMerchant>
      callApi
      extraValues={{
        id: !isCreate ? records?.id : undefined,
        merchantNum: !isCreate ? records?.merchantNum : undefined,
        phoneNumber: payload?.phoneNumber
          ? `+234${payload?.phoneNumber}`
          : undefined,
        isHub: payload?.isHub ?? false,
        bankName: nibssBanks.find((bank) => payload?.bankCode === bank.bankCode)
          ?.bankCode,
      }}
      apiConfig={{
        endpoint: isCreate
          ? `${AppConfig.NQR_API_BASE_URL}${endpoints.NQR.CreateMerchant}`
          : `${AppConfig.NQR_API_BASE_URL}${endpoints.NQR.UpdateQrMerchant}`,
        showToastAfterApiResponse: true,
        method: "POST",
        reloadTable: true,
        callBack() {
          closeModal();
        },
      }}
      className="px-2 gap-0"
    >
      <div className="gap-x-4 grid grid-cols-2">
        <OliveField
          name="merchantName"
          label="Merchant Name"
          readonly={!isCreate}
          key="1"
          required={isCreate}
        />
        <OliveField
          name="contact"
          label="Contact"
          readonly={!isCreate}
          key="3"
          required={isCreate}
        />
        <OliveField
          name="phoneNumber"
          label="Phone Number"
          readonly={!isCreate}
          key="4"
          type="tel"
          required={isCreate}
        />
        <OliveField
          name="email"
          type="email"
          readonly={!isCreate}
          label="Email"
          key="5"
          required={isCreate}
        />
        <OliveField
          name="address"
          label="Address"
          readonly={!isCreate}
          key="6"
          required={isCreate}
        />
        <OliveField name="tin" label="TIN" readonly={!isCreate} key="2" />
        <OliveField
          name="bankCode"
          label="Bank Name"
          key="7"
          items={nibssBanks?.map((bank) => ({
            label: bank.bankName,
            value: bank.bankCode,
          }))}
          type="select"
          required={isCreate}
        />
        <OliveField
          name="accountName"
          label="Account Name"
          key="8"
          required={isCreate}
        />
        <OliveField
          name="accountNumber"
          label="Account Number"
          validator="onlyNumber"
          maxLength={10}
          minLength={10}
          key="9"
          required={isCreate}
        />
        <OliveField
          name="transactionFeeBearer"
          label="Transaction Fee Bearer"
          key="10"
          required={!isCreate}
          type="select"
          items={[
            {
              label: "Merchant",
              value: 0,
            },
            { label: "Customer", value: 1 },
            { label: "Payer", value: 2 },
          ]}
        />
        <div className="flex flex-col gap-3 mb-3">
          <label htmlFor="status">Is Connected To Hub</label>
          <Switch
            className="w-[50px]"
            onChange={(checked) => setPayload("isHub", checked)}
            checked={payload?.isHub ?? false}
          />
        </div>
        {!payload?.isHub && (
          <OliveField
            name="notificationUrl"
            label="Notification URL"
            key="13"
            required={isCreate}
            validator="url"
          />
        )}
      </div>

      <OliveButton.Submit
        title={isCreate ? "Create QR Merchant" : "Update QR Merchant"}
      />
    </OliveForm>
  );
};
