import {
  PageTitle,
  TableFilter,
  OliveButton,
  OliveTable,
} from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse, AppState } from "@/models";
import { endpoints } from "@/service";
import { useModalStore, usePageStore } from "@/store";
import { useCallback } from "react";
import { payoutFeeTierColumn } from "./Columns";
import { CreatePayoutFeeTier } from "./Form";

const PayoutFeeTier = () => {
  const { fetching } = useAPI<Array<APIResponse.PayoutFeeTier>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.Admin.GetAllPayoutFeeTiers,
    isDataTable: true,
  });
  const {
    tableData,
    originalTableData,
  }: AppState<Array<APIResponse.PayoutFeeTier>> = usePageStore<AppState>(
    (state) => state
  );
  const { set } = useModalStore();

  const onAddButton = useCallback(() => {
    set({
      open: true,
      showCloseButton: true,
      title: (
        <span className="text-[1.2rem] font-bold">Create Payout Fee Tier</span>
      ),
      body: <CreatePayoutFeeTier />,
      clearPayloadOnClose: true,
      width: 500,
    });
  }, [set]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle
        totalDataCount={tableData?.length ?? 0}
        title="Payout Fee Tier"
      />
      {originalTableData?.length ? (
        <TableFilter>
          <div className="flex gap-2 items-center">
            <OliveButton
              classNames="!py-5"
              onClick={onAddButton}
              title="Add Payout Fee Tier"
            />
          </div>
        </TableFilter>
      ) : (
        ""
      )}
      <OliveTable<APIResponse.PayoutFeeTier>
        columns={payoutFeeTierColumn}
        dataSource={tableData ?? []}
        originalSource={originalTableData ?? []}
        emptyHeadingText="No Payout Fee Tier"
        emptyParagraphText="There are no payout fee tiers created yet."
        spinning={fetching}
      />
    </div>
  );
};
export default PayoutFeeTier;
