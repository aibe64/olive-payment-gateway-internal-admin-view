import { OliveTableActions } from "@/components";
import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { ColumnProps } from "antd/es/table";
import { AuditDetails } from "./Details";

export const auditTrailDataColumns: ColumnProps<APIResponse.AuditTrailItems>[] =
  [
    {
      title: "Date Profiled",
      width: "15%",
      key: "1",
      ellipsis: true,
      render(_, record) {
        return record.timestamp ? Format.toDateTime(record.timestamp) : "N/A";
      },
    },
    {
      title: "Action",
      key: "21",
      ellipsis: true,
      render(_, record) {
        return record.action ?? "N/A";
      },
    },
    {
      title: "Email",
      key: "21",
      ellipsis: true,
      render(_, record) {
        return record.userEmail ?? "N/A";
      },
    },
    {
      title: "ACTION",
      key: "7",
      fixed: "right",
      width: "100px",
      render(_: any, record: APIResponse.AuditTrailItems) {
        return (
          <OliveTableActions
            record={record}
            pageName={"Audit Trails"}
            actions={[{ title: "View", action: "View", modalWidth: 500 }]}
            components={{
              View: <AuditDetails audit={record} />,
            }}
          />
        );
      },
    },
  ];
