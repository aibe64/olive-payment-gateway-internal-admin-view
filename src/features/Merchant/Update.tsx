import { OliveButton } from "@/components";
import { OliveField, OliveForm } from "@/components";
import { nigerianBanks } from "@/data";
import { APIResponse, State } from "@/models";
import { APIRequest } from "@/models/client/request";
import { endpoints } from "@/service";
import { useFormStore, useModalStore } from "@/store";
import { Switch } from "antd";
import { FC, useEffect } from "react";

export const UpdateMerchant: FC<{
  records?: APIResponse.MerchantDetails;
}> = ({ records }) => {
  const {
    setFormState,
    setPayload,
    payload,
    clearForm,
  }: State.Form<APIRequest.MerchantRequest> = useFormStore();
  const { set } = useModalStore();

  useEffect(() => {
    setFormState("payload", {
      ...records,
    });
  }, [records]);

  return (
    <OliveForm
      callApi
      apiConfig={{
        endpoint: endpoints.SetUp.UpdateMerchant,
        method: "POST",
        showToastAfterApiResponse: true,
        clearPayloadAfterApiSuccessResponse: true,
        reloadTable: true,
        callBack() {
          clearForm();
          set({ open: false, body: <></> });
        },
      }}
      className="px-2 gap-0 overflow-y-scroll h-[650px]"
    >
    <span className="font-inter-semibold text-danger">{records?.disapprovedComment}</span>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 ">
        <OliveField
          name="businessName"
          label="Business Name"
          placeholder="Enter first name"
          key={"1"}
          value={records?.businessName}
          readonly
        />
        <OliveField
          name="businessNumber"
          label="Business Number"
          placeholder="Enter phone"
          key={"2"}
          readonly
        />
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        <OliveField
          name="businessEmail"
          label="Business Email"
          key={"3"}
          readonly
        />
        <OliveField
          name="disputeEmail"
          label="ChargeBack Email"
          key={"4"}
          readonly
        />
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        <OliveField
          name="transactionLimit"
          label="Transaction Limit"
          key={"5"}
          readonly
          isAmountField
        />
        <OliveField
          name="bankCode"
          label="Bank"
          type="select"
          key={"6"}
          items={nigerianBanks}
          readonly
        />
      </div>
      <div className="grid grid-cols-1 max-md:grid-cols-1 gap-4">
        <OliveField
          name="serviceCategory"
          label="Service Category"
          key={"7"}
          readonly
        />
      </div>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        <OliveField
          name="businessType"
          label="Business Type"
          key={"8"}
          readonly
        />
        <OliveField
          name="accountName"
          label="Settlement Account Name"
          key={"9"}
          readonly
        />
      </div>
      <div className="flex justify-between mb-5">
        <div className="flex gap-1">
          <label htmlFor="status">Status</label>
          <Switch
            onChange={(checked) => setPayload("isActive", checked)}
            checked={payload?.isActive ?? false}
          />
        </div>

        <div className="flex gap-1">
          <label htmlFor="status">Enable Payment Page Customization</label>
          <Switch
            onChange={(checked) =>
              setPayload("isPaymentPageCustomizationEnabled", checked)
            }
            checked={payload?.isPaymentPageCustomizationEnabled ?? false}
          />
        </div>
      </div>
      
      <OliveButton.Submit title="Submit" />
    </OliveForm>
  );
};
