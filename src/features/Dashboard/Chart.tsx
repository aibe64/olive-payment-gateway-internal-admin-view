import { memo } from "react";
import { Card, DatePicker, Empty } from "antd";
import { Pie, Area, PieConfig, AreaConfig } from "@ant-design/charts";
import { useTheme } from "@/components";
import { usePageStore } from "@/store";
import { AppState } from "@/models";
import dayjs, { Dayjs } from "dayjs";
import { useDashboard } from "@/hooks";
import { Format } from "@/lib";

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

  const config: AreaConfig = {
    data: yearlyData,
    colorField: "#fff",
    xField: (d: any) => d.month,
    yField: "amount",
    style: {
      fill: "linear-gradient(180deg, #E5F1E6 0%, #FFFFFF 100%)",
    },
    theme: {
      styleSheet: {
        fontFamily: "Arial",
        axis: {
          label: {
            fill: "#fff",
          },
        },
      },
    },
    axis: {
      y: { labelFormatter: "~s" },
      x: { color: "#fff" },
      label: {
        style: {
          color: "#ffff",
        },
      },
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
      { type: "Account", value: item?.totalAccountTransactionAmount },
      { type: "QR", value: item?.totalQRAmount },
      { type: "E-Naira", value: item?.totalENairaTransactionAmount },
    ],
    angleField: "value",
    colorField: "type",
    innerRadius: 0.6,
    label: false,
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
      <div className="grid grid-cols-[60%_38%] gap-[2%]">
        <div className="rounded-lg border-gray-100 border-[0.5px] p-4 flex flex-col gap-2 dark:bg-white">
          <div className="flex justify-between">
            <span className="text-gray-text dark:text-white">
              Yearly Transactions
            </span>
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
          <div className="gap-2 mt-4 -mb-[2rem] grid grid-cols-2">
            <div className="flex gap-2 items-center">
              <span className="font-inter-semibold">Card</span>
              <span>{Format.toNaira(item?.totalCardTransactionAmount?.toString() ?? "0.00")}</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-inter-semibold">Transfer</span>
              <span>{Format.toNaira(item?.totalTransferTransactionAmount?.toString() ?? "0.00")}</span>
            </div>
            <div className="flex gap-1 items-center">
            <span className="font-inter-semibold">Account</span>
              <span>{Format.toNaira(item?.totalAccountTransactionAmount?.toString() ?? "0.00")}</span>
            </div>
            <div className="flex gap-1 items-center">
            <span className="font-inter-semibold">QR</span>
              <span>{Format.toNaira(item?.totalQRAmount?.toString() ?? "0.00")}</span>
            </div>
            <div className="flex gap-1 items-center">
            <span className="font-inter-semibold">eNaira</span>
              <span>{Format.toNaira(item?.totalENairaTransactionAmount?.toString() ?? "0.00")}</span>
            </div>
          </div>
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
