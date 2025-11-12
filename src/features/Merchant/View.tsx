import { APIResponse } from "@/models";
import { List } from "antd";
import { FC } from "react";

export const ViewMerchant: FC<{
  records?: APIResponse.MerchantDetails;
}> = ({ records }) => {
  const items = [
    {
      key: "Approval Status",
      value:
        records?.approvalStatus === 2 ? (
          <span className="text-primary">Approved</span>
        ) : records?.approvalStatus === 1 ? (
          <span className="text-tertiary">Pending</span>
        ) : records?.approvalStatus === 3 ? (
          <span className="text-danger">Pending</span>
        ) : (
          "N/A"
        ),
    },
    {
      key: "Business Name",
      value: records?.businessName ?? "N/A",
    },
    {
      key: "Business Number",
      value: records?.businessNumber ?? "N/A",
    },
    {
      key: "Business Type",
      value: records?.businessType ?? "N/A",
    },
    {
      key: "Status",
      value: records?.isActive ? "True" : "False",
    },
    {
      key: "Enable International Payment",
      value: records?.receiveInternationalPayment ? "True" : "False",
    },
    {
      key: "Charge To Customer",
      value: records?.isChargeTransferedToCustomer ? "True" : "False",
    },
    {
      key: "Charge To Merchant",
      value: records?.isChargeTransferedToCustomer ? "False" : "True",
    },
  ];

  return (
    <div>
      <List
        size="large"
        className="overflow-scroll h-[700px]"
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <div className="flex justify-between w-full">
              <span>{item.key}</span>
              <span className="font-inter-semibold">{item.value}</span>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
