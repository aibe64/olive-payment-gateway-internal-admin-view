import {
  PageTitle,
  TableFilter,
  XpressButton,
  XpressTable,
} from "@/components";
import { AppConfig } from "@/config";
import { useAPI } from "@/hooks";
import { APIResponse, AppState } from "@/models";
import { endpoints } from "@/service";
import {  useModalStore, usePageStore } from "@/store";
import { useCallback } from "react";
import { binColumn } from "./Columns";
import { UpdateQrSubMerchant } from "./Form";

const NqrSubMerchant = () => {
  const { fetching } = useAPI<Array<APIResponse.QrSubMerchant>>({
    callGetApiOnRender: true,
    queryDataEndpoint: `${AppConfig.NQR_API_BASE_URL}${endpoints.QR.GetQrSubMerchant}`,
    isDataTable: true
  });
  const {
    tableData,
    originalTableData,
  }: AppState<Array<APIResponse.QrSubMerchant>> = usePageStore<AppState>(
    (state) => state
  );
  const { set } = useModalStore();

  const onAddButton = useCallback(() => {
    set({
      open: true,
      showCloseButton: true,
      title: <span className="text-[1.2rem] font-bold">Create Sub Merchant</span>,
      body: <UpdateQrSubMerchant isCreate/>,
      clearPayloadOnClose: true,
      width: 500
    });
  }, [set]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle totalDataCount={tableData?.length ?? 0} title="Sub Merchant" />
      {originalTableData?.length ? (
        <TableFilter>
          <div className="flex gap-2 items-center">
            <XpressButton
              classNames="!py-5"
              onClick={onAddButton}
              title="Add Sub Merchant"
            />
          </div>
        </TableFilter>
      ) : (
        ""
      )}
      <XpressTable<APIResponse.QrSubMerchant>
        columns={binColumn}
        dataSource={tableData ?? []}
        originalSource={originalTableData ?? []}
        emptyHeadingText="No Sub Merchant"
        emptyParagraphText="There are no sub merchant created yet."
        spinning={fetching}
      />
    </div>
  );
};
export default NqrSubMerchant;
