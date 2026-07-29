import { OliveTable } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse } from "@/models";
import { endpoints } from "@/service";
import { FC } from "react";
import { payoutFeeTierColumn } from "./Columns";

const viewColumns = payoutFeeTierColumn;

export const MerchantPayoutFeeTiers: FC<{ merchantId?: number }> = ({
  merchantId,
}) => {
  const { data, fetching } = useAPI<Array<APIResponse.PayoutFeeTier>>({
    callGetApiOnRender: true,
    queryDataEndpoint: `${endpoints.Admin.GetAllPayoutFeeTiers}?merchantId=${merchantId}`,
  });

  return (
    <OliveTable<APIResponse.PayoutFeeTier>
      columns={viewColumns}
      dataSource={data ?? []}
      originalSource={data ?? []}
      emptyHeadingText="No Payout Fee Tier"
      emptyParagraphText="This merchant has no payout fee tiers yet."
      spinning={fetching}
    />
  );
};
