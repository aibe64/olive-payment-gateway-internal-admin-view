import { OliveButton, OliveField, OliveForm } from "@/components";
import { APIRequest, APIResponse, State } from "@/models";
import { endpoints } from "@/service";
import { useFormStore } from "@/store";
import { FC, useEffect } from "react";

export const PayoutVatRateForm: FC<{
  records?: APIResponse.PayoutVatRate;
  onSaved: () => void;
}> = ({ records, onSaved }) => {
  const {
    setFormState,
    clearForm,
    payload,
  }: State.Form<APIRequest.PayoutVatRate> = useFormStore();

  useEffect(() => {
    if (records?.vatRate) {
      setFormState("payload", { vatRate: records.vatRate });
    } else {
      clearForm();
    }
  }, [records, setFormState, clearForm]);

  return (
    <OliveForm<APIRequest.PayoutVatRate>
      callApi
      extraValues={{
        vatRate: Number(
          Number(payload?.vatRate?.toString().replace(/,/g, "") ?? 0)/100
        ),
      }}
      apiConfig={{
        endpoint: endpoints.Admin.UpdatePayoutVatRate,
        showToastAfterApiResponse: true,
        method: "POST",
        callBack() {
          onSaved();
        },
      }}
      className="px-2 gap-0 max-w-sm"
    >
      <OliveField
        name="vatRate"
        label="VAT Rate"
        type="text"
        placeholder="Enter VAT Rate"
        suffix="%"
        key={"1"}
        required
      />
      <OliveButton.Submit
        title={records?.vatRate ? "Update VAT Rate" : "Create VAT Rate"}
      />
    </OliveForm>
  );
};
