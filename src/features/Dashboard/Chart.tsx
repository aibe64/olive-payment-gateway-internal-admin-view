import { memo } from "react";
import { Card, Empty, Typography } from "antd";
import { Pie } from "@ant-design/charts";
import { XpressChart } from "@/config";
import { APIResponse } from "@/models";
import { useTheme } from "@/components";

const Component: React.FC<{
  statistics?: APIResponse.Statistics;
  loading: boolean;
}> = ({ statistics, loading }) => {
  const { themeMode } = useTheme();
  const data = [
    {
      title: "Category",
      data:
        statistics?.categoriesReport?.map((category) => ({
          value: category.value,
          label: category.name,
        })) ?? [],
    },
    {
      title: "Biller",
      data:
        statistics?.billersReport?.map((biller) => ({
          value: biller.value,
          label: biller.name,
        })) ?? [],
    },
    {
      title: "Product",
      data:
        statistics?.productsReport?.map((product) => ({
          value: product.value,
          label: product.name,
        })) ?? [],
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-3 lg:gap-5">
      {data &&
        data.map((item, index) => (
          <Card
            style={{
              backgroundColor: themeMode === "dark" ? "#1F1F1F" : "#FFF",
            }}
            key={index}
            loading={loading}
            className="!border !border-[#E8E8E8] dark:!border-[#1F1F1F] !rounded-[8px] !mt-5"
          >
            <Typography className="!text-gray-text !font-inter-semibold">
              {item.title}
            </Typography>
            <div style={{ position: "relative", height: "350px" }}>
              {item.data?.length > 0 ? (
                <Pie
                  {...XpressChart.config(item.data)}
                  colors={XpressChart.colors}
                />
              ) : (
                <Empty className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
              <div className="absolute bottom-0 left-0 w-full text-center flex items-center gap-5 justify-center">
                {item?.data?.map((x, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center gap-1"
                  >
                    <div
                      className="p-[0.35rem]"
                      style={{ backgroundColor: XpressChart.colors[index] }}
                    />
                    <Typography className="text-gray-700 dark:text-gray-300 !text-[0.7rem]">
                      {x.label}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
};
export const Chart = memo(Component);

Chart.displayName = "Chart";

export default Chart;
