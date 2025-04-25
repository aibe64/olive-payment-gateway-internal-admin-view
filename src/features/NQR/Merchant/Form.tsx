import { XpressButton, XpressField, XpressForm } from "@/components";
import { nigerianBanks } from "@/data";
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
      });
    } else {
      clearForm();
    }
  }, [records, setFormState, isCreate, clearForm]);

  return (
    <XpressForm<APIRequest.QrMerchant>
      callApi
      extraValues={{
        id: !isCreate ? records?.id : undefined,
        merchantNum: !isCreate ? records?.merchantNum : undefined,
      }}
      apiConfig={{
        endpoint: isCreate
          ? `${AppConfig.NQR_API_BASE_URL}${endpoints.QR.CreateMerchant}`
          : `${AppConfig.NQR_API_BASE_URL}${endpoints.QR.UpdateQrMerchant}`,
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
        <XpressField
          name="merchantName"
          label="Merchant Name"
          key="1"
          required={isCreate}
        />
        <XpressField
          name="contact"
          label="Contact"
          key="3"
          required={isCreate}
        />
        <XpressField
          name="phoneNumber"
          label="Phone Number"
          key="4"
          type="tel"
          required={isCreate}
        />
        <XpressField
          name="email"
          type="email"
          label="Email"
          key="5"
          required={isCreate}
        />
        <XpressField
          name="address"
          label="Address"
          key="6"
          required={isCreate}
        />
        <XpressField
          name="tin"
          label="TIN"
          key="2"
          validator="onlyNumber"
        />
        <div className="flex flex-col">
          <XpressField
            name="bankCode"
            label="Institution Code"
            key="2"
            maxLength={6}
            minLength={6}
            validator="onlyNumber"
            required={isCreate}
          />
          <span className="text-[0.8rem] -mt-2 mb-3">
            This is the 6-digit institution code of the issuer bank E.g “012345”
            of the account number provided by the merchant.
          </span>
        </div>
        <XpressField
          name="bankName"
          label="Bank Name"
          key="7"
          items={nigerianBanks?.map((bank) => ({
            label: bank.label,
            value: bank.label,
          }))}
          type="select"
          required={isCreate}
        />
        <XpressField
          name="accountName"
          label="Account Name"
          key="8"
          required={isCreate}
        />
        <XpressField
          name="accountNumber"
          label="Account Number"
          validator="onlyNumber"
          maxLength={10}
          minLength={10}
          key="9"
          required={isCreate}
        />
        <XpressField
          name="transactionFeeBearer"
          label="Transaction Fee Bearer"
          key="10"
          required={isCreate}
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
          <XpressField
            name="notificationUrl"
            label="Notification URL"
            key="13"
            required={isCreate}
            validator="url"
          />
        )}
      </div>

      <XpressButton.Submit
        title={isCreate ? "Create QR Merchant" : "Update QR Merchant"}
      />
    </XpressForm>
  );
};
