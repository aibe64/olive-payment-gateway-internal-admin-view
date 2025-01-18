import { XpressTable } from "@/components";
import { PageTitle } from "@/components";
import { APIResponse, AppState } from "@/models";
import { TransactionFilter } from "./Filter";
import { useTransactionFilters } from "@/hooks";
import { usePageStore } from "@/store";
import { TransactionColumns } from "./Columns";

const Transactions = () => {
  const { loading, loadingTransaction, onPaginate, hasDataOnRender } =
    useTransactionFilters();
  const { transactionData, transactionPageNumber } = usePageStore<AppState>(
    (state) => state
  );
  const tableData: any = transactionData?.transactions?.items ?? [];

  return (
    <div className="space-y-4">
      <PageTitle
        totalDataCount={transactionData?.transactions?.totalCount ?? 0}
        title="Transactions"
      />
      {hasDataOnRender ? <TransactionFilter /> : ""}
      <XpressTable<APIResponse.Transaction>
        emptyHeadingText={
          <h3>
            No have transaction found.{" "}
            <span className="text-[#FF6D00]">Please filter again.</span>
          </h3>
        }
        emptyParagraphText="Create a payment link or send invoices to your customers, to let them pay you."
        emptyDataTableDescriptionText=""
        dataSource={tableData}
        originalSource={hasDataOnRender ? [] : undefined}
        columns={TransactionColumns}
        spinning={loading || loadingTransaction}
        total={transactionData?.transactions?.totalCount ?? 0}
        rowCount={transactionData?.transactions?.totalCount}
        page={transactionPageNumber}
        onPagination={onPaginate}
      />
    </div>
  );
};

export default Transactions;
