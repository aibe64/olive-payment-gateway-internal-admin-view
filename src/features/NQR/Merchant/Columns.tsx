import { OliveTableActions } from "@/components/Form";
import { AppConfig } from "@/config";
import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { endpoints } from "@/service";
import { Tag } from "antd";
import { ColumnProps } from "antd/es/table";
import { MerchantQRDetails } from "./Details";
import { UpdateMerchantQR } from "./Form";

export const binColumn: ColumnProps<APIResponse.QrMerchant>[] = [
  {
    title: "Date Created",
    width: "20%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      const dates =
        record.createdAt && record.createdAt !== "0001-01-01T00:00:00"
          ? Format.toDateTime(record.createdAt).split("-")
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
    title: "Merchant Number",
    width: "25%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.merchantNum}</span>
        </div>
      );
    },
  },
  {
    title: "Merchant Name",
    width: "25%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.merchantName}</span>
        </div>
      );
    },
  },
  {
    title: "Account Details",
    width: "30%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.accountName}</span>
          <span className="text-gray-text">{`${record.accountNumber}(${record?.bankName})`}</span>
        </div>
      );
    },
  },
  {
    title: "NIBSS Account Binding",
    width: "15%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div>
          {record.isAccountBinded ? (
            <Tag color={"green"}>Linked</Tag>
          ) : (
            <Tag color={"red"}>Not Linked</Tag>
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
    render(_: any, record: APIResponse.QrMerchant) {
      return (
        <OliveTableActions
          record={record}
          pageName={"NQR Merchant"}
          actions={[
            { title: "View", action: "View", modalWidth: 550 },
            { title: "Edit", action: "Edit", modalWidth: 600 },
            { title: "Bind Account", action: "Others" },
          ]}
          details={[
            {
              name: "Others",
              actionFor: `${record.merchantName}`,
              endpoint: `${AppConfig.NQR_API_BASE_URL}${endpoints.NQR.BindMerchantAccount}`,
              payload: {
                merchantNumber: record?.merchantNum,
                bank_no: record?.bankCode,
                account_name: record.accountName,
                account_number: record.accountNumber,
              },
            },
          ]}
          components={{
            Edit: <UpdateMerchantQR records={record} isCreate={false} />,
            View: <MerchantQRDetails records={record} />,
          }}
        />
      );
    },
  },
];
