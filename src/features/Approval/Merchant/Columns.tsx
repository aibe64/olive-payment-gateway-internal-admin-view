import { OliveTableActions } from "@/components/Form";
import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { endpoints } from "@/service";
import { Tag } from "antd";
import { ColumnProps } from "antd/es/table";
import { ViewMerchant } from "./View";

export const merchantDataColumns: ColumnProps<APIResponse.MerchantApproval>[] =
  [
    {
      title: "Date Created",
      width: "19%",
      key: "1",
      ellipsis: true,
      render(_, record) {
        return record.dateCreated
          ? Format.toDateTime(record.dateCreated)
          : "N/A";
      },
    },
    {
      title: "Business Name",
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
      title: "International Payment",
      width: "18%",
      key: "2",
      ellipsis: true,
      render(_, record) {
        return (
          <div>
            {record.receiveInternationalPayment ? (
              <Tag color={"green"}>Enabled</Tag>
            ) : (
              <Tag color={"red"}>Disabled</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: "Card Payment",
      width: "15%",
      key: "2",
      ellipsis: true,
      render(_, record) {
        return (
          <div>
            {record.cardPayment ? (
              <Tag color={"green"}>Enabled</Tag>
            ) : (
              <Tag color={"red"}>Disabled</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: "Transfer Payment",
      width: "15%",
      key: "2",
      ellipsis: true,
      render(_, record) {
        return (
          <div>
            {record.bankTransferPayment ? (
              <Tag color={"green"}>Enabled</Tag>
            ) : (
              <Tag color={"red"}>Disabled</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: "USSD Payment",
      width: "15%",
      key: "2",
      ellipsis: true,
      render(_, record) {
        return (
          <div>
            {record.ussdPayment ? (
              <Tag color={"green"}>Enabled</Tag>
            ) : (
              <Tag color={"red"}>Disabled</Tag>
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
            {record.isApproved ? (
              <Tag color={"green"}>Approved</Tag>
            ) : (
              <Tag color={"orange"}>Pending</Tag>
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
      render(_: any, record: APIResponse.MerchantApproval) {
        return (
          <OliveTableActions
            record={record}
            pageName={"Merchant Registration"}
            actions={[
              { title: "View", action: "View", modalWidth: 500 },
              { title: "Approve", action: "Approve" },
              { title: "Disapprove", action: "Disapprove" },
            ]}
            details={[
              {
                name: "Approve",
                actionFor: `${record.businessName}`,
                endpoint: `${endpoints.Approvals.ApproveMerchantCharge}`,
                payload: record,
              },
              {
                name: "Disapprove",
                actionFor: `${record.businessName}`,
                endpoint: `${endpoints.Approvals.DisapproveMerchantCharge}`,
                payload: record,
              },
            ]}
            components={{
              View: <ViewMerchant records={record} />,
            }}
          />
        );
      },
    },
  ];
