import { useAPI } from "@/hooks";
import { APIResponse } from "@/models";
import { endpoints } from "@/service";
import { useModalStore } from "@/store";
import { Button, Input, List, Select, Switch } from "antd";
import { FC, useCallback, useEffect, useState } from "react";

export const PaymentMethodCharges: FC<{
  record: APIResponse.MerchantDetails;
}> = ({ record }) => {
  const [response, setResponse] = useState<APIResponse.MerchantPaymentMethod>();
  const { data, fetching, callPostData, posting } =
    useAPI<APIResponse.MerchantPaymentMethod>({
      callGetApiOnRender: true,
      queryDataEndpoint: `${endpoints.SetUp.GetMerchantPaymentMethod}${record.id}`,
    });
  const { set } = useModalStore();

  const updateResponse = useCallback(
    (id: number, key: string, value: string | boolean | number) => {
      if (response) {
        let newResponse = { ...response };
        newResponse.paymentMethods = response.paymentMethods.map((item) =>
          item.paymentMethodId === id ? { ...item, [key]: value } : { ...item }
        );
        setResponse(newResponse);
      }
    },
    [response]
  );

  const handleOnSubmit = useCallback(() => {
    callPostData({
      url: `${endpoints.SetUp.UpdateMerchantPaymentMethod}${record.id}`,
      request: response,
      showToastAfterApiResponse: true,
      clearPayloadAfterApiSuccessResponse: true,
      callBackApiResponse: () =>
        set({
          open: false,
          title: undefined,
          body: undefined,
          width: undefined,
        }),
    });
  }, [record?.id, response, set]);

  useEffect(() => {
    if (data) {
      setResponse(data);
    }
  }, [data?.paymentMethods]);

  return (
    <div className="flex flex-col gap-3">
      <span className="text-lg font-inter-semibold">{record.businessName}</span>
      <div className="flex flex-col gap-1">
        <span>Transfer Charge to Customer</span>
        <Switch
          className="w-[3rem]"
          checked={response?.isChargeTransferredToCustomer}
          onChange={(value) =>
            setResponse((prev) =>
              prev
                ? { ...prev, isChargeTransferredToCustomer: value }
                : { isChargeTransferredToCustomer: value, paymentMethods: [] }
            )
          }
        />
      </div>
      <div className="">
        <List
          loading={fetching}
          header={
            <div className="grid grid-cols-[20%_20%_25%_20%_15%] gap-1">
              <span>Payment Method</span>
              <span>Charge</span>
              <span>Type</span>
              <span>Cap</span>
              <span>Status</span>
            </div>
          }
          dataSource={response?.paymentMethods ?? []}
          renderItem={(item) => (
            <List.Item>
              <div className="grid grid-cols-[20%_20%_25%_20%_15%] gap-1 w-full items-center">
                <span>{item.paymentType}</span>
                <Input
                  prefix={item.feeType === "Flat" && "₦"}
                  suffix={item.feeType === "Percentage" && "%"}
                  value={item.fee}
                  onChange={(e) => {
                    const value = e.target.value;
                    const isValid = /^(\d+(\.\d*)?|\.\d+)?$/.test(value);
                    if (isValid) {
                      updateResponse(item.paymentMethodId, "fee", value);
                    }
                  }}
                  className="w-[7rem] bg-[#F0F0F0]"
                />
                <Select
                  className="w-[9rem] !bg-[#F0F0F0]"
                  value={item.feeType}
                  onChange={(value) =>
                    updateResponse(item.paymentMethodId, "feeType", value)
                  }
                  options={[
                    { label: "Percentage (%)", value: "Percentage" },
                    { label: "Flat Fee (₦)", value: "Flat" },
                  ]}
                />
                <Input
                  prefix="₦"
                  value={item.chargeCap ?? "0.00"}
                  className="w-[7rem] bg-[#F0F0F0]"
                  onChange={(e) => {
                    const value = e.target.value;
                    const isValid = /^(\d+(\.\d*)?|\.\d+)?$/.test(value);
                    if (isValid) {
                      updateResponse(item.paymentMethodId, "chargeCap", value);
                    }
                  }}
                />
                <Switch
                  onChange={(value) =>
                    updateResponse(item.paymentMethodId, "isEnabled", value)
                  }
                  className="w-[2rem]"
                  checked={item.isEnabled}
                />
              </div>
            </List.Item>
          )}
        />
      </div>
      <div className="flex justify-end">
        <Button
          loading={posting}
          onClick={handleOnSubmit}
          className="bg-primary !text-white hover:!bg-primary"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};
