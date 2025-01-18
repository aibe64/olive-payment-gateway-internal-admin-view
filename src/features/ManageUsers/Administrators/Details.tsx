import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { List, Tag } from "antd";
import { FC } from "react";

export const BinDetails: FC<{
  records?: APIResponse.Bin;
}> = ({ records }) => {
  const items = [
    {
      key: "Bin Name",
      value: records?.binName ?? "N/A",
    },
    {
      key: "Provider",
      value: records?.provider ?? "N/A",
    },
    {
      key: "Card",
      value: records?.isPinRequired ? (
        <Tag color={"green"}>Enabled</Tag>
      ) : (
        <Tag color={"red"}>Disabled</Tag>
      ),
    },
    {
      key: "Others Required",
      value: records?.isOthersRequired ? (
        <Tag color={"green"}>Enabled</Tag>
      ) : (
        <Tag color={"red"}>Disabled</Tag>
      ),
    },
    {
      key: "Card Brand",
      value: records?.cardBrand ?? "N/A",
    },
    {
      key: "Date Created",
      value: Format.toDateTime(
        records?.dateCreated ?? new Date()?.toString()
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
