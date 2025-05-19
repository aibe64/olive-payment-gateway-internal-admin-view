import { APIResponse } from "@/models";
import { List, Tag } from "antd";
import { FC } from "react";

export const ProviderDetails: FC<{
  records?: APIResponse.Provider;
}> = ({ records }) => {
  const items = [
    {
      key: "Provider Name",
      value: records?.name ?? "N/A",
    },
    {
      key: "Short Name",
      value: records?.shortName ?? "N/A",
    },
    {
      key: "Service URL",
      value: records?.serviceUrl ?? "N/A",
    },
    {
      key: "Card",
      value: records?.card ? (
        <Tag color={"green"}>Enabled</Tag>
      ) : (
        <Tag color={"red"}>Disabled</Tag>
      ),
    },
    {
        key: "Transfer",
        value: records?.bankTransfer ? (
          <Tag color={"green"}>Enabled</Tag>
        ) : (
          <Tag color={"red"}>Disabled</Tag>
        ),
      },
      {
        key: "Account",
        value: records?.account ? (
          <Tag color={"green"}>Enabled</Tag>
        ) : (
          <Tag color={"red"}>Disabled</Tag>
        ),
      },
      {
        key: "USSD",
        value: records?.ussd ? (
          <Tag color={"green"}>Enabled</Tag>
        ) : (
          <Tag color={"red"}>Disabled</Tag>
        ),
      },
      {
        key: "Wallet",
        value: records?.wallet ? (
          <Tag color={"green"}>Enabled</Tag>
        ) : (
          <Tag color={"red"}>Disabled</Tag>
        ),
      },
      {
        key: "QR",
        value: records?.qr ? (
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
