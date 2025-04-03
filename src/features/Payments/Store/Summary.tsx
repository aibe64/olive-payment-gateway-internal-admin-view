import { Format } from "@/lib";
import { APIResponse, APIResponseCode } from "@/models";
import { Button, Divider, List } from "antd";
import { FC, useMemo } from "react";
import { FaDownload } from "react-icons/fa6";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { TransactionReceipt } from "./TransactionReciept";
import { logo } from "@/assets";

export const TransactionSummary: FC<{
  record: APIResponse.StoreTransaction;
}> = ({ record }) => {
  const data: { key: string; value: string }[] = [
    {
      key: "Store Name",
      value: record?.storeName ?? "N/A",
    },
    {
      key: "Customer Email",
      value: record?.email ?? "N/A",
    },
    {
      key: "Transaction ID",
      value: record?.transactionId ?? "N/A",
    },
  ];

  const productPurchased = useMemo(() => {
    const purchased = record?.productPurchased ?? [];

    if (Array.isArray(purchased) && purchased.length) {
      return [
        ...purchased,
        {
          ...purchased[0],
          amount: record.deliveryDetails?.deliveryFee,
          productName: "Delivery Fee",
          quantity: undefined,
        },
        {
          ...purchased[0],
          amount: record?.discount?.discountAmount,
          productName: `Discount${
            record?.discount?.code ? "(" + record?.discount?.code + ")" : ""
          }`,
          quantity: undefined,
        },
        {
          ...purchased[0],
          amount: record.totalAmount,
          productName: "Total",
          quantity: undefined,
        },
      ];
    }

    return purchased;
  }, [record?.productPurchased]);

  return (
    <div>
      <div className="relative flex flex-col w-full">
        {/* Watermark */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            zIndex: 10, // Ensure it's behind other content
          }}
        />
        <div className="flex flex-col justify-center items-center w-full">
          <img src={logo} className="w-[8rem]" alt="Logo" />
          <span className="font-inter-medium text-[1.1rem] mt-7">
            Transaction Details
          </span>
          <span className="text-gray-text text-[1.1rem] mt-1">
            {record?.status === APIResponseCode.Success
              ? "Success"
              : record?.status === APIResponseCode.Failed
              ? "Failed"
              : "Pending"}
          </span>
          <span className="text-primary font-inter-semibold mt-1">
            {Format.toNaira(
              record?.totalAmount?.toString() ?? "0.00",
              record?.currency
            )}
          </span>
          <span className="text-gray-text text-[0.8rem] mt-1">
            {Format.fromNumberToWords(record?.totalAmount ?? 0)}
          </span>
          <span className="text-gray-text text-[0.9rem] mt-1">
            {Format.toDateTime(record?.paymentDate)}
          </span>
        </div>
        <Divider className="mb-0" />
        <List
          className="mt-2"
          size="small"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <div className="flex justify-between w-full">
                <span>{item.key}</span>
                <span>{item.value}</span>
              </div>
            </List.Item>
          )}
        />
        <div className="flex flex-col p-2">
          <span className="font-inter-semibold mb-3">Product Purchased</span>
          <List
            size="small"
            className="-mt-2 border-[0.5px] rounded-lg"
            header={
              <div className="grid grid-cols-[50%_20%_30%] h-[0.5rem] pb-4 px-2">
                <span>Product Name</span>
                <span>Qty</span>
                <span>Amount</span>
              </div>
            }
            dataSource={productPurchased}
            renderItem={(item) => (
              <List.Item>
                <div className="grid grid-cols-[50%_20%_30%] w-full">
                  <span>{item.productName}</span>
                  <span className="ml-2">{item.quantity}</span>
                  <span
                    style={{
                      fontWeight:
                        item.productName === "Total" ? "bold" : undefined,
                    }}
                    className="ml-2"
                  >
                    {item.quantity
                      ? Format.toNaira(
                          (item.amount * item?.quantity)?.toString() ?? "0.00"
                        )
                      : Format.toNaira(
                          item.amount?.toString() ?? "0.00",
                          record?.currency
                        )}
                  </span>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>

      <div className="mt-3">
        <PDFDownloadLink
          document={<TransactionReceipt record={record} />}
          fileName="transaction_receipt.pdf"
          style={{ textDecoration: "none" }}
        >
          <div className="w-full">
            <Button className="w-full" type="primary">
              Download Receipt <FaDownload />
            </Button>
          </div>
        </PDFDownloadLink>
      </div>
    </div>
  );
};
