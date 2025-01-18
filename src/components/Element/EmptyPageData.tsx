import { Card, Typography } from "antd";
import { useTheme } from "../UI/ThemeProviderComponent";
import { Fragment, ReactNode } from "react";

export interface EmptyPageDataProps {
  emptyDataTableMainText: string | ReactNode;
  emptyDataTableDescriptionText: string | ReactNode;
  actions?: ReactNode[];
}

const EmptyPageData: React.FC<EmptyPageDataProps> = ({
  emptyDataTableMainText,
  emptyDataTableDescriptionText,
  actions,
}) => {
  const { themeMode } = useTheme();

  return (
    <Card
      className="!p-5 !h-[22rem] md:!w-[95%] !grid !place-content-center !border !border-[#E8E8E8] dark:!border-[#1F1F1F] !rounded-[8px]  lg:!w-full"
      style={{
        backgroundColor: themeMode === "dark" ? "#1F1F1F" : "#FFF",
      }}
      bordered={false}
    >
      <div className="lg:w-[80%] lg:mx-auto">
        <Typography.Title
          level={4}
          className="!font-inter-regular md:!text-[1.5rem] !mx-auto !leading-tight"
        >
          {emptyDataTableMainText}
        </Typography.Title>
        <Typography.Paragraph
          className="!font-inter-regular !mt-3 !text-[0.8rem] !text-gray-text dark:!text-[#f5f5f5]"
        >
          {emptyDataTableDescriptionText}
        </Typography.Paragraph>
        <div className="flex flex-wrap items-center sm:gap-5">
          {actions &&
            actions.map((action, index) => (
              <Fragment key={index}>{action}</Fragment>
            ))}
        </div>
      </div>
    </Card>
  );
};

export default EmptyPageData;
