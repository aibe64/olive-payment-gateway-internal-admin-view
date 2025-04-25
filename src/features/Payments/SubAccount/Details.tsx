import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { List } from "antd";
import { FC } from "react";

export const SubAccountDetails: FC<{ record?: APIResponse.SubAccount }> = ({
  record,
}) => {
  const data = [
    {
      key: "Sub-Account Name",
      value: <span>{record?.subAccountName ?? "N/A"}</span>,
    },
    {
      key: "Currency",
      value: <span>{record?.currency ?? "N/A"}</span>,
    },
    {
      key: "Sub-Account Email",
      value: <span>{record?.subAccountEmail ?? "N/A"}</span>,
    },
    {
      key: "Account Number",
      value: <span>{record?.accountNumber ?? "N/A"}</span>,
    },
    {
      key: "Account Name",
      value: <span>{record?.accountName ?? "N/A"}</span>,
    },
    {
      key: "Bank Name",
      value: <span>{record?.bankName ?? "N/A"}</span>,
    },
    {
      key: "Split",
      value: (
        <span>
          {record?.splitType === "percentage"
            ? `You - ${record.merchantSharePercentage}%, S -${record.subAccountShareOfPercentage}%`
            : `${Format.toNaira(record?.flatAmount?.toString() ?? "0.00")}(flat)`}
        </span>
      ),
    },
    {
      key: "Date Created",
      value: <span>{Format.toDateTime(record?.dateCreated as string)}</span>,
    },
  ];
  return (
    <List
      size="large"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <div className="flex justify-between w-full">
            <span>{item.key}</span>
            {item.value}
          </div>
        </List.Item>
      )}
    />
  );
};
