import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { List, Tag } from "antd";
import { FC } from "react";

export const PaymentMethodDetails: FC<{
  records?: APIResponse.StorePaymentMethod;
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
      key: "Fee",
      value: Format.toNaira(String(records?.fee ?? "0.00")),
    },
    {
      key: "Status",
      value: records?.isActive ? (
        <Tag color={"green"}>Active</Tag>
      ) : (
        <Tag color={"red"}>Inactive</Tag>
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
