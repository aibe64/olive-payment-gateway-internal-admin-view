import { APIResponse } from "@/models";
import { memo } from "react";
import { Card, Typography } from "antd";
import { useTheme } from "@/components";
import { formatToNaira } from "@/lib";

const Component: React.FC<{
  statistics: APIResponse.Statistics | undefined;
  loading: boolean;
}> = ({ statistics, loading }) => {
  const { themeMode } = useTheme();

  const data = [
    {
      name: "Total Transaction",
      amount: `${formatToNaira(
        statistics?.totalTransaction?.toString() ?? "0.00"
      )}`,
    },
    {
      name: "Successful Transaction",
      amount: `${formatToNaira(
        statistics?.successfulTransaction?.toString() ?? "0.00"
      )}`,
    },
    {
      name: "Pending Transaction",
      amount: `NGN ${formatToNaira(
        statistics?.pendingTransaction?.toString() ?? "0.00"
      )}`,
    },
    {
      name: "Failed Transaction",
      amount: `${formatToNaira(
        statistics?.failedTransaction?.toString() ?? "0.00"
      )}`,
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
          loading={loading}
        >
          <Typography className="!text-gray-text !font-inter-medium !text-[14px]">
            {item.name}
          </Typography>
          <Typography className="!font-inter-bold !text-[1.2rem] !mt-4">
            {item.amount}
          </Typography>
        </Card>
      ))}
    </div>
  );
};

export const Statistics = memo(Component);

Statistics.displayName = "Statistics";

export default Statistics;
