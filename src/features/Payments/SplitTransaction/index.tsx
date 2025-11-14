import { OliveTable } from "@/components";
import { PageTitle } from "@/components";
import { APIResponse, AppState } from "@/models";
import { TransactionFilter } from "./Filter";
import { useAPI, useSplitTransactions } from "@/hooks";
import { usePageStore } from "@/store";
import { TransactionColumns } from "./Columns";
import { useEffect } from "react";
import { endpoints } from "@/service";

const SplitTransactions = () => {
  const { loading, loadingTransaction, onPaginate, hasDataOnRender } =
    useSplitTransactions();

  const { splitTransactionData, splitTransactionPageNumber, setState } =
    usePageStore<AppState>((state) => state);
  const tableData: any = splitTransactionData?.splitTransactions?.items ?? [];

  const { callGetData, data: merchantDetails } = useAPI<
    Array<APIResponse.MerchantDetails>
  >({});

  useEffect(() => {
    callGetData(endpoints.SetUp.GetAllMerchant);
  }, [callGetData]);

  useEffect(() => {
    if (Array.isArray(merchantDetails)) {
      setState(
        "merchantItem",
        merchantDetails.map((item) => ({
          label: item.businessName ?? "N/A",
          value: item.id ?? 0,
        }))
      );
    }
  }, [merchantDetails, setState]);

  return (
    <div className="space-y-4">
      <PageTitle
        title="Split Transactions"
      />
      {hasDataOnRender ? <TransactionFilter /> : ""}
      <OliveTable<APIResponse.SplitTransaction>
        emptyHeadingText={
          <h3>
            Looks like there are no split transactions today.{" "}
            <span className="text-[#FF6D00]">
              You might want to update your filters.
            </span>
          </h3>
        }
        emptyParagraphText=""
        emptyDataTableDescriptionText=""
        dataSource={tableData}
        originalSource={hasDataOnRender ? [] : undefined}
        columns={TransactionColumns}
        spinning={loading || loadingTransaction}
        total={splitTransactionData?.splitTransactions?.totalCount ?? 0}
        rowCount={splitTransactionData?.splitTransactions?.totalCount}
        page={splitTransactionPageNumber}
        onPagination={onPaginate}
      />
    </div>
  );
};

export default SplitTransactions;
