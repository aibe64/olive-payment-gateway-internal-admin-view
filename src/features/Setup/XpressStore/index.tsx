import { PageTitle, TableFilter, XpressTable } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse, AppState } from "@/models";
import { endpoints } from "@/service";
import { usePageStore } from "@/store";
import { paymentMethodColumn } from "./Columns";

const XpressStore = () => {
  const { fetching } = useAPI<Array<APIResponse.StorePaymentMethod>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.SetUp.GetAllStorePaymentMethods,
    isDataTable: true,
  });
  const {
    tableData,
    originalTableData,
  }: AppState<Array<APIResponse.StorePaymentMethod>> = usePageStore<AppState>(
    (state) => state
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle
        totalDataCount={tableData?.length ?? 0}
        title="Store Payment Method"
      />
      {originalTableData?.length ? (
        <TableFilter filterTypes={["dateRange"]} />
      ) : (
        ""
      )}
      <XpressTable<APIResponse.StorePaymentMethod>
        columns={paymentMethodColumn}
        dataSource={tableData ?? []}
        originalSource={originalTableData ?? []}
        emptyHeadingText="No Provider"
        emptyParagraphText="There are no payment method created yet."
        spinning={fetching}
      />
    </div>
  );
};
export default XpressStore;
