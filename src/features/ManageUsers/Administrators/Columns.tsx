import { OliveTableActions } from "@/components/Form";
import { APIResponse } from "@/models";
import { Tag } from "antd";
import { ColumnProps } from "antd/es/table";
import { BinDetails } from "./Details";
import { UpdateUsers } from "./Form";

export const userColumn: ColumnProps<APIResponse.InternalUsers>[] = [
  {
    title: "Full Name",
    width: "25%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{`${record.firstName} ${record.lastName}`}</span>
        </div>
      );
    },
  },
  {
    title: "Email",
    width: "30%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.email}</span>
        </div>
      );
    },
  },
  {
    title: "Role Name",
    width: "15%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.roleName ?? "N/A"}</span>
        </div>
      );
    },
  },
  {
    title: "Status",
    width: "15%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div>
          {record.isActive ? (
            <Tag color={"green"}>Active</Tag>
          ) : (
            <Tag color={"red"}>Inactive</Tag>
          )}
        </div>
      );
    },
  },
  {
    title: "ACTION",
    key: "7",
    fixed: "right",
    width: "80px",
    render(_: any, record: APIResponse.InternalUsers) {
      return (
        <OliveTableActions
          record={record}
          pageName={"Administrator"}
          actions={[
            { title: "View", action: "View", modalWidth: 500 },
            { title: "Edit", action: "Edit", modalWidth: 500 },
          ]}
          components={{
            Edit: <UpdateUsers records={record} />,
            View: <BinDetails records={record} />,
          }}
        />
      );
    },
  },
];
