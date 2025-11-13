import { APIResponse, APIResponseCode } from "@/models";
import { ColumnProps } from "antd/es/table";
import { OliveTableActions } from "@/components";
import { Format } from "@/lib";
import { Typography } from "antd";
import { TransactionSummary } from "./Summary";
import { TransactionReceipt } from "./TransactionReciept";
import { SplitAccountGroupCell } from "./SplitAccountGroupCell";
import { CopyOutlined } from "@ant-design/icons";

export const TransactionColumns: ColumnProps<APIResponse.SplitTransaction>[] = [
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
    title: "Date",
    dataIndex: "createdBy",
    width: "15%",
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
    title: "Split Details",
    width: "50%",
    key: "40",
    ellipsis: true,
    render: (_: any, record: APIResponse.SplitTransaction) => (
      <SplitAccountGroupCell transaction={record} />
    ),
  },
  // {
  //   title: "Deduct Fee From",
  //   dataIndex: "merchantName",
  //   width: "15%",
  //   key: "15",
  //   ellipsis: true,
  //   render(_, record) {
  //     return (
  //       <div>
  //         {record.SplitAccountGroup.deductFeeFrom ? (
  //           <span className="capitalize">
  //             {record.SplitAccountGroup.deductFeeFrom?.replace("_", " ")}
  //           </span>
  //         ) : (
  //           <span>N/A</span>
  //         )}
  //       </div>
  //     );
  //   },
  // },
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
