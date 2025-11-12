import {
  PageTitle,
  TableFilter,
  OliveTable,
} from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse, AppState } from "@/models";
import { endpoints } from "@/service";
import { usePageStore } from "@/store";
import { institutionColumn } from "./Columns";

const Institution  = () => {
  const { fetching } = useAPI<Array<APIResponse.Banks>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.SetUp.GetBanks,
    isDataTable: true
  });
  const {
    tableData,
    originalTableData,
  }: AppState<Array<APIResponse.Banks>> = usePageStore<AppState>(
    (state) => state
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle totalDataCount={tableData?.length ?? 0} title="Institution" />
      {originalTableData?.length ? (
        <TableFilter>
        </TableFilter>
      ) : (
        ""
      )}
      <OliveTable<APIResponse.Banks>
        columns={institutionColumn}
        dataSource={tableData ?? []}
        originalSource={originalTableData ?? []}
        emptyHeadingText="No Institution"
        emptyParagraphText="There are no data found."
        spinning={fetching}
      />
    </div>
  );
};
export default Institution;
