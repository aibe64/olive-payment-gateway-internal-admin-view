import { WarningIcon } from "@/assets";
import { Typography } from "antd";

export const WarningHeader: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="bg-light-orange dark:bg-[#1F1F1F] flex items-center justify-center gap-2">
      <img src={WarningIcon} alt="" />
      <Typography className="!text-gray-text !font-inter-regular">
        {message}
      </Typography>
    </div>
  );
};

export default WarningHeader;
