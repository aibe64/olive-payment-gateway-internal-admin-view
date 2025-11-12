import { disabledIcon, enabledIcon } from "@/assets";
import { OliveTableActions } from "@/components/Form";
import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { ColumnProps } from "antd/es/table";
import { InstitutionDetails } from "./Details";
import { UpdateInstitution } from "./Form";

export const institutionColumn: ColumnProps<APIResponse.Banks>[] = [
  {
    title: "Bank Name",
    width: "25%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.bankName}</span>
        </div>
      );
    },
  },
  {
    title: "Processor",
    width: "20%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">
            {record.processor ?? "N/A"}
          </span>
        </div>
      );
    },
  },
  {
    title: "Visible on Payment",
    width: "20%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div>
          {record.isVisibleToMerchantForPayment ? (
            <img src={enabledIcon} alt="" />
          ) : (
            <img src={disabledIcon} alt="" />
          )}
        </div>
      );
    },
  },
  {
    title: "Name Required",
    width: "23%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div>
          {record.isNameRequired ? (
            <img src={enabledIcon} alt="" />
          ) : (
            <img src={disabledIcon} alt="" />
          )}
        </div>
      );
    },
  },
  {
    title: "PIN Required",
    width: "23%",
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
    title: "ACTION",
    key: "7",
    fixed: "right",
    width: "80px",
    render(_: any, record: APIResponse.Banks) {
      return (
        <OliveTableActions
          record={record}
          pageName={"Institution"}
          actions={[
            { title: "View", action: "View", modalWidth: 500 },
            { title: "Edit", action: "Edit", modalWidth: 500 },
          ]}
          components={{
            Edit: <UpdateInstitution records={record} />,
            View: <InstitutionDetails records={record} />,
          }}
        />
      );
    },
  },
];
