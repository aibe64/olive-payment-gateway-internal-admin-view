import { XpressTableActions } from "@/components/Form";
import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { Tag } from "antd";
import { ColumnProps } from "antd/es/table";
import { RoleDetails } from "./Details";
import { UpdateRoles } from "./Form";

export const roleColumn: ColumnProps<APIResponse.Roles>[] = [
  {
    title: "Date Created",
    width: "20%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      const dates =
        record.datecreated && record.datecreated !== "0001-01-01T00:00:00"
          ? Format.toDateTime(record.datecreated).split("-")
          : undefined;
      return (
        <div className="flex flex-col items-flex-start w-full">
          {dates?.length ? (
            <>
              {" "}
              <span>{dates[0]}</span>
              <span>{dates[1]}</span>
            </>
          ) : (
            <span>N/A</span>
          )}
        </div>
      );
    },
  },
  {
    title: "Role Name",
    width: "25%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.name}</span>
        </div>
      );
    },
  },
  {
    title: "No of Resources",
    width: "20%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.roleResources?.length ?? 0}</span>
        </div>
      );
    },
  },
  {
    title: "Date Modified",
    width: "20%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      const dates =
        record.dateModified && record.dateModified !== "0001-01-01T00:00:00"
          ? Format.toDateTime(record.dateModified).split("-")
          : undefined;
      return (
        <div className="flex flex-col items-flex-start w-full">
          {dates?.length ? (
            <>
              {" "}
              <span>{dates[0]}</span>
              <span>{dates[1]}</span>
            </>
          ) : (
            <span>N/A</span>
          )}
        </div>
      );
    },
  },
  {
    title: "Status",
    width: "10%",
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
    render(_: any, record: APIResponse.Roles) {
      return (
        <XpressTableActions
          record={record}
          pageName={"Provider"}
          actions={[
            { title: "View", action: "View", modalWidth: 500 },
            { title: "Edit", action: "Edit", modalWidth: 500 },
          ]}
          components={{
            Edit: <UpdateRoles records={record} isCreate={false} />,
            View: <RoleDetails records={record} />,
          }}
        />
      );
    },
  },
];
