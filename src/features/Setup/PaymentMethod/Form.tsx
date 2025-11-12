import { OliveButton, OliveField, OliveForm } from "@/components";
import { paymentMethods } from "@/data";
import { APIResponse, State } from "@/models";
import { APIRequest } from "@/models";
import { endpoints } from "@/service";
import { useFormStore, useModalStore } from "@/store";
import { Switch } from "antd";
import { FC, useCallback, useEffect } from "react";

export const UpdatePaymentMethod: FC<{
  isCreate: boolean;
  records?: APIResponse.PaymentMethod;
}> = ({ isCreate, records }) => {
  const { set } = useModalStore();
  const {
    setFormState,
    clearForm,
    setPayload,
    payload,
  }: State.Form<APIRequest.PaymentMethod> = useFormStore();
  const chargeCap = `${payload?.chargeCap}`;

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
        feeType: records?.feeType === "Percentage" ? "Percentage" : "Flat",
        paymentType: paymentMethods.find(
          (item) => item.label === records?.paymentType
        )?.value,
      });
    } else {
      clearForm();
    }
  }, [records, setFormState, isCreate, clearForm]);

  return (
    <OliveForm<APIRequest.PaymentMethod>
      callApi
      extraValues={{
        id: !isCreate ? records?.id : undefined,
        chargeCap: parseFloat(
          chargeCap ? chargeCap?.replace(/,/g, "") : "0.00"
        ),
      }}
      apiConfig={{
        endpoint: endpoints.SetUp.UpdatePaymentMethod,

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
        name="paymentType"
        label="Payment Type"
        type="select"
        placeholder="Select payment type"
        items={paymentMethods}
        key={"1"}
        required={isCreate}
      />
      <OliveField
        name="description"
        label="Description"
        key={"2"}
        required={isCreate}
      />
      <OliveField
        name="feeType"
        label="Fee Type"
        type="select"
        items={[
          { label: "Percentage", value: "Percentage" },
          { label: "Flat", value: "Flat" },
        ]}
        key={"5"}
      />
      <OliveField
        name="defaultCharge"
        label="Default Charge"
        isAmountField={payload?.feeType === "Percentage" ? false : true}
        suffix={payload?.feeType === "Percentage" ? "%" : undefined}
        key={"3"}
      />
      {payload?.feeType === "Percentage" ? (
        <OliveField
          name="chargeCap"
          label="Capped At"
          isAmountField
          key={"8"}
        />
      ) : (
        <></>
      )}
      <div className="flex justify-between gap-1 mb-3">
        <div className="flex gap-2">
          <label htmlFor="status">Enable Globally</label>
          <Switch
            onChange={(checked) => setPayload("isEnabledGlobal", checked)}
            checked={payload?.isEnabledGlobal ?? false}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status">Set As Default</label>
          <Switch
            onChange={(checked) => setPayload("isDefault", checked)}
            checked={payload?.isDefault ?? false}
          />
        </div>
      </div>

      <OliveButton.Submit
        title={isCreate ? "Create Payment Method" : "Update Payment Method"}
        disabled={false}
      />
    </OliveForm>
  );
};
