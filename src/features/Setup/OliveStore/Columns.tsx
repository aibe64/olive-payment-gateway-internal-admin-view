import { OliveTableActions } from "@/components/Form";
import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { Tag } from "antd";
import { ColumnProps } from "antd/es/table";
import { PaymentMethodDetails } from "./Details";
import { UpdatePaymentMethod } from "./Form";

export const paymentMethodColumn: ColumnProps<APIResponse.StorePaymentMethod>[] =
  [
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
      title: "Payment Type",
      width: "25%",
      key: "2",
      ellipsis: true,
      render(_, record) {
        return (
          <div className="flex flex-col">
            <span className="font-inter-semibold">{record.paymentType}</span>
          </div>
        );
      },
    },
    {
      title: "Fee Type",
      width: "25%",
      key: "2",
      ellipsis: true,
      render(_, record) {
        return (
          <div className="flex flex-col">
            <span className="font-inter-semibold">{record.feeType}</span>
          </div>
        );
      },
    },
    {
      title: "Fee",
      width: "25%",
      key: "4",
      ellipsis: true,
      render(_, record) {
        return (
          <div className="flex flex-col">
            <span className="font-inter-semibold">
              {record.feeType === "Percentage"
                ? `${record.fee ?? "0"}%`
                : Format.toNaira(String(record.fee ?? "0.00"))}
            </span>
          </div>
        );
      },
    },
    {
      title: "Status",
      width: "15%",
      key: "5",
      ellipsis: true,
      render(_, record) {
        return (
          <div>
            {record.isActive ? (
              <Tag color={"green"}>Active</Tag>
            ) : (
              <Tag color={"red"}>Inactive</Tag>
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
      render(_: any, record: APIResponse.StorePaymentMethod) {
        return (
          <OliveTableActions
            record={record}
            pageName={"Payment Method"}
            actions={[
              { title: "View", action: "View", modalWidth: 500 },
              { title: "Edit", action: "Edit", modalWidth: 500 },
            ]}
            components={{
              Edit: <UpdatePaymentMethod records={record} isCreate={false} />,
              View: <PaymentMethodDetails records={record} />,
            }}
          />
        );
      },
    },
  ];
