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
import { roleColumn } from "./Columns";
import { UpdateRoles } from "./Form";

const Role = () => {
  const { fetching } = useAPI<Array<APIResponse.Roles>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.Account.GetAllRoles,
    isDataTable: true
  });
  const {
    tableData,
    originalTableData,
  }: AppState<Array<APIResponse.Roles>> = usePageStore<AppState>(
    (state) => state
  );
  
  const { set } = useModalStore();

  const onAddButton = useCallback(() => {
    set({
      open: true,
      showCloseButton: true,
      title: <span className="text-[1.2rem] font-bold">Create Role</span>,
      body: <UpdateRoles isCreate/>,
      clearPayloadOnClose: true,
      width: 500
    });
  }, [set]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Role" />
      {originalTableData?.length ? (
        <TableFilter filterTypes={["dateRange"]}>
          <div className="flex gap-2 items-center">
            <OliveButton
              classNames="!py-5"
              onClick={onAddButton}
              title="Add Role"
            />
          </div>
        </TableFilter>
      ) : (
        ""
      )}
      <OliveTable<APIResponse.Roles>
        columns={roleColumn}
        dataSource={tableData ?? []}
        originalSource={originalTableData ?? []}
        emptyHeadingText="No Roles"
        emptyParagraphText="There are no role created yet."
        spinning={fetching}
        actions={[
          <Button
            type="primary"
            className="!mt-4 !rounded-[8px] !shadow-none !py-5 flex gap-2 items-center"
            onClick={onAddButton}
          >
            Create Role
            <img className="h-[1rem] w-[1rem]" src={settingSVG} alt="" />
          </Button>,
        ]}
      />
    </div>
  );
};
export default Role;
