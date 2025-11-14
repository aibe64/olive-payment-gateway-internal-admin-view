import { APIResponse, APIResponseCode } from "@/models";
import { ColumnProps } from "antd/es/table";
import { OliveTableActions } from "@/components";
import { Format } from "@/lib";
import { Typography } from "antd";
import { TransactionSummary } from "./Summary";
import { TransactionReceipt } from "./TransactionReciept";
import { CopyOutlined } from "@ant-design/icons";

export const TransactionColumns: ColumnProps<APIResponse.SplitTransaction>[] = [
  {
    title: "Customer Email",
    dataIndex: "email",
    width: "15%",
    key: "email",
    ellipsis: true,
    render(_, record) {
      return record.email ?? "N/A";
    },
  },
  {
    title: "Merchant Name",
    dataIndex: "merchantName",
    width: "15%",
    key: "merchantName",
    ellipsis: true,
    render(_, record) {
      return record.merchantName ?? "N/A";
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: "15%",
    key: "amount",
    ellipsis: true,
    render(_, record) {
      return `${Format.toNaira(
        record?.amount?.toString() ?? "0.00",
        record?.currency
      )}`;
    },
  },
  {
    title: "Reference",
    dataIndex: "transactionReference",
    width: "20%",
    key: "transactionReference",
    ellipsis: true,
    render(_, record) {
      return (
        <Typography.Paragraph
          ellipsis
          copyable={{
            icon: [<CopyOutlined className="!text-primary" key="copy-icon" />],
          }}
        >
          {record.transactionReference}
        </Typography.Paragraph>
      );
    },
  },
  {
    title: "Transaction Date",
    dataIndex: "transactionDate",
    width: "15%",
    key: "transactionDate",
    ellipsis: true,
    render(_, record) {
      const dates = Format.toDateTime(record.transactionDate).split("-");
      return (
        <div className="flex flex-col items-flex-start w-full">
          <span>{dates[0]}</span>
          <span>{dates[1]}</span>
        </div>
      );
    },
  },
  {
    title: "Payer Name",
    dataIndex: "name",
    width: "15%",
    key: "name",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col items-flex-start w-full capitalize">
          <span>{record.name?.toLocaleLowerCase()}</span>
        </div>
      );
    },
  },
  {
    title: "Status",
    width: "12%",
    key: "6",
    ellipsis: true,
    render(_, record: APIResponse.SplitTransaction) {
      return (
        <div className="flex gap-1">
          {record.paymentResponseCode === APIResponseCode.Success ? (
            <Typography className="text-primary">Successful</Typography>
          ) : record.paymentResponseCode === APIResponseCode.Failed ? (
            <Typography className="text-danger">Failed</Typography>
          ) : (
            <Typography className="text-tertiary">Pending</Typography>
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
            pageName={"Transaction Summary"}
            actions={[
              { title: "View Receipt", action: "View", modalWidth: 500 },
              {
                title: "Download",
                action: "Download",
                modalWidth: 500,
                downloadName: "transaction_receipt",
              },
            ]}
            components={{
              View: <TransactionSummary record={record} />,
              Download: <TransactionReceipt record={record} />,
            }}
          />
        </div>
      );
    },
  },
];
