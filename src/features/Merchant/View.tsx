import { nigerianBanks } from "@/data";
import { APIResponse } from "@/models";
import { List } from "antd";
import { FC } from "react";

export const ViewMerchant: FC<{
  records?: APIResponse.MerchantDetails;
}> = ({ records }) => {
  const getBank = (bankCode: string) => {
    return nigerianBanks.find((bank) => bank.value == bankCode)?.label;
  };

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
      key: "Bank",
      value: getBank(records?.bankCode ?? "") ?? "N/A",
    },
    {
      key: "Settlement Account Number",
      value: records?.settlementAccountNumber ?? "N/A",
    },
    {
      key: "Settlement Account Name",
      value: records?.accountName ?? "N/A",
    },
    {
      key: "Status",
      value: records?.isActive ? "True" : "False",
    },
    {
      key: "Enable Payment Page Customization",
      value: records?.isPaymentPageCustomizationEnabled ? "True" : "False",
    },
    {
      key: "Show public Key on merchant dashboard",
      value: records?.isKeysVisible ? "True" : "False",
    },
    {
      key: "Enable International Payment",
      value: records?.receiveInternationalPayment ? "True" : "False",
    },
    {
      key: "Card Payment Active",
      value: records?.cardPayment ? "True" : "False",
    },
    {
      key: "Transfer Payment Active",
      value: records?.bankTransferPayment ? "True" : "False",
    },
    {
      key: "USSD Payment Active",
      value: records?.ussdPayment ? "True" : "False",
    },
    {
      key: "eNaira Payment Active",
      value: records?.eNaira ? "True" : "False",
    },
    {
      key: "QR Code Payment Active",
      value: records?.qrPayment ? "True" : "False",
    },
    {
      key: "Wallet Payment Active",
      value: records?.walletPayment ? "True" : "False",
    },
    {
      key: "Tokenization Payment Active",
      value: records?.tokenization ? "True" : "False",
    },
    {
      key: "Charge Type",
      value: records?.chargeType ?? "N/A",
    },
    {
      key: "Charge Value",
      value: records?.chargeValue ?? "N/A",
    },
    {
      key: "Capped At",
      value: records?.chargeCap ?? "N/A",
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
