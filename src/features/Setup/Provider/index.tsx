import { settingSVG } from "@/assets";
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
import { Button } from "antd";
import { useCallback } from "react";
import { providerColumn } from "./Columns";
import { UpdateProvider } from "./Form";

const OliveProvider = () => {
  const { fetching } = useAPI<Array<APIResponse.Provider>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.SetUp.GetAllProviders,
    isDataTable: true
  });
  const {
    tableData,
    originalTableData,
  }: AppState<Array<APIResponse.Provider>> = usePageStore<AppState>(
    (state) => state
  );

  const { set } = useModalStore();

  const onAddButton = useCallback(() => {
    set({
      open: true,
      showCloseButton: true,
      title: <span className="text-[1.2rem] font-bold">Create Provider</span>,
      body: <UpdateProvider isCreate/>,
      clearPayloadOnClose: true,
      width: 500
    });
  }, [set]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle totalDataCount={tableData?.length ?? 0} title="Provider" />
      {originalTableData?.length ? (
        <TableFilter filterTypes={["dateRange"]}>
          <div className="flex gap-2 items-center">
            <OliveButton
              classNames="!py-5"
              onClick={onAddButton}
              title="Add Provider"
            />
          </div>
        </TableFilter>
      ) : (
        ""
      )}
      <OliveTable<APIResponse.Provider>
        columns={providerColumn}
        dataSource={tableData ?? []}
        originalSource={originalTableData ?? []}
        emptyHeadingText="No Provider"
        emptyParagraphText="There are no provider created yet."
        spinning={fetching}
        actions={[
          <Button
            type="primary"
            className="!mt-4 !rounded-[8px] !shadow-none !py-5 flex gap-2 items-center"
            onClick={onAddButton}
          >
            Create Provider
            <img className="h-[1rem] w-[1rem]" src={settingSVG} alt="" />
          </Button>,
        ]}
      />
    </div>
  );
};
export default OliveProvider;
