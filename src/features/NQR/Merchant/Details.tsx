import { Format } from "@/lib";
import { APIResponse } from "@/models";
import { List } from "antd";
import { FC } from "react";

export const MerchantQRDetails: FC<{
  records?: APIResponse.QrMerchant;
}> = ({ records }) => {
  const items = [
    {
      key: "Date Created",
      value: records?.createdAt ? Format.toOnlyDate(records?.createdAt) : "N/A",
    },
    {
      key: "Merchant Name",
      value: records?.merchantName ?? "N/A",
    },
    {
      key: "TIN",
      value: records?.merchantTIN ?? "N/A",
    },
    {
      key: "Contact",
      value: records?.contact ?? "N/A",
    },
    {
      key: "Phone Number",
      value: records?.phoneNumber ?? "N/A",
    },
    {
      key: "Email",
      value: records?.email ?? "N/A",
    },
    {
      key: "Address",
      value: records?.address ?? "N/A",
    },
    {
      key: "Account Name",
      value: records?.accountName ?? "N/A",
    },
    {
      key: "Account Number",
      value: records?.accountNumber ?? "N/A",
    },
    {
      key: "Transaction Fee Bearer",
      value: records?.transactionFeeBearer ?? "N/A",
    },
    {
      key: "Institution Code",
      value: records?.bankCode ?? "N/A",
    },
    {
      key: "Bank Name",
      value: records?.bankName ?? "N/A",
    },
    {
      key: "Is Connected To Hub",
      value: records?.isHub ? "Yes" : "No",
    },
    {
      key: "Notification URL",
      value: records?.notificationUrl ?? "N/A",
    },
    {
      key: "Date Modified",
      value:
        records?.updatedAt && records?.updatedAt !== "0001-01-01T00:00:00"
          ? Format.toOnlyDate(records?.updatedAt)
          : "N/A",
    },
  ];

  return (
    <div>
      <List
        size="large"
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
