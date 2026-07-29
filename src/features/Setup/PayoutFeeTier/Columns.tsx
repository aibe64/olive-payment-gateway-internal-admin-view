import { OliveTableActions } from "@/components/Form";
import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { endpoints } from "@/service";
import { Tag } from "antd";
import { ColumnProps } from "antd/es/table";
import { CreatePayoutFeeTier } from "./Form";

export const payoutFeeTierColumn: ColumnProps<APIResponse.PayoutFeeTier>[] = [
  {
    title: "Date Created",
    width: "18%",
    key: "1",
    ellipsis: true,
    render(_, record) {
      return record.created_at ? Format.toDateTime(record.created_at) : "N/A";
    },
  },
  {
    title: "Minimum Amount",
    width: "17%",
    key: "3",
    ellipsis: true,
    render(_, record) {
      return <span>{Format.toNaira(String(record.min_amount))}</span>;
    },
  },
  {
    title: "Maximum Amount",
    width: "17%",
    key: "4",
    ellipsis: true,
    render(_, record) {
      return <span>{Format.toNaira(String(record.max_amount))}</span>;
    },
  },
  {
    title: "Fixed Fee",
    width: "15%",
    key: "5",
    ellipsis: true,
    render(_, record) {
      return <span>{Format.toNaira(String(record.fixed_fee))}</span>;
    },
  },
  {
    title: "Status",
    width: "13%",
    key: "6",
    ellipsis: true,
    render(_, record) {
      return record.is_active ? (
        <Tag color={"green"}>Active</Tag>
      ) : (
        <Tag color={"red"}>Inactive</Tag>
      );
    },
  },
  {
    title: "Actions",
    key: "7",
    fixed: "right",
    width: "80px",
    render(_: any, record: APIResponse.PayoutFeeTier) {
      return (
        <OliveTableActions
          record={record}
          pageName={"Payout Fee Tier"}
          actions={[
            { title: "Edit", action: "Edit", modalWidth: 500 },
            ...(record.is_active
              ? [{ title: "Deactivate", action: "Deactivate" } as const]
              : [{ title: "Activate", action: "Activate" } as const]),
          ]}
          components={{
            Edit: <CreatePayoutFeeTier records={record} />,
          }}
          details={[
            {
              name: "Activate",
              actionFor: `Payout Fee Tier #${record.id}`,
              endpoint: `${endpoints.Admin.DeactivatePayoutFeeTier}${record.id}/deactivate`,
              payload: { id: record.id },
            },
            {
              name: "Deactivate",
              actionFor: `Payout Fee Tier #${record.id}`,
              endpoint: `${endpoints.Admin.DeactivatePayoutFeeTier}${record.id}/deactivate`,
              payload: { id: record.id },
            },
          ]}
        />
      );
    },
  },
];
