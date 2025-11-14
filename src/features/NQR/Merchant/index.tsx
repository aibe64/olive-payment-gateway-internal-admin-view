import {
  PageTitle,
  TableFilter,
  OliveButton,
  OliveTable,
} from "@/components";
import { AppConfig } from "@/config";
import { useAPI } from "@/hooks";
import { APIResponse, AppState } from "@/models";
import { endpoints } from "@/service";
import { useModalStore, usePageStore } from "@/store";
import { useCallback } from "react";
import { binColumn } from "./Columns";
import { UpdateMerchantQR } from "./Form";

const NqrMerchant = () => {
  const { fetching } = useAPI<Array<APIResponse.QrMerchant>>({
    callGetApiOnRender: true,
    queryDataEndpoint: `${AppConfig.NQR_API_BASE_URL}${endpoints.NQR.GetQrMerchant}`,
    isDataTable: true,
  });
  const {
    tableData,
    originalTableData,
  }: AppState<Array<APIResponse.QrMerchant>> = usePageStore<AppState>(
    (state) => state
  );
  const { set } = useModalStore();

  const onAddButton = useCallback(() => {
    set({
      open: true,
      showCloseButton: true,
      title: (
        <span className="text-[1.2rem] font-bold">Create NQR Merchant</span>
      ),
      body: <UpdateMerchantQR isCreate />,
      clearPayloadOnClose: true,
      width: 600,
    });
  }, [set]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="NQR Merchant" />

      <TableFilter>
        <div className="flex gap-2 items-center">
          <OliveButton
            classNames="!py-5"
            onClick={onAddButton}
            title="Add NQR Merchant"
          />
        </div>
      </TableFilter>
      <OliveTable<APIResponse.QrMerchant>
        columns={binColumn}
        dataSource={tableData ?? []}
        originalSource={originalTableData ?? []}
        emptyHeadingText="No BIN"
        emptyParagraphText="There are no BIN created yet."
        spinning={fetching}
      />
    </div>
  );
};
export default NqrMerchant;
