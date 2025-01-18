import { AppState, Props } from "@/models";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FC, PropsWithChildren, useCallback } from "react";
import { usePageStore } from "@/store";
import { searchTable } from "@/lib";
export const TableFilter: FC<PropsWithChildren<Props.Filter>> = ({
  children,
}) => {
  const { setState, originalTableData } = usePageStore<AppState>(
    (state) => state
  );
  const onFilterChange = useCallback(
    (value: string) => {
      const data = searchTable(originalTableData, value);
      setState("tableData", data);
    },
    [originalTableData]
  );

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Input
          onChange={(e) => onFilterChange(e.target.value)}
          className="lg:w-[20rem] rounded-2xl"
          prefix={<SearchOutlined />}
          placeholder={"Search..."}
        />
      </div>
      {children}
    </div>
  );
};
