import { Typography } from "antd";
import { FC } from "react";

export const PageTitle: FC<{ title: string; totalDataCount?: number }> = ({
  title,
  totalDataCount,
}) => {
  document.title = `XpressPay | ${title}`;
  return (
    <div className="flex items-end gap-1 mt-5">
      <Typography className="text-2xl font-semibold">{title}</Typography>
      <Typography className="text-base font-normal text-[#656565] mb-[1.5px]">
        {totalDataCount ?? ""}
      </Typography>
    </div>
  );
};
