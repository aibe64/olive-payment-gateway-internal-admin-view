import { PageTitle, TableFilter, OliveTable } from "@/components";
import { useAPI } from "@/hooks";
import { APIResponse, AppState } from "@/models";
import { endpoints } from "@/service";
import { usePageStore } from "@/store";
import { userColumn } from "./Columns";

const Users = () => {
  const { fetching } = useAPI<Array<APIResponse.InternalUsers>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.Users.GetInternalUsers,
    isDataTable: true,
  });
  const {
    tableData,
    originalTableData,
  }: AppState<Array<APIResponse.InternalUsers>> = usePageStore<AppState>(
    (state) => state
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle
        title="Administrators"
      />
      {originalTableData?.length ? <TableFilter></TableFilter> : ""}
      <OliveTable<APIResponse.InternalUsers>
        columns={userColumn}
        dataSource={tableData ?? []}
        originalSource={originalTableData ?? []}
        emptyHeadingText="No Administrators"
        emptyParagraphText="There are no administrators created yet."
        spinning={fetching}
      />
    </div>
  );
};
export default Users;
