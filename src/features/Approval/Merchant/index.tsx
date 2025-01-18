import { XpressTable } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse } from "@/models";
import { endpoints } from "@/service";
import { Typography } from "antd";
import { merchantDataColumns } from "./Columns";

const MerchantApproval: React.FC = () => {
  const { data, fetching } = useAPI<Array<APIResponse.MerchantApproval>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.Approvals.GetAllMerchantChargePendingApproval,
  });

  return (
    <div>
      <Typography className="text-xl font-inter-medium mt-5">
        Merchant Approval
      </Typography>
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
