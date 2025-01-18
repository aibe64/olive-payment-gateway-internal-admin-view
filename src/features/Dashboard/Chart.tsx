import { memo } from "react";
import { Card, DatePicker, Empty } from "antd";
import { Pie, Area, PieConfig } from "@ant-design/charts";
import { useTheme } from "@/components";
import { usePageStore } from "@/store";
import { AppState } from "@/models";
import dayjs, { Dayjs } from "dayjs";
import { useDashboard } from "@/hooks";

const Component = () => {
  const { themeMode } = useTheme();
  const { filterChart } = useDashboard();
  const { transactionSummaryData, loadingSummary, chartData } =
    usePageStore<AppState>((state) => state);
  const item = transactionSummaryData?.transactionSummarry.item;
  const yearlyData =
    chartData?.yearlyTransactions?.items?.map((item) => ({
      month: item.transactionMonth,
      amount: item.totalTransactionAmount,
    })) ?? [];

  const config = {
    data: yearlyData,
    xField: (d: any) => d.month,
    yField: "amount",
    style: {
      fill: "linear-gradient(180deg, #E5F1E6 0%, #FFFFFF 100%)",
    },
    axis: {
      y: { labelFormatter: "~s" },
    },
    line: {
      style: {
        stroke: "darkgreen",
        strokeWidth: 2,
      },
    },
  };

  const pieConfig: PieConfig = {
    data: [
      { type: "Card", value: item?.totalCardTransactionAmount },
      { type: "Transfer", value: item?.totalTransferTransactionAmount },
      { type: "USSD", value: item?.totalUSSDTransactionAmount },
      { type: "Account", value: item?.totalAccountTransactionAmount },
      { type: "QR", value: item?.totalQRAmount },
      { type: "E-Naira", value: item?.totalENairaTransactionAmount },
    ],
    angleField: "value",
    colorField: "type",
    color: [
      "#006F01B2", // Card
      "#FF6D00B2", // Transfer
      "#FF33E1", // USSD
      "#75FF33", // Account
      "#FFC300", // QR
      "#C70039", // E-Naira
    ],
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "bottom",
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 40,
          fontStyle: "bold",
        },
      },
    ],
  };

  const disableFutureYears = (current: Dayjs | null): boolean => {
    return !!current && current.year() > dayjs().year();
  };

  const onYearChange = (date: Dayjs | null): void => {
    if (date) {
      const selectedYear = date.year();
      filterChart(selectedYear?.toString());
    }
  };

  return (
    <Card
      style={{
        backgroundColor: themeMode === "dark" ? "#1F1F1F" : "#FFF",
      }}
      loading={loadingSummary}
      className="!border !border-[#E8E8E8] dark:!border-[#1F1F1F] !rounded-[8px] !mt-5"
    >
      <div className="grid grid-cols-[65%_33%] gap-[2%]">
        <div className="rounded-lg border-gray-100 border-[0.5px] p-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-gray-text">Yearly Transactions</span>
            <DatePicker
              onChange={onYearChange}
              picker="year"
              disabledDate={disableFutureYears}
            />
          </div>

          {yearlyData?.length ? (
            <Area {...config} />
          ) : (
            <div className="flex justify-center w-[130%] mt-[25%]">
              <Empty className=" -translate-x-1/2 -translate-y-1/2" />
            </div>
          )}
        </div>
        <div className="rounded-lg border-gray-100 border-[0.5px] p-4">
          <span className="text-gray-text">Payment Channels</span>
          {item ? (
            <Pie {...pieConfig} />
          ) : (
            <div className="flex justify-center  w-[150%]">
              <Empty className=" -translate-x-1/2 -translate-y-1/2 mt-[25%]" />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
export const Chart = memo(Component);

Chart.displayName = "Chart";

export default Chart;
