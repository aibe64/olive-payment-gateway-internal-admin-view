import { APIResponse } from "@/models";
import { List, Tag } from "antd";
import { FC } from "react";

export const BinDetails: FC<{
  records?: APIResponse.InternalUsers;
}> = ({ records }) => {
  const items = [
    {
      key: "Full Name",
      value: `${records?.firstName} ${records?.lastName}`,
    },
    {
      key: "Email Address",
      value: records?.email ?? "N/A",
    },
    {
      key: "Role Name",
      value: records?.roleName ?? "N/A",
    },
    {
      key: "Is Active",
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
