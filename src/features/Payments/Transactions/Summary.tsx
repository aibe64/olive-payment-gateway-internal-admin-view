import { Format } from "@/lib";
import { APIResponse, APIResponseCode } from "@/models";
import { Button, Divider, List } from "antd";
import { FC } from "react";
import { FaDownload } from "react-icons/fa6";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { TransactionReceipt } from "./TransactionReciept";
import { logo } from "@/assets";

export const TransactionSummary: FC<{ record: APIResponse.Transaction }> = ({
  record,
}) => {
  // Data for rendering in both UI and PDF
  const data: { key: string; value: string }[] = [
    {
      key: "Merchant Name",
      value: record?.merchantName ?? "N/A",
    },
    {
      key: "Status",
      value:
        record?.paymentResponseCode === APIResponseCode.Success
          ? "Success"
          : record?.paymentResponseCode === APIResponseCode.Pending
          ? "Pending"
          : "Failed",
    },
    {
      key: "Amount",
      value: Format.toNaira(
        record?.amount?.toString() ?? "0.00",
        record?.currency
      ),
    },
    {
      key: "Payment Method",
      value: record?.paymentType ?? "N/A",
    },
    {
      key: "Card Pan",
      value: record?.cardPan ?? "N/A",
    },
    {
      key: "Reference",
      value: record?.transactionReference ?? "N/A",
    },
    {
      key: "Currency",
      value: record?.currency ?? "N/A",
    },
    {
      key: "Customer Email",
      value: record?.email ?? "N/A",
    },
    {
      key: "Transaction Dates",
      value: Format.toDateTime(record?.dateCreated),
    },
  ];
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
            {record?.paymentResponseCode === APIResponseCode.Success
              ? "Success"
              : record?.paymentResponseCode === APIResponseCode.Failed
              ? "Failed"
              : "Pending"}
          </span>
          <span className="text-primary font-inter-semibold mt-1">
            {Format.toNaira(
              record?.amount?.toString() ?? "0.00",
              record?.currency
            )}
          </span>
          <span className="text-gray-text text-[0.8rem] mt-1">
            {Format.fromNumberToWords(record?.amount ?? 0)}
          </span>
          <span className="text-gray-text text-[0.9rem] mt-1">
            {Format.toDateTime(record?.dateCreated)}
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
