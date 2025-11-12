import { OliveButton } from "@/components";
import { OliveField, OliveForm } from "@/components";
import { nigerianBanks } from "@/data";
import { useAPI } from "@/hooks";
// import { cleanDecimalInput } from "@/lib";
import { APIResponse, State } from "@/models";
import { APIRequest } from "@/models/client/request";
import { endpoints } from "@/service";
import { useFormStore, useModalStore } from "@/store";
import { Button, Divider, Input, Switch } from "antd";
import { FC, useCallback, useEffect } from "react";

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
  const { callPostData, posting } = useAPI({});

  const validateAccountNumber = useCallback(() => {
    if (
      records?.settlementAccountNumber &&
      records?.settlementAccountNumber?.length > 9
    ) {
      callPostData({
        url: endpoints.Users.ValidateSettlementAccount,
        showToastAfterApiResponse: true,
        request: {
          bankCode: records?.bankCode,
          accountNumber: records?.settlementAccountNumber,
        },
      });
    }
  }, []);

  // const onChangeTaxPercentage = useCallback(
  //   (value: string) => {
  //     value = cleanDecimalInput(value);
  //     if (/^\d+(\.\d+)?$/.test(value)) {
  //       const percentage = parseFloat(value);
  //       if (percentage <= 100) {
  //         setPayload("chargeValue", percentage?.toString());
  //       } else {
  //         setPayload("chargeValue", payload?.chargeValue ?? "");
  //       }
  //     } else {
  //       setPayload("chargeValue", value);
  //     }
  //   },
  //   [payload?.chargeValue, setPayload]
  // );

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
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        <OliveField
          name="serviceCategory"
          label="Service Category"
          key={"7"}
          readonly
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="settlementAccount">Settlement Account</label>
          <div className="flex">
            <Input
              value={records?.settlementAccountNumber ?? "N/A"}
              className="h-[45px] rounded-r-none"
              readOnly
            />
            <Button
              onClick={validateAccountNumber}
              loading={posting}
              className="rounded-l-none h-[43px]"
              type="primary"
            >
              Validate
            </Button>
          </div>
        </div>
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
          <label htmlFor="status">Show public Key on merchant dashboard</label>
          <Switch
            onChange={(checked) => setPayload("isKeysVisible", checked)}
            checked={payload?.isKeysVisible ?? false}
          />
        </div>
      </div>
      <div className="flex justify-between mb-5">
        <div className="flex gap-1">
          <label htmlFor="status">Enable International Payment</label>
          <Switch
            onChange={(checked) =>
              setPayload("receiveInternationalPayment", checked)
            }
            checked={payload?.receiveInternationalPayment ?? false}
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
      <Divider className="mb-4" />
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="access">Payment Page Access</label>
        <div className="grid grid-cols-4 gap-3 gap-y-6">
          <div className="flex gap-2">
            <label htmlFor="status">Transfer</label>
            <Switch
              onChange={(checked) => setPayload("bankTransferPayment", checked)}
              checked={payload?.bankTransferPayment ?? false}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="status">Card</label>
            <Switch
              onChange={(checked) => setPayload("cardPayment", checked)}
              checked={payload?.cardPayment ?? false}
            />
          </div>{" "}
          <div className="flex gap-2">
            <label htmlFor="status">USSD</label>
            <Switch
              onChange={(checked) => setPayload("ussdPayment", checked)}
              checked={payload?.ussdPayment ?? false}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="status"> Account</label>
            <Switch
              onChange={(checked) => setPayload("accountPayment", checked)}
              checked={payload?.accountPayment ?? false}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="status">eNaira</label>
            <Switch
              onChange={(checked) => setPayload("eNaira", checked)}
              checked={payload?.eNaira ?? false}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="status"> Wallet</label>
            <Switch
              onChange={(checked) => setPayload("walletPayment", checked)}
              checked={payload?.walletPayment ?? false}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="status"> Tokenization</label>
            <Switch
              onChange={(checked) => setPayload("tokenization", checked)}
              checked={payload?.tokenization ?? false}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="status"> QR Code</label>
            <Switch
              onChange={(checked) => setPayload("qrPayment", checked)}
              checked={payload?.qrPayment ?? false}
            />
          </div>
        </div>
      </div>
      {/* <Divider className="mb-3" />
      <div className="flex flex-col gap-3 mb-5">
        <span>Charges</span>
        <div className="flex gap-[4rem]">
          <Radio.Group
            onChange={(e) =>
              setPayload(
                "isChargeTransferedToCustomer",
                e.target.value === "Customer"
              )
            }
            className="flex gap-9"
            value={
              payload?.isChargeTransferedToCustomer ? "Customer" : "Merchant"
            }
          >
            <Radio value={"Merchant"}>Charge Merchant</Radio>
            <Radio value={"Customer"}>Charge Customer</Radio>
          </Radio.Group>
        </div>
        {payload?.isChargeTransferedToCustomer && (
          <div className="flex gap-9">
            <OliveField
              classNames="!w-[150px]"
              name="chargeType"
              label="Type"
              key={"13"}
              type="select"
              onSelectDropDownCallBack={() => setPayload("chargeValue", "0")}
              items={[
                { label: "Percentage", value: "percentage" },
                { label: "Fixed", value: "fixed" },
              ]}
            />
            {payload.chargeType === "fixed" ? (
              <OliveField
                name="chargeValue"
                label="Value"
                key={"14"}
                isAmountField
              />
            ) : (
              <OliveField
                name="chargeValue"
                label="Value"
                key={"14"}
                suffix={"%"}
                onChange={(value) => onChangeTaxPercentage(value)}
              />
            )}
            {payload.chargeType === "percentage" && (
              <OliveField
                name="chargeCap"
                label="Capped At"
                key={"14"}
                isAmountField
              />
            )}
          </div>
        )}
      </div> */}
      <OliveButton.Submit title="Submit" />
    </OliveForm>
  );
};
