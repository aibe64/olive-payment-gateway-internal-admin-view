import { XpressTableActions } from "@/components/Form";
import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { ColumnProps } from "antd/es/table";
import { UpdateUser } from "./Update";
import { ViewUser } from "./View";

export const userDataColumns: ColumnProps<APIResponse.User>[] = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "1",
    ellipsis: true,
    render(_, record: APIResponse.User) {
      return `${record?.firstName} ${record?.lastName}`;
    },
  },

  {
    title: "ROLE",
    key: "2",
    ellipsis: true,
    render(_, record: APIResponse.User) {
      return record.roleName;
    },
  },
  {
    dataIndex: "createdBy",
    title: "CREATED BY",
    key: "2",
    ellipsis: true,
  },
  {
    title: "DATE CREATED",
    key: "3",
    ellipsis: true,
    render(_, record: APIResponse.User) {
      return Format.toDateTime(record.creationDate as string);
    },
  },
  {
    dataIndex: "lastModifiedBy",
    title: "UPDATED BY",
    key: "4",
    ellipsis: true,
  },
  {
    title: "UPDATED DATE",
    key: "5",
    ellipsis: true,
    render(_, record: APIResponse.User) {
      return Format.toDateTime(record.lastModifiedDate as string);
    },
  },
  {
    title: "ACTION",
    key: "7",
    fixed: "right",
    width: "100px",
    render(_: any, record: APIResponse.User) {
      return (
        <XpressTableActions
          record={record}
          pageName={"User"}
          actions={["View", "Edit", "Delete"]}
          components={{
            View: <ViewUser />,
            Edit: <UpdateUser records={record} />,
          }}
        />
      );
    },
  },
];
