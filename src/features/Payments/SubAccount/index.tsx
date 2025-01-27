import { PageTitle, TableFilter, XpressTable } from "@/components";
import { exportToExcel } from "@/lib";
import { APIResponse, AppState } from "@/models";
import { Button, Select } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { usePageStore } from "@/store";
import { endpoints } from "@/service";
import { useAPI } from "@/hooks";
import { SubAccountColumn } from "./Columns";
import { useCallback, useMemo } from "react";

const SubAccount = () => {
  const { fetching, callGetData } = useAPI({
    queryDataEndpoint: `${endpoints.Account.GetSubAccount}page=${1}&size=${1000}`,
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
  }: AppState<Array<APIResponse.SubAccount>> = usePageStore<AppState>(
    (state) => state
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tableDataWithoutId = (tableData ?? []).map(({ id, ...rest }) => rest);

  // const onPaginate = useCallback(
  //   (page: number, size: number) => {
  //     callGetData(
  //       `${endpoints.Account.GetSubAccount}page=${page}&size=${size}`
  //     );
  //   },
  //   []
  // );

  const filterByMerchant = useCallback(
    (merchantId: number) => {
      callGetData(
        `${endpoints.Account.GetSubAccount}page=${1}&size=${10000}&mid=${merchantId}`
      );
    },
    []
  );
  const onClear = useCallback(() => {
    callGetData(
      `${endpoints.Account.GetSubAccount}page=${1}&size=${100000}`
    );
  }, []);

  const merchantContent = useMemo(() => {
    return (
      <Select
        className="w-[15rem]"
      allowClear
      onClear={onClear}
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

  return (
    <div className="space-y-4">
      <PageTitle totalDataCount={tableData?.length ?? 0} title="Sub-Account" />
      <TableFilter hideFilterField customFilter={merchantContent}>
        {originalTableData?.length ? (
          <div className="flex gap-2 items-center">
            <Button
              iconPosition="end"
              onClick={() =>
                exportToExcel(tableDataWithoutId ?? [], "Sub_Account")
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
      <XpressTable<APIResponse.SubAccount>
        emptyHeadingText={
          <h3>
            You have not created any sub-account, they’ll appear here once you
            do so.
          </h3>
        }
        emptyParagraphText="Split payments with your vendors by adding their details here."
        emptyDataTableDescriptionText=""
        dataSource={tableData ?? []}
        originalSource={originalTableData ?? []}
        columns={SubAccountColumn}
        spinning={fetching}
        //onPagination={onPaginate}
      />
    </div>
  );
};

export default SubAccount;
