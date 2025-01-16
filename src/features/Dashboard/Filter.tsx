import { AppState } from "@/models";
import { usePageStore } from "@/store";
import { Select } from "antd";

const Filter: React.FC = () => {
  const { setState } = usePageStore<AppState>((state) => state);

  const onFilterChnage = (value: string) => {
    setState("dayOptions", value);
  };

  return (
    <div className="flex items-center justify-end gap-5">
      <Select
        onChange={(e) => onFilterChnage(e)}
        className="!bg-[#FFFFFF] dark:!bg-[#1F1F1F] !w-36 !text-gray-text !rounded-[8px]"
        defaultValue="TODAY"
        allowClear
        options={[
          {
            label: "Today",
            value: "TODAY",
          },
          {
            label: "Yesterday",
            value: "YESTERDAY",
          },
          {
            label: "A Week",
            value: "DAYS_7",
          },
          {
            label: "A Month",
            value: "DAYS_30",
          },
        ]}
      />
    </div>
  );
};

export default Filter;
