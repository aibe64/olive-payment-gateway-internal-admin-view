import { APIResponse, APIResponseCode } from "@/models";
import { ColumnProps } from "antd/es/table";
import { XpressTableActions } from "@/components";
import { Format } from "@/lib";
import { Typography } from "antd";
import { TransactionSummary } from "./Summary";
import { TransactionReceipt } from "./TransactionReciept";
import { CopyOutlined } from "@ant-design/icons";

export const TransactionColumns: ColumnProps<APIResponse.StoreTransaction>[] = [
  {
    title: "Store Name",
    dataIndex: "storeName",
    width: "15%",
    key: "4",
    ellipsis: true,
    render(_, record) {
      return record.storeName ?? "N/A";
    },
  },
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
    title: "Transaction ID",
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
          {record.transactionId}
        </Typography.Paragraph>
      );
    },
  },
  {
    title: "No of Product Purchased",
    width: "15%",
    key: "4",
    ellipsis: true,
    render(_, record) {
      return record?.productPurchased?.length ?? 0;
    },
  },
  {
    title: "Total Amount",
    dataIndex: "amount",
    width: "20%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      return `${Format.toNaira(record?.totalAmount?.toString() ?? "0.00")}`;
    },
  },
  {
    title: "Date",
    dataIndex: "createdBy",
    width: "20%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      const dates = Format.toDateTime(record.paymentDate).split("-");
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
    render(_, record: APIResponse.StoreTransaction) {
      return (
        <div className="flex gap-1">
          {record.status === APIResponseCode.Success ? (
            <Typography className="text-primary">Successful</Typography>
          ) : record.status === APIResponseCode.Failed ? (
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
            pageName={"Store Transaction"}
            actions={[
              { title: "Receipt", action: "View", modalWidth: 500 },
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
