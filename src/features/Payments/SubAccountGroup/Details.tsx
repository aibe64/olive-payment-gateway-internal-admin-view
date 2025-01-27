import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { List } from "antd";
import { FC } from "react";

export const SubAccountGroupDetails: FC<{
  record?: APIResponse.SubAccountGroup;
}> = ({ record }) => {
  const data = [
    {
      key: "Group Name",
      value: <span>{record?.groupName ?? "N/A"}</span>,
    },
    {
      key: "Split Type",
      value: <span>{record?.splitType ?? "N/A"}</span>,
    },
    {
      key: "Deduct Fee From",
      value: <span>{record?.deductFeeFrom ?? "N/A"}</span>,
    },
    {
      key: "Sub-Accounts",
      value: (
        <div className="flex flex-col gap-1 w-full ml-[50px]">
          <div className="grid grid-cols-[50%_24%_24%] gap-1 ">
            {" "}
            <h1 className="font-inter-semibold">Name</h1>
            <h1 className="font-inter-semibold">%</h1>{" "}
            <h1 className="font-inter-semibold">Flat</h1>
          </div>
          {record?.subAccounts?.map((account) => (
            <div className="grid grid-cols-[50%_24%_24%] gap-1">
              <span>{account.subAccountName}</span>
              <span>
                {(account.percentage as number) > 0
                  ? account.percentage
                  : "N/A"}
              </span>
              <span>
                {(account.amount as number) > 0 ? account.amount : "N/A"}
              </span>
            </div>
          ))}
        </div>
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
