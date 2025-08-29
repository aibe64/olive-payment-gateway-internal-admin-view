import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { List, Tag } from "antd";
import { FC } from "react";

export const PaymentMethodDetails: FC<{
  records?: APIResponse.PaymentMethod;
}> = ({ records }) => {
  const items = [
    {
      key: "Payment Type",
      value: records?.paymentType ?? "N/A",
    },
    {
      key: "Description",
      value: records?.description ?? "N/A",
    },
    {
      key: "Fee Type",
      value: records?.feeType ?? "Flat",
    },
    {
      key: "Default Charge",
      value: Format.toNaira(String(records?.defaultCharge ?? "0.00")),
    },
    {
      key: "Charge Cap",
      value: Format.toNaira(String(records?.chargeCap ?? "0.00")),
    },
    {
      key: "Enable Globally",
      value: records?.isEnabledGlobal ? (
        <Tag color={"green"}>Enabled</Tag>
      ) : (
        <Tag color={"red"}>Disabled</Tag>
      ),
    },
    {
      key: "Is Default",
      value: records?.isDefault ? (
        <Tag color={"green"}>Enabled</Tag>
      ) : (
        <Tag color={"red"}>Disabled</Tag>
      ),
    },
  ];
  return (
    <div>
      <List
        size="large"
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <div className="flex justify-between w-full gap-2">
              <span>{item.key}</span>
              <span className="font-inter-semibold">{item.value}</span>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
