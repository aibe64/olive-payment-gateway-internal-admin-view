import { XpressTable } from "@/components";
import { useAPI } from "@/hooks";
import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { endpoints } from "@/service";
import { Card } from "antd";
import { ColumnProps } from "antd/es/table";

const TopTransactions: React.FC = () => {
  const { data: transactions, fetching } =
    useAPI<APIResponse.TopTenTransaction>({
      callGetApiOnRender: true,
      queryDataEndpoint: endpoints.GetTopTen,
    });
  const topTenTransactions = new APIResponse.TableData(
    "transactions",
    transactions as APIResponse.TopTenTransaction
  );

  const dataSource = topTenTransactions.transactions?.transactionDTOS?.map(
    (x, i) => ({
      ...x,
      key: i + 1,
    })
  );

  const columns: ColumnProps<APIResponse.TransactionDtos>[] = [
    {
      dataIndex: "productName", // Must match the key in the TransactionDtos object
      title: "PRODUCT NAME",
      ellipsis: true,
    },
    {
      dataIndex: "amount",
      title: "AMOUNT",
      align: "right",
      render: (_, record: APIResponse.TransactionDtos) => {
        return `${Format.toNaira(record.amount?.toString() ?? "0.00")}`;
      },
      ellipsis: true,
    },
    {
      dataIndex: "billerName",
      title: "BILLER",
      align: "left",
      ellipsis: true,
    },
    {
      dataIndex: "billerStatusMessage",
      title: "STATUS",
      align: "left",
      ellipsis: true,
    },
    {
      dataIndex: "referenceNumber",
      title: "REFERENCE NO",
      align: "left",
      ellipsis: true,
    },
    {
      dataIndex: "transactionDate",
      title: "DATE",
      align: "left",
      render: (_, record: APIResponse.TransactionDtos) => {
        return Format.toDateTime(record.transactionDate);
      },
      ellipsis: true,
    },
  ];

  return (
    <Card title="Recent Transaction" className="mt-5">
      <XpressTable<APIResponse.TransactionDtos>
        columns={columns}
        dataSource={dataSource}
        spinning={fetching}
        emptyHeadingText="No transactions"
        emptyParagraphText="There are no transactions made yet."
      />
    </Card>
  );
};

export default TopTransactions;
