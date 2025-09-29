import { XpressButton, XpressField, XpressForm } from "@/components";
import { paymentMethods } from "@/data";
import { APIResponse, State } from "@/models";
import { APIRequest } from "@/models";
import { endpoints } from "@/service";
import { useFormStore, useModalStore } from "@/store";
import { Switch } from "antd";
import { FC, useCallback, useEffect } from "react";

export const UpdatePaymentMethod: FC<{
  isCreate: boolean;
  records?: APIResponse.StorePaymentMethod;
}> = ({ isCreate, records }) => {
  const { set } = useModalStore();
  const {
    setFormState,
    clearForm,
    setPayload,
    payload,
  }: State.Form<APIRequest.StorePaymentMethod> = useFormStore();
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
        fee: Number(records?.fee ?? "0.00"),
      });
    } else {
      clearForm();
    }
  }, [records, setFormState, isCreate, clearForm]);

  return (
    <XpressForm<APIRequest.StorePaymentMethod>
      callApi
      extraValues={{
        id: !isCreate ? records?.id : undefined,
        fee: Number(payload?.fee ?? "0.00"),
        chargeCap: parseFloat(
          chargeCap ? chargeCap?.replace(/,/g, "") : "0.00"
        ),
      }}
      apiConfig={{
        endpoint: isCreate
          ? endpoints.SetUp.CreateStorePaymentMethod
          : endpoints.SetUp.UpdateStorePaymentMethod,
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
        name="paymentType"
        label="Payment Type"
        type="select"
        placeholder="Select payment type"
        items={paymentMethods}
        key={"1"}
        required={isCreate}
      />
      <XpressField
        name="description"
        label="Description"
        key={"2"}
        required={isCreate}
      />
      <XpressField
        name="feeType"
        label="Fee Type"
        type="select"
        items={[
          { label: "Percentage", value: "Percentage" },
          { label: "Flat", value: "Flat" },
        ]}
        key={"5"}
      />
      <XpressField
        name="fee"
        label="Fee"
        isAmountField={payload?.feeType === "Percentage" ? false : true}
        suffix={payload?.feeType === "Percentage" ? "%" : undefined}
        key={"3"}
      />
      {payload?.feeType === "Percentage" ? (
        <XpressField
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
          <label htmlFor="status">Status</label>
          <Switch
            onChange={(checked) => setPayload("isActive", checked)}
            checked={payload?.isActive ?? false}
          />
        </div>
      </div>

      <XpressButton.Submit
        title={isCreate ? "Create Payment Method" : "Update Payment Method"}
        disabled={false}
      />
    </XpressForm>
  );
};
