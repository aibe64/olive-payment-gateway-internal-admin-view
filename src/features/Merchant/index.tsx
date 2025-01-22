import { PageTitle, XpressTable } from "@/components";
import { useAPI } from "@/hooks";
import { exportToExcel, searchTable } from "@/lib";
import { APIResponse, AppState } from "@/models";
import { endpoints } from "@/service";
import { Button, Input } from "antd";
import { merchantDataColumns } from "./Columns";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { usePageStore } from "@/store";
import { useCallback, useEffect } from "react";

const Merchant: React.FC = () => {
  const { data, fetching } = useAPI<Array<APIResponse.MerchantDetails>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.SetUp.GetAllMerchant,
  });
  const { setState, originalTableData, tableData } = usePageStore<AppState>(
    (state) => state
  );
  const tableDataWithoutId = (data ?? []).map(({ id, ...rest }) => rest);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setState("originalTableData", data);
      setState("tableData", data);
    }
  }, [data, setState]);

  const searchData = useCallback(
    (value: string) => {
      if (originalTableData && Array.isArray(originalTableData)) {
        const merchantData = searchTable(originalTableData, value);
        setState("tableData", merchantData);
      }
    },
    [originalTableData, setState]
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle
        totalDataCount={data?.length ?? 0}
        title="Merchant Management"
      />
      <div className="flex justify-between">
        {" "}
        <Input
          onChange={(e) => searchData(e.target.value)}
          className="w-[17rem] rounded-2xl"
          prefix={<SearchOutlined />}
        />
        <Button
          iconPosition="end"
          onClick={() =>
            exportToExcel(tableDataWithoutId ?? [], "Product Category")
          }
          icon={<DownloadOutlined />}
          className="!bg-white !border-primary text-primary"
        >
          Download
        </Button>
      </div>

      <XpressTable<APIResponse.MerchantDetails>
        columns={merchantDataColumns}
        dataSource={tableData ?? []}
        emptyHeadingText="No User"
        emptyParagraphText="There are no users created yet."
        spinning={fetching}
      />
    </div>
  );
};
export default Merchant;
