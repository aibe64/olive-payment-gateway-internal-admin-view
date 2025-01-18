import { memo } from "react";
import { Card, Typography } from "antd";
import { useTheme } from "@/components";
import { Format } from "@/lib";
import { AppState } from "@/models";
import { usePageStore } from "@/store";

const Component = () => {
  const { themeMode } = useTheme();
  const { transactionSummaryData, loadingSummary } = usePageStore<AppState>(
    (state) => state
  );
  const item = transactionSummaryData?.transactionSummarry.item;
  const data = [
    {
      name: "Transaction Value",
      value: Format.toNaira(item?.totalTransactionAmount?.toString() ?? "0.00"),
    },
    {
      name: "Transaction Volume",
      value: item?.transactionVolume,
    },
    {
      name: "Next Settlement",
      value: Format.toNaira(item?.nextSettlementAmount?.toString() ?? "0.00"),
    },
  ];

  return (
    <div className="w-full flex gap-5 overflow-auto mt-5">
      {data.map((item, index) => (
        <Card
          key={index}
          className="!w-[80%] !min-w-[15rem] !border !border-[#E8E8E8] dark:!border-[#1F1F1F] !rounded-[8px]"
          style={{
            backgroundColor: themeMode === "dark" ? "#1F1F1F" : "#FFF",
          }}
          loading={loadingSummary}
        >
          <Typography className="!text-gray-text !font-inter-medium !text-[14px]">
            {item.name}
          </Typography>
          <Typography className="!font-inter-bold !text-[1.2rem] !mt-4">
            {item.value}
          </Typography>
        </Card>
      ))}
    </div>
  );
};

export const Statistics = memo(Component);

Statistics.displayName = "Statistics";

export default Statistics;
