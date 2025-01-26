import { APIResponse } from "@/models";
import { List } from "antd";
import { FC } from "react";

export const ViewMerchant: FC<{
  records?: APIResponse.MerchantDetails;
}> = ({ records }) => {
  const items = [
    {
      key: "Approval Status",
      value: <span className="text-tertiary">Pending</span>
    },
    {
      key: "Business Name",
      value: records?.businessName ?? "N/A",
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
      key: "Charge To Customer",
      value: records?.isChargeTransferedToCustomer ? "True" : "False"
    },
    {
      key: "Charge To Merchant",
      value: records?.isChargeTransferedToCustomer ? "False" : "True"
    },
    {
      key: "Charge Type",
      value: records?.chargeType?.toUpperCase() ?? "N/A",
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
