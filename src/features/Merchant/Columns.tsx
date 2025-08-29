import { XpressTableActions } from "@/components/Form";
import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { Tag } from "antd";
import { ColumnProps } from "antd/es/table";
import { PaymentMethodCharges } from "./Charges";
import { UpdateMerchant } from "./Update";
import { ViewMerchant } from "./View";

export const merchantDataColumns: ColumnProps<APIResponse.MerchantDetails>[] = [
  {
    title: "Date Profiled",
    width: "20%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      return record.dateProfiled
        ? Format.toDateTime(record.dateProfiled)
        : "N/A";
    },
  },
  {
    title: "Code",
    width: "10%",
    key: "21",
    ellipsis: true,
    render(_, record) {
      return record.id ?? "N/A";
    },
  },
  {
    title: "Business Name",
    width: "30%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return (
        <div className="flex flex-col">
          <span className="font-inter-semibold">{record.businessName}</span>
          <span className="text-gray-text">{record.businessEmail}</span>
        </div>
      );
    },
  },
  {
    title: "Business Number",
    width: "18%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return record.businessNumber ?? "N/A";
    },
  },
  {
    title: "Business Type",
    width: "20%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return record.businessType ?? "N/A";
    },
  },
  {
    title: "Date Updated",
    width: "20%",
    key: "2",
    ellipsis: true,
    render(_, record) {
      return record.dateUpdated ? Format.toDateTime(record.dateUpdated) : "N/A";
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
          {record.approvalStatus === 2 ? (
            <Tag color={"green"}>Approved</Tag>
          ) : record.approvalStatus === 1 ? (
            <Tag color={"orange"}>Pending</Tag>
          ) : record.approvalStatus === 3 ? (
            <Tag color={"red"}>Disapproved</Tag>
          ) : (
            ""
          )}
        </div>
      );
    },
  },
  {
    title: "ACTION",
    key: "7",
    fixed: "right",
    width: "100px",
    render(_: any, record: APIResponse.MerchantDetails) {
      return (
        <XpressTableActions
          record={record}
          pageName={"Merchant Registration"}
          actions={[
            { title: "View", action: "View", modalWidth: 500 },
            { title: "Edit", action: "Edit", modalWidth: 600 },
            { title: "Charges", action: "Custom", modalWidth: 700 },
          ]}
          components={{
            View: <ViewMerchant records={record} key={`${record.id}`} />,
            Edit: <UpdateMerchant records={record} key={`${record.id}`} />,
            Custom: (
              <PaymentMethodCharges record={record} key={`${record.id}`} />
            ),
          }}
        />
      );
    },
  },
];
