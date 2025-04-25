import { APIResponse } from "@/models";
import { List } from "antd";
import { FC } from "react";

export const QrSubMerchantDetails: FC<{
  records?: APIResponse.QrSubMerchant;
}> = ({ records }) => {
  const items = [
    {
      key: "Name",
      value: records?.merchantName ?? "N/A",
    },
    {
      key: "Merchant Number",
      value: records?.merchantNum ?? "N/A",
    },
    {
      key: "Institution Number",
      value: records?.institutionNumber ?? "N/A",
    },
    {
      key: "TIN Number",
      value: records?.merchantTIN ?? "N/A",
    },
    {
      key: "Channel",
      value: records?.channel === 1 ? "PG" : "POS",
    },
    {
      key: "Terminal ID",
      value: records?.terminalId ?? "N/A",
    },
  ];

  return (
    <div>
      <List
        size="large"
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <div className="flex justify-between w-full">
              <span>{item.key}</span>
              <span className="font-inter-semibold">{item.value}</span>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
