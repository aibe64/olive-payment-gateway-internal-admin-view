import { PageTitle, TableFilter, OliveTable } from "@/components";
import { exportToExcel } from "@/lib";
import { APIResponse, AppState } from "@/models";
import { Button, Select } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { usePageStore } from "@/store";
import { endpoints } from "@/service";
import { useAPI } from "@/hooks";
import { SplitAccountColumn } from "./Columns";
import { useCallback, useMemo } from "react";

const SplitAccountGroup = () => {
  const { fetching, callGetData } = useAPI({
    queryDataEndpoint: `${
      endpoints.Account.GetSplitAccountGroup
    }page=${1}&size=${1000}`,
    isDataTable: true,
    callGetApiOnRender: true,
  });

  const { fetching: fetchingMerchant, data: merchants } = useAPI<
    Array<APIResponse.MerchantDetails>
  >({
    queryDataEndpoint: `${endpoints.SetUp.GetAllMerchant}`,
    callGetApiOnRender: true,
  });

  const {
    tableData,
    originalTableData,
  }: AppState<Array<APIResponse.SplitAccountGroup>> = usePageStore<AppState>(
    (state) => state
  );

  const filterByMerchant = useCallback((merchantId: number) => {
    callGetData(
      `${
        endpoints.Account.GetSplitAccountGroup
      }page=${1}&size=${10}&mid=${merchantId}`
    );
  }, []);

  const onClear = useCallback(() => {
    callGetData(
      `${endpoints.Account.GetSplitAccountGroup}page=${1}&size=${100000}`
    );
  }, []);

  const merchantContent = useMemo(() => {
    return (
      <Select
      showSearch
      filterOption={(input, option) =>
        (option?.label ?? "")
          .toString()
          ?.toLowerCase()
          ?.includes(input.toLowerCase())
      }
        allowClear
        onClear={onClear}
        className="w-[15rem]"
        onChange={(e) => filterByMerchant(e)}
        options={
          Array.isArray(merchants)
            ? merchants.map((x) => ({ label: x.businessName, value: x.id }))
            : []
        }
        loading={fetchingMerchant}
        placeholder="Select a merchant"
      />
    );
  }, [fetchingMerchant, merchants]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tableDataWithoutId = (tableData ?? []).map(({ id, ...rest }) => rest);

  const excelData = tableDataWithoutId.map((data) => ({
    ...data,
    SplitAccounts: data.SplitAccounts
      ?.map(
        (account) =>
          `${account.SplitAccountName}(${
            (account.percentage as number) > 0
              ? account.percentage
              : account.amount
          })`
      )
      .toString(),
  }));

  return (
    <div className="space-y-4">
      <PageTitle
        title="Split Payment"
      />

      <TableFilter hideFilterField customFilter={merchantContent}>
        {originalTableData?.length ? (
          <div className="flex gap-2 items-center">
            <Button
              iconPosition="end"
              onClick={() =>
                exportToExcel(excelData ?? [], "Sub_Account Group")
              }
              icon={<DownloadOutlined />}
              className="!bg-white !border-primary text-primary"
            >
              Download
            </Button>
          </div>
        ) : (
          <></>
        )}
      </TableFilter>
      <OliveTable<APIResponse.SplitAccountGroup>
        emptyHeadingText={
          <h3>
            You have not created any Split Payment, they’ll appear here once you
            do so.
          </h3>
        }
        emptyParagraphText="Split payments with your vendors by adding their details here."
        emptyDataTableDescriptionText=""
        dataSource={tableData ?? []}
        originalSource={originalTableData ?? []}
        columns={SplitAccountColumn}
        spinning={fetching}
      />
    </div>
  );
};

export default SplitAccountGroup;
