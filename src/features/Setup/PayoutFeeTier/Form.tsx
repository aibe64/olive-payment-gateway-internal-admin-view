import { OliveButton, OliveField, OliveForm } from "@/components";
import { APIRequest, APIResponse, State } from "@/models";
import { endpoints } from "@/service";
import { useFormStore, useModalStore } from "@/store";
import { FC, useCallback, useEffect } from "react";

export const CreatePayoutFeeTier: FC<{
  merchantId?: number;
  records?: APIResponse.PayoutFeeTier;
}> = ({ merchantId, records }) => {
  const { set } = useModalStore();
  const {
    clearForm,
    payload,
    setFormState,
  }: State.Form<APIRequest.PayoutFeeTier> = useFormStore();

  const closeModal = useCallback(() => {
    set({
      open: false,
      showCloseButton: undefined,
      title: undefined,
      body: undefined,
      clearPayloadOnClose: true,
    });
    clearForm();
  }, [set, clearForm]);

  useEffect(() => {
    if (records?.id) {
      setFormState("payload", {
        id: records.id,
        merchantId: records.merchant_id ?? undefined,
        minAmount: records.min_amount,
        maxAmount: records.max_amount,
        fixedFee: records.fixed_fee,
      });
    } else if (merchantId) {
      setFormState("payload", { merchantId });
    } else {
      clearForm();
    }
  }, [records, merchantId, setFormState, clearForm]);

  return (
    <OliveForm<APIRequest.PayoutFeeTier>
      callApi
      extraValues={{
        id: records?.id,
        merchantId: Number(merchantId ?? payload?.merchantId ?? 0),
        minAmount: Number(
          payload?.minAmount?.toString().replace(/,/g, "") ?? 0
        ),
        maxAmount: Number(
          payload?.maxAmount?.toString().replace(/,/g, "") ?? 0
        ),
        fixedFee: Number(
          payload?.fixedFee?.toString().replace(/,/g, "") ?? 0
        ),
      }}
      apiConfig={{
        endpoint: endpoints.Admin.CreatePayoutFeeTier,
        showToastAfterApiResponse: true,
        method: "POST",
        reloadTable: true,
        callBack() {
          closeModal();
        },
      }}
      className="px-2 gap-0"
    >
      {/* <OliveField
        name="merchantId"
        label="Merchant ID"
        type="text"
        placeholder="Enter Merchant ID"
        key={"1"}
        required
        validator={"onlyNumber"}
        readonly={!!merchantId}
      /> */}
      <OliveField
        name="minAmount"
        label="Minimum Amount"
        type="text"
        placeholder="Enter Minimum Amount"
        key={"2"}
        required
        isAmountField
      />
      <OliveField
        name="maxAmount"
        label="Maximum Amount"
        type="text"
        placeholder="Enter Maximum Amount"
        key={"3"}
        required
        isAmountField
      />
      <OliveField
        name="fixedFee"
        label="Fixed Fee"
        type="text"
        placeholder="Enter Fixed Fee"
        key={"4"}
        required
        isAmountField
      />
      <OliveButton.Submit
        title={records?.id ? "Update Payout Fee Tier" : "Create Payout Fee Tier"}
      />
    </OliveForm>
  );
};
