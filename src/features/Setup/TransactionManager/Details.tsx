import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { List, Tag } from "antd";
import { FC } from "react";

export const ManagerDetails: FC<{
  records?: APIResponse.MerchantDetails;
}> = ({ records }) => {
  const items = [
    {
      key: "Business Name",
      value: records?.businessName ?? "N/A",
    },
    {
      key: "Default Provider",
      value: records?.defaultProvider ?? "N/A",
    },
    {
      key: "Static Route Provider",
      value: records?.staticRouteProvider ?? "N/A",
    },
    {
      key: "BIN Enabled",
      value: records?.useBin ? (
        <Tag color={"green"}>Enabled</Tag>
      ) : (
        <Tag color={"red"}>Disabled</Tag>
      ),
    },
    {
      key: "Static Route Enabled",
      value: records?.useStaticRoute ? (
        <Tag color={"green"}>Enabled</Tag>
      ) : (
        <Tag color={"red"}>Disabled</Tag>
      ),
    },
    {
      key: "Default Route Enabled",
      value: records?.useDefault ? (
        <Tag color={"green"}>Enabled</Tag>
      ) : (
        <Tag color={"red"}>Disabled</Tag>
      ),
    },
    {
      key: "Date Updated",
      value: Format.toDateTime(
        records?.dateUpdated ?? new Date()?.toString()
      ).split("-")[0],
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
