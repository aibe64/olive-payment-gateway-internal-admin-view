import { PageTitle, OliveTable } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse, AppState } from "@/models";
import { endpoints } from "@/service";
import { usePageStore } from "@/store";
import { useEffect } from "react";
import { merchantDataColumns } from "./Columns";

const MerchantApproval = () => {
  const { data, fetching } = useAPI<Array<APIResponse.MerchantApproval>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.Approvals.GetAllMerchantChargePendingApproval,
    isDataTable: true,
  });
  const { setState, originalTableData, tableData } = usePageStore<AppState>(
    (state) => state
  );

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setState("originalTableData", data);
      setState("tableData", data);
    }
  }, [data, setState]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle totalDataCount={data?.length ?? 0} title="Merchant Approval" />
      <OliveTable<APIResponse.MerchantApproval>
        columns={merchantDataColumns}
        originalSource={originalTableData}
        dataSource={tableData ?? []}
        emptyHeadingText="No User"
        emptyParagraphText="There are no users created yet."
        spinning={fetching}
      />
    </div>
  );
};
export default MerchantApproval;
