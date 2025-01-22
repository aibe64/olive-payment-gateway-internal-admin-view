import {
  PageTitle,
  TableFilter,
  XpressButton,
  XpressTable,
} from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse, AppState } from "@/models";
import { endpoints } from "@/service";
import {  useModalStore, usePageStore } from "@/store";
import { useCallback } from "react";
import { binColumn } from "./Columns";
import { UpdateBin } from "./Form";

const Bin = () => {
  const { fetching } = useAPI<Array<APIResponse.Bin>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.SetUp.GetAllBin,
    isDataTable: true
  });
  const {
    tableData,
    originalTableData,
  }: AppState<Array<APIResponse.Bin>> = usePageStore<AppState>(
    (state) => state
  );
  const { set } = useModalStore();

  const onAddButton = useCallback(() => {
    set({
      open: true,
      showCloseButton: true,
      title: <span className="text-[1.2rem] font-bold">Create BIN</span>,
      body: <UpdateBin isCreate/>,
      clearPayloadOnClose: true,
      width: 500
    });
  }, [set]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle totalDataCount={tableData?.length ?? 0} title="BIN" />
      {originalTableData?.length ? (
        <TableFilter>
          <div className="flex gap-2 items-center">
            <XpressButton
              classNames="!py-5"
              onClick={onAddButton}
              title="Add BIN"
            />
          </div>
        </TableFilter>
      ) : (
        ""
      )}
      <XpressTable<APIResponse.Bin>
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
export default Bin;
