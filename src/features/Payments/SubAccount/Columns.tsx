import { APIResponse } from "@/models";
import { ColumnProps } from "antd/es/table";
import { OliveTableActions } from "@/components";
import { Format } from "@/lib";
import { SubAccountDetails } from "./Details";

export const SubAccountColumn: ColumnProps<APIResponse.SubAccount>[] = [
  {
    title: "Name",
    width: "25%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return record.subAccountName ?? "N/A";
    },
  },
  {
    title: "Bank Details",
    width: "20%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      return `${record?.accountNumber ?? "N/A"}(${record?.bankName ?? "N/A"})`;
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
            pageName={"Sub-Account"}
            actions={[
              { title: "View", action: "View", modalWidth: 450 },
            ]}
            components={{
              View: <SubAccountDetails record={record} />,
            }}
          />
        </div>
      );
    },
  },
];
