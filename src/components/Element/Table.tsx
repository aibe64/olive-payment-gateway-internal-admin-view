import { Empty, PaginationProps, Spin, Table } from "antd";
import { useScreenHeight, useTable } from "@/hooks";
import { Props } from "@/models";
import { memo } from "react";
import EmptyPageData from "./EmptyPageData";

const Component = <T,>({
  columns,
  dataSource,
  originalSource,
  spinning,
  total,
  scrollX,
  pageSize,
  rowSelection,
  emptyParagraphText,
  emptyHeadingText,
  actions,
  onPagination,
  onRowSelection,
  hideSizeChanger,
  rowCount
}: Props.TableData<T>) => {
  const { screenHeight } = useScreenHeight();
  const { onPaginate } = useTable();
  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };
  
  if (dataSource?.length === 0 && !spinning && !originalSource?.length && rowCount as number <= 0) {
    return (
      <EmptyPageData
        emptyDataTableMainText={emptyHeadingText}
        emptyDataTableDescriptionText={emptyParagraphText}
        actions={actions}
      />
    );
  }

  if (spinning && dataSource?.length === 0) {
    return (
      <div className="grid place-content-center mt-[20%]">
        <Spin spinning tip="Loading data..." />
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      loading={{
        spinning,
      }}
      dataSource={dataSource}
      className="cursor-pointer border-[1px] border-[#F1F1F1] dark:border-[#1F1F1F] rounded-lg"
      pagination={{
        position: ["bottomCenter"],
        onChange: onPagination ?? onPaginate,
        showSizeChanger: !hideSizeChanger,
        total,
        pageSize,
        className: "px-6 relative",
        itemRender,
        pageSizeOptions: [
          "10",
          "20",
          "30",
          "40",
          "50",
          "60",
          "70",
          "80",
          "90",
          "100",
        ],
      }}
      scroll={{ x: scrollX ? scrollX : 800, y: screenHeight - 340 }}
      rowSelection={rowSelection}
      onRow={(record: T, rowIndex: number | undefined) => {
        return {
          onClick: () => {
            if (onRowSelection) {
              onRowSelection(rowIndex as number, record);
            }
          },
        };
      }}
      locale={{
        emptyText: (
          <div style={{ height: "100%" }}>
            <Empty
              image={<div style={{ fontSize: 40 }}>🫣</div>}
              description="No data to view."
            />
          </div>
        ),
      }}
    />
  );
};

export const OliveTable = memo(Component) as <T>(
  props: Props.TableData<T>
) => JSX.Element;
