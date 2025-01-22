import { disabledIcon, enabledIcon } from "@/assets";
import { XpressTableActions } from "@/components/Form";
import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { Tag } from "antd";
import { ColumnProps } from "antd/es/table";
import { ProviderDetails } from "./Details";
import { UpdateProvider } from "./Form";

export const providerColumn: ColumnProps<APIResponse.Provider>[] = [
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
    title: "Provider Name",
    width: "25%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.name}</span>
        </div>
      );
    },
  },
  {
    title: "Card",
    width: "10%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div>
          {record.card ? (
            <img src={enabledIcon} alt="" />
          ) : (
            <img src={disabledIcon} alt="" />
          )}
        </div>
      );
    },
  },
  {
    title: "Transfer",
    width: "10%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div>
          {record.bankTransfer ? (
            <img src={enabledIcon} alt="" />
          ) : (
            <img src={disabledIcon} alt="" />
          )}
        </div>
      );
    },
  },
  {
    title: "Account",
    width: "10%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div>
          {record.account ? (
            <img src={enabledIcon} alt="" />
          ) : (
            <img src={disabledIcon} alt="" />
          )}
        </div>
      );
    },
  },
  {
    title: "USSD",
    width: "10%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div>
          {record.ussd ? (
            <img src={enabledIcon} alt="" />
          ) : (
            <img src={disabledIcon} alt="" />
          )}
        </div>
      );
    },
  },
  {
    title: "Wallet",
    width: "10%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div>
          {record.wallet ? (
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
    width: "10%",
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
    render(_: any, record: APIResponse.Provider) {
      return (
        <XpressTableActions
          record={record}
          pageName={"Provider"}
          actions={[
            { title: "View", action: "View", modalWidth: 500 },
            { title: "Edit", action: "Edit", modalWidth: 500 },
          ]}
          components={{
            Edit: <UpdateProvider records={record} isCreate={false} />,
            View: <ProviderDetails records={record} />,
          }}
        />
      );
    },
  },
];
