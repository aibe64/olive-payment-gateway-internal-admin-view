import { XpressTable } from "@/components";
import { PageTitle } from "@/components";
import { APIResponse, AppState } from "@/models";
import { TransactionFilter } from "./Filter";
import { useStoreTransactionFilters } from "@/hooks";
import { usePageStore } from "@/store";
import { TransactionColumns } from "./Columns";

const StoreTransactions = () => {
  const { loading, loadingTransaction, onPaginate } =
    useStoreTransactionFilters();
  const { storeTransactionData, transactionPageNumber } =
    usePageStore<AppState>((state) => state);
  const tableData: APIResponse.StoreTransaction[] =
    storeTransactionData?.storeTransactions?.items ?? [];

  return (
    <div className="space-y-4"> 
      <PageTitle
        totalDataCount={
          storeTransactionData?.storeTransactions?.totalCount ?? 0
        }
        title="Store Transactions"
      />
      { <TransactionFilter />}
      <XpressTable<APIResponse.StoreTransaction>
        emptyHeadingText={
          <h3>
            No have transaction found.{" "}
            <span className="text-[#FF6D00]">Please filter again.</span>
          </h3>
        }
        emptyParagraphText="Create a payment link or send invoices to your customers, to let them pay you."
        emptyDataTableDescriptionText=""
        dataSource={tableData ?? []}
        originalSource={[]}
        columns={TransactionColumns}
        spinning={loading || loadingTransaction}
        total={storeTransactionData?.storeTransactions?.totalCount ?? 0}
        rowCount={storeTransactionData?.storeTransactions?.totalCount ?? 0}
        page={transactionPageNumber}
        onPagination={onPaginate}
      />
    </div>
  );
};

export default StoreTransactions;
