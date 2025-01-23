import { PageTitle, XpressTable } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse } from "@/models";
import { endpoints } from "@/service";
import { merchantDataColumns } from "./Columns";

const MerchantApproval = () => {
  const { data, fetching } = useAPI<Array<APIResponse.MerchantApproval>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.Approvals.GetAllMerchantChargePendingApproval,
    isDataTable: true
  });

  return (
    <div className="flex flex-col gap-5">
      <PageTitle
        totalDataCount={data?.length ?? 0}
        title="Merchant Approval"
      />
      <XpressTable<APIResponse.MerchantApproval>
        columns={merchantDataColumns}
        dataSource={data ?? []}
        emptyHeadingText="No User"
        emptyParagraphText="There are no users created yet."
        spinning={fetching}
      />
    </div>
  );
};
export default MerchantApproval;
