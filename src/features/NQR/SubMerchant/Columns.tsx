import { OliveTableActions } from "@/components/Form";
import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { ColumnProps } from "antd/es/table";
import { QrSubMerchantDetails } from "./Details";
import { UpdateQrSubMerchant } from "./Form";

export const binColumn: ColumnProps<APIResponse.QrSubMerchant>[] = [
  {
    title: "Date Created",
    width: "20%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      const dates =
        record.createdAt && record.createdAt !== "0001-01-01T00:00:00"
          ? Format.toDateTime(record.createdAt).split("-")
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
    title: "Merchant Name",
    width: "25%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.merchantName}</span>
        </div>
      );
    },
  },
  {
    title: "Merchant Number",
    width: "25%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span >{record.merchantNum}</span>
        </div>
      );
    },
  },
  {
    title: "Channel",
    width: "25%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span >
            {record.channel === 1 ? "PG" : "POS"}
          </span>
        </div>
      );
    },
  },
  {
    title: "Institution Number",
    width: "25%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span >{record.institutionNumber}</span>
        </div>
      );
    },
  },
  {
    title: "ACTION",
    key: "7",
    fixed: "right",
    width: "80px",
    render(_: any, record: APIResponse.QrSubMerchant) {
      return (
        <OliveTableActions
          record={record}
          pageName={"NQR Sub Merchant"}
          actions={[
            { title: "View", action: "View", modalWidth: 500 },
            { title: "Edit", action: "Edit", modalWidth: 500 },
          ]}
          components={{
            Edit: <UpdateQrSubMerchant records={record} isCreate={false} />,
            View: <QrSubMerchantDetails records={record} />,
          }}
        />
      );
    },
  },
];
