import { APIResponse } from "@/models";
import { ColumnProps } from "antd/es/table";
import { OliveTableActions } from "@/components";
import { Format } from "@/lib";
import { SplitAccountGroupDetails } from "./Details";

export const SplitAccountColumn: ColumnProps<APIResponse.SplitAccountGroup>[] = [
  {
    title: "Group Name",
    width: "15%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return record.groupName ?? "N/A";
    },
  },
  {
    title: "Split Reference",
    width: "15%",
    key: "splitReference",
    ellipsis: true,
    render(_, record) {
      return record.splitReference ?? "N/A";
    },
  },
  {
    title: "Split Type",
    width: "15%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      return record.splitType ?? "N/A";
    },
  },
  {
    title: "Sub-Accounts",
    width: "15%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      return record.SplitAccounts?.length ?? 0;
    },
  },
  {
    title: "Date Created",
    dataIndex: "createdBy",
    width: "20%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      const dates = Format.toDateTime(record.dateCreated).split("-");
      return (
        <div className="flex flex-col items-flex-start w-full">
          <span>{dates[0]}</span>
          <span>{dates[1]}</span>
        </div>
      );
    },
  },
  {
    title: "Date Modified",
    dataIndex: "dateModified",
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
    key: "6",
    fixed: "right",
    width: "10%",
    title: "Action",
    render(_: any, record) {
      return (
        <div className="flex gap-2">
          <OliveTableActions
            record={record}
            pageName={"Split Payment"}
            actions={[{ title: "View", action: "View", modalWidth: 500 }]}
            components={{
              View: <SplitAccountGroupDetails record={record} />,
            }}
          />
        </div>
      );
    },
  },
];
