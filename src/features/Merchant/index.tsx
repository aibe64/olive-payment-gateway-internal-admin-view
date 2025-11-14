import { PageTitle, OliveTable } from "@/components";
import { useAPI } from "@/hooks";
import { exportToExcel, Format, searchTable } from "@/lib";
import { APIResponse, AppState } from "@/models";
import { endpoints } from "@/service";
import { Button, Input } from "antd";
import { merchantDataColumns } from "./Columns";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { usePageStore } from "@/store";
import { useCallback, useEffect } from "react";

const Merchant: React.FC = () => {
  const { data, fetching } = useAPI<Array<APIResponse.MerchantDetails>>({
    callGetApiOnRender: true,
    queryDataEndpoint: endpoints.SetUp.GetAllMerchant,
    isDataTable: true,
  });
  const { setState, originalTableData, tableData } = usePageStore<AppState>(
    (state) => state
  );

  const excelData = (data ?? [])?.map((merchant) => {
    return ({
      "Unique Key": merchant.id,
      "Merchant Code": merchant.id,
      oldMerchantId: merchant?.oldMerchantId ?? "N/A",
      oldGatewayMerchantId: merchant?.oldGatewayMerchantId ?? "N/A",
      name: merchant.businessName ?? "N/A",
      email: merchant?.businessEmail ?? "N/A",
      supportEmail: merchant?.supportEmail ?? "N/A",
      chargeBackEmail: merchant?.disputeEmail ?? "N/A",
      settlementAccountNumber: merchant?.settlementAccountNumber ?? "N/A",
      accountName: merchant?.accountName ?? "N/A",
      bankCode: merchant?.bankCode ?? "N/A",
      businessPhoneNumber: merchant?.businessNumber ?? "N/A",
      businessAddress: merchant?.businessAddress,
      status: merchant?.isActive ? "ACTIVE" : "INACTIVE",
      businessType: merchant?.businessType,
      merchantType: merchant?.merchantCategory,
      businessNumber: merchant?.bvn,
      businessNumberType: "BVN",
      receiveInternationalPayment: merchant?.receiveInternationalPayment
        ? "ACTIVE"
        : "INACTIVE",
      cardPayment: merchant?.cardPayment ? "ACTIVE" : "INACTIVE",
      accountPayment: merchant?.accountPayment ? "ACTIVE" : "INACTIVE",
      qrPayment: merchant?.qrPayment ? "ACTIVE" : "INACTIVE",
      ussdPayment: merchant?.ussdPayment ? "ACTIVE" : "INACTIVE",
      isMerchantBearer: "ACTIVE",
      walletPayment: merchant?.walletPayment ? "ACTIVE" : "INACTIVE",
      transactionLimit: merchant?.transactionLimit,
      fileName: "N/A",
      file: "N/A",
      createdAt: Format.toOnlyDate(merchant?.dateProfiled as string),
      updatedAt:Format.toOnlyDate(
        merchant?.dateUpdated as string
      ),
      settlementMerchantId: merchant?.id,
      emailCustomerStatus: "",
      emailMerchantStatus: "",
      bankTransferPayment: merchant?.bankTransferPayment ? "ACTIVE" : "INACTIVE",
      logo: "",
      webHookUrl: merchant?.webHookUrl,
    });
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setState("originalTableData", data);
      setState("tableData", data);
    }
  }, [data, setState]);

  const searchData = useCallback(
    (value: string) => {
      if (originalTableData && Array.isArray(originalTableData)) {
        const merchantData = searchTable(originalTableData, value);
        setState("tableData", merchantData);
      }
    },
    [originalTableData, setState]
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle
        title="Merchant Management"
      />
      <div className="flex justify-between">
        {" "}
        <Input
          onChange={(e) => searchData(e.target.value)}
          className="w-[17rem] rounded-2xl"
          prefix={<SearchOutlined />}
        />
        <Button
          iconPosition="end"
          onClick={() => exportToExcel(excelData ?? [], "Merchant")}
          icon={<DownloadOutlined />}
          className="!bg-white !border-primary text-primary"
        >
          Download
        </Button>
      </div>

      <OliveTable<APIResponse.MerchantDetails>
        columns={merchantDataColumns}
        dataSource={tableData ?? []}
        emptyHeadingText="No User"
        emptyParagraphText="There are no users created yet."
        spinning={fetching}
      />
    </div>
  );
};
export default Merchant;
