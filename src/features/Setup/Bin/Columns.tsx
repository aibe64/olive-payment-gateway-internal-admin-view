import { disabledIcon, enabledIcon } from "@/assets";
import { XpressTableActions } from "@/components/Form";
import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { Tag } from "antd";
import { ColumnProps } from "antd/es/table";
import { BinDetails } from "./Details";
import { UpdateBin } from "./Form";

export const binColumn: ColumnProps<APIResponse.Bin>[] = [
  {
    title: "Date Created",
    width: "20%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      const dates =
        record.dateCreated && record.dateCreated !== "0001-01-01T00:00:00"
          ? Format.toDateTime(record.dateCreated).split("-")
          : undefined;
      return (
        <div className="flex flex-col items-flex-start w-full">
          {dates?.length ? (
            <>
              {" "}
              <span>{dates[0]}</span>
              <span>{dates[1]}</span>
            </>
          ) : (
            <span>N/A</span>
          )}
        </div>
      );
    },
  },
  {
    title: "BIN Name",
    width: "25%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.binName}</span>
        </div>
      );
    },
  },
  {
    title: "Provider",
    width: "20%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.provider}</span>
        </div>
      );
    },
  },
  {
    title: "PIN Required",
    width: "20%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div>
          {record.isPinRequired ? (
            <img src={enabledIcon} alt="" />
          ) : (
            <img src={disabledIcon} alt="" />
          )}
        </div>
      );
    },
  },
  {
    title: "Others Required",
    width: "20%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div>
          {record.isOthersRequired ? (
            <img src={enabledIcon} alt="" />
          ) : (
            <img src={disabledIcon} alt="" />
          )}
        </div>
      );
    },
  },
  {
    title: "Card Brand",
    width: "20%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.cardBrand}</span>
        </div>
      );
    },
  },
  {
    title: "Date Modified",
    width: "20%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      const dates =
        record.dateModified && record.dateModified !== "0001-01-01T00:00:00"
          ? Format.toDateTime(record.dateModified).split("-")
          : undefined;
      return (
        <div className="flex flex-col items-flex-start w-full">
          {dates?.length ? (
            <>
              {" "}
              <span>{dates[0]}</span>
              <span>{dates[1]}</span>
            </>
          ) : (
            <span>N/A</span>
          )}
        </div>
      );
    },
  },
  {
    title: "Status",
    width: "15%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div>
          {record.isActive ? (
            <Tag color={"green"}>Enabled</Tag>
          ) : (
            <Tag color={"red"}>Disabled</Tag>
          )}
        </div>
      );
    },
  },
  {
    title: "ACTION",
    key: "7",
    fixed: "right",
    width: "80px",
    render(_: any, record: APIResponse.Bin) {
      return (
        <XpressTableActions
          record={record}
          pageName={"BIN"}
          actions={[
            { title: "View", action: "View", modalWidth: 500 },
            { title: "Edit", action: "Edit", modalWidth: 500 },
          ]}
          components={{
            Edit: <UpdateBin records={record} isCreate={false} />,
            View: <BinDetails records={record} />,
          }}
        />
      );
    },
  },
];
