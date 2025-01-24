import { disabledIcon, enabledIcon } from "@/assets";
import { XpressTableActions } from "@/components/Form";
import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { ColumnProps } from "antd/es/table";
import { ManagerDetails } from "./Details";
import { UpdateManager } from "./Form";

export const managerColumn: ColumnProps<APIResponse.MerchantDetails>[] = [
  {
    title: "Merchant Name",
    width: "25%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.businessName}</span>
        </div>
      );
    },
  },
  {
    title: "Default Provider",
    width: "20%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.defaultProvider ?? "N/A"}</span>
        </div>
      );
    },
  },
  {
    title: "BIN Enabled",
    width: "16%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div>
          {record.useBin ? (
            <img src={enabledIcon} alt="" />
          ) : (
            <img src={disabledIcon} alt="" />
          )}
        </div>
      );
    },
  },
  {
    title: "Default Route Enabled",
    width: "23%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div>
          {record.useDefault ? (
            <img src={enabledIcon} alt="" />
          ) : (
            <img src={disabledIcon} alt="" />
          )}
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
        record.dateUpdated && record.dateUpdated !== "0001-01-01T00:00:00"
          ? Format.toDateTime(record.dateUpdated).split("-")
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
    title: "ACTION",
    key: "7",
    fixed: "right",
    width: "80px",
    render(_: any, record: APIResponse.MerchantDetails) {
      return (
        <XpressTableActions
          record={record}
          pageName={"Transaction Manager"}
          actions={[
            { title: "View", action: "View", modalWidth: 500 },
            { title: "Edit", action: "Edit", modalWidth: 500 },
          ]}
          components={{
            Edit: <UpdateManager records={record} />,
            View: <ManagerDetails records={record} />,
          }}
        />
      );
    },
  },
];
