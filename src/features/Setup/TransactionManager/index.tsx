import {
  PageTitle,
  TableFilter,
  XpressTable,
} from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse, AppState } from "@/models";
import { endpoints } from "@/service";
import { usePageStore } from "@/store";
import { managerColumn } from "./Columns";

const TransactionManager = () => {
  const { fetching } = useAPI<Array<APIResponse.MerchantDetails>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.SetUp.GetAllMerchant,
    isDataTable: true
  });
  const {
    tableData,
    originalTableData,
  }: AppState<Array<APIResponse.MerchantDetails>> = usePageStore<AppState>(
    (state) => state
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle totalDataCount={tableData?.length ?? 0} title="Transaction Manager" />
      {originalTableData?.length ? (
        <TableFilter>
        </TableFilter>
      ) : (
        ""
      )}
      <XpressTable<APIResponse.MerchantDetails>
        columns={managerColumn}
        dataSource={tableData ?? []}
        originalSource={originalTableData ?? []}
        emptyHeadingText="No Transaction Manager"
        emptyParagraphText="There are no data found."
        spinning={fetching}
      />
    </div>
  );
};
export default TransactionManager;
