import { APIResponse, APIResponseCode } from "@/models";
import { ColumnProps } from "antd/es/table";
import { XpressTableActions } from "@/components";
import { Format } from "@/lib";
import { Typography } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { TransactionSummary } from "./Summary";
import { TransactionReceipt } from "./TransactionReciept";
import { PaymentActivities } from "./PaymentActivities";

export const TransactionColumns: ColumnProps<APIResponse.Transaction>[] = [
  {
    title: "Customer Email",
    dataIndex: "email",
    width: "15%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return record.email ?? "N/A";
    },
  },
  {
    title: "Merchant Name",
    dataIndex: "merchantName",
    width: "15%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return record.merchantName ?? "N/A";
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: "15%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      return `${Format.toNaira(record?.amount?.toString() ?? "0.00")}`;
    },
  },
  {
    title: "Payment Method",
    width: "15%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return record.paymentType ?? "N/A";
    },
  },
  {
    title: "Reference",
    dataIndex: "reference",
    width: "20%",
    key: "4",
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
    title: "Card Brand",
    width: "12%",
    key: "4",
    ellipsis: true,
    render(_, record) {
      return (
       <div>{record.cardType ?? "N/A"}</div>
      );
    },
  },
  {
    title: "Date",
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
    title: "Status",
    width: "15%",
    key: "6",
    ellipsis: true,
    render(_, record: APIResponse.Transaction) {
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
          <XpressTableActions
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
              { title: "Payment log", action: "Custom", modalWidth: 500 },
            ]}
            components={{
              View: <TransactionSummary record={record} />,
              Custom: <PaymentActivities record={record} />,
              Download: <TransactionReceipt record={record} />,
            }}
          />
        </div>
      );
    },
  },
];
