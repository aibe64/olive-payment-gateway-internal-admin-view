import { APIResponse } from "@/models";
import { Divider, List } from "antd";
import { FC, useEffect, useState } from "react";

export const RoleDetails: FC<{
  records?: APIResponse.Roles;
}> = ({ records }) => {
  const [resources, setResources] = useState<{ key: string; value: string }[]>(
    []
  );
  const items = [
    {
      key: "Role Name",
      value: records?.name ?? "N/A",
    },
    {
      key: "Description",
      value: records?.description ?? "N/A",
    },
  ];

  useEffect(() => {
    if (records?.roleResources && Array.isArray(records?.roleResources)) {
      setResources(
        records.roleResources.map((item) => ({
          key: "Permission Name",
          value: item.name ?? "N/A",
        }))
      );
    }
  }, [records?.roleResources]);

  return (
    <div className="flex flex-col">
      <List
        size="small"
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
      <Divider />
      <span className="font-inter-medium text-[1.1rem]">Role Resources</span>
      <List
        size="large"
        dataSource={resources}
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
