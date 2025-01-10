/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import ReportModal from "./components/reportModal";
import { DataTable } from "../../../shared/components/datatable";
import "./style.css";
import apiConfig from "../../../service/apiConfig";
import { Response } from "../../../models/client/apiResponse";
import { GET } from "../../../service/apiService";
import { DataTableUtil } from "../../../shared/functions/dataTableUtil";
import DateTime from "../../../shared/functions/DateTime";
import SearchDatatable from "../../../shared/functions/searchDatatable";
import { Props } from "../../../models/application/props";
import { Button } from "antd";
import TransactionReceiptModal from "./components/reciept";
import { XpressLayout } from "../../../shared/layout";

export const AdminTransactionReport: React.FC = (props) => {
  const [modal, setModal] = useState(false);
  const [receiptModal, setReceiptModal] = useState(false);
  // const meta = "[{\"Name\":\"revenue_items\",\"Value\":\"[{\\\"amount\\\":14707.93,\\\"agency_code\\\":{\\\"id\\\":210,\\\"display_name\\\":\\\"D.S. Adegbenro ICT Polytechnic\\\",\\\"agency_code\\\":\\\"200050020110000\\\",\\\"ministry_id\\\":10,\\\"created_at\\\":\\\"2021-12-14 15:16:57\\\",\\\"updated_at\\\":\\\"2021-12-14 15:16:57\\\"},\\\"agency_name\\\":\\\"D.S. Adegbenro ICT Polytechnic\\\",\\\"revenue_code\\\":\\\"200050020112016002\\\",\\\"revenue_name\\\":\\\"NDII Full Time School Fee\\\",\\\"payment_reference\\\":\\\"0089000021962_62477E4F94ECF\\\\/1412\\\",\\\"revenue_item_reference\\\":\\\"0089000021962_200050020112016002\\\"}]\"},{\"Name\":\"payment_code\",\"Value\":\"0089000021962\"},{\"Name\":\"environment\",\"Value\":\"production\"}]"
  const [rows, setRow] = useState([] as any);
  const [originalRows, setOriginalRows] = useState([] as any);
  const [excelData, setExcelData] = useState(new Props.ExcelData());
  const [merchants, setMerchants] = useState(
    new Array<Response.MerchantDetails>()
  );
  const [column, setColumn] = useState([] as any);
  const [state, setState] = useState({
    loading: false,
  });
  const [tranReport, setTranReport] = useState(
    new Response.TransactionReport()
  );
  const [loading, setLoading] = useState(false);
  const startDate = new DateTime().ConvertDateToReportDate(
    new Date().toString()
  );
  const endDate = new DateTime().ConvertDateToReportDate(new Date().toString());
  async function SetColumn() {
    let col = {
      title: "Update",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_: any, record: Response.TransactionReport) => (
        <div style={{ display: "flex" }}>
          <Button
            onClick={() => ViewReport(record)}
            style={{
              background: "white",
              borderRadius: "5px",
              border: "1px solid #2B872B",
              marginRight: 5,
            }}
          >
            <span style={{ color: "#2B872B" }}>View</span>
          </Button>
          <Button
            onClick={() => ViewReceipt(record)}
            style={{
              background: "white",
              borderRadius: "5px",
              border: "1px solid #2B872B",
              marginRight: 10,
            }}
          >
            <span style={{ color: "#2B872B" }}>Receipt</span>
          </Button>
        </div>
      ),
    };
    let columns = column;
    columns = [
      "key",
      "Reference",
      "Card Pan",
      "Amount",
      "Email",
      "Payment Method",
      "Status",
      "Date Paid",
    ];
    columns = DataTableUtil.SetColumn(columns);
    columns.push(col);
    await setColumn(columns);
  }

  const extractProductIDData = (productId: string) => {
    if (productId && productId.includes(`[{`)) {
      if (!productId.endsWith(`"}]`)) {
        if (productId.endsWith(`"`)) productId += `}]`;
        else if (productId.endsWith(`"}`)) productId += `]`;
        else productId += `"}]`;
      }
      try {
        const parsedData: { name: string; value: string }[] =
          JSON.parse(productId);
        const keysToExtract = [
          "First Name",
          "Last Name",
          "Organization",
          "Address",
        ];
        const extractedData: { [key: string]: string } = {};
        for (const key of keysToExtract) {
          const entry = parsedData.find((item) => item.name === key);
          if (entry) {
            extractedData[key] = entry.value;
          }
        }
        return extractedData;
      } catch {
        return undefined;
      }
    } else {
      return undefined;
    }
  };

  const ViewReport = (report: Response.TransactionReport) => {
    const extractedData = extractProductIDData(report.productId ?? "");
    if (extractedData) {
      if (extractedData["First Name"])
        report.firstname = extractedData["First Name"];
      if (extractedData["Last Name"])
        report.lastname = extractedData["Last Name"];
      if (extractedData["Organization"])
        report.organization = extractedData["Organization"];
      if (extractedData["Address"]) report.address = extractedData["Address"];
    }
    setTranReport(report);
    setModal(true);
  };
  const ViewReceipt = (report: Response.TransactionReport) => {
    const extractedData = extractProductIDData(report.productId ?? "");
    if (extractedData) {
      if (extractedData["First Name"])
        report.firstname = extractedData["First Name"];
      if (extractedData["Last Name"])
        report.lastname = extractedData["Last Name"];
      if (extractedData["Organization"])
        report.organization = extractedData["Organization"];
      if (extractedData["Address"]) report.address = extractedData["Address"];
    }
    setTranReport(report);
    setReceiptModal(true);
  };

  async function onChangeDateRange(date: any, dateString: any) {
    const startDate = dateString[0];
    const endDate = dateString[1];
    await GetTransactionReport(startDate, endDate);
  }

  async function Search(value: string, filterType: string = "") {
    let reports: any = [];
    switch (filterType) {
      case "reference":
        reports = originalRows.filter(function (data: any) {
          return data.xpressReference?.indexOf(value) > -1;
        });
        await setRow(reports);
        break;
      case "email":
        reports = originalRows.filter(function (data: any) {
          return data.email?.indexOf(value) > -1;
        });
        await setRow(reports);
        break;
      case "merchantId":
        reports = originalRows.filter(function (data: any) {
          return data.merchant === parseInt(value);
        });
        await setRow(reports);
        break;
      case "paymentMethod":
        reports = originalRows.filter(function (data: any) {
          return data.paymentType === value;
        });
        await setRow(reports);
        break;
      case "status":
        reports = originalRows.filter(function (data: any) {
          return data.paymentResponseCode === value;
        });
        await setRow(reports);
        break;
      default:
        reports = await SearchDatatable.Search(originalRows, value);
        await setRow(reports);
        break;
    }
  }

  async function GetAllMerchant() {
    const response = await GET(apiConfig.SetUp.GetAllMerchant);
    if (response.success) {
      let merchants: Array<Response.MerchantDetails> = response.data?.$values;
      setMerchants(merchants);
    }
  }
  const GetExcelColumnValue = (
    metaData: any,
    valueKey: string,
    productDesc: string
  ): string => {
    try {
      const newMetata: any = JSON.parse(metaData);
      if (Array.isArray(newMetata)) {
        if (newMetata?.length > 0) {
          const meta = newMetata.filter((x) => x.Name === "revenue_items");
          const paymentDetails = newMetata.filter(
            (x) => x.Name === "PaymentDetails"
          );
          try {
            const values = JSON.parse(meta?.length ? meta[0].Value : []);
            if (Array.isArray(values)) {
              switch (valueKey) {
                case "revenue_code":
                  return values.map((x) => x.revenue_code).toString();
                case "product_description":
                  return values.map((x) => x.revenue_name).toString();
                default:
                  break;
              }
            }
            if (paymentDetails?.length) {
              switch (valueKey) {
                case "revenue_code":
                  return paymentDetails
                    .map((x) => x.paymentItemCode)
                    .toString();
                case "product_description":
                  const desc = paymentDetails.map((x) => x.paymentItemName);
                  if (desc?.length > 0) {
                    return paymentDetails
                      .map((x) => x.paymentItemName)
                      .toString();
                  } else {
                    return productDesc;
                  }
                default:
                  break;
              }
            }
          } catch (error) {
            if (productDesc?.length && valueKey === "product_description")
              return productDesc;
            return "";
          }
        }
      }
    } catch (error) {
      if (productDesc?.length && valueKey === "product_description")
        return productDesc;
      return "";
    }
    if (productDesc?.length && valueKey === "product_description")
      return productDesc;
    return "";
  };
  async function SetExcel(report: Array<Response.TransactionReport>) {
    let excelColumn = [] as any;
    let excelRows = [] as any;
    await report.forEach(function (element: Response.TransactionReport) {
      const extractedData = extractProductIDData(element.productId ?? "");
      if (extractedData) {
        if (extractedData["First Name"])
          element.firstname = extractedData["First Name"];
        if (extractedData["Last Name"])
          element.lastname = extractedData["Last Name"];
        if (extractedData["Organization"])
          element.organization = extractedData["Organization"];
        if (extractedData["Address"])
          element.address = extractedData["Address"];
      }
      excelRows.push({
        UniqueKey: element.id,
        MerchantKey: element.merchant,
        OldMerchantKey: element.oldMerchantKey,
        OldGatewayMerchantId: element.oldGatewayMerchantId,
        PaymentType: element.paymentMethod,
        Email: element.email,
        FirstName: element.firstname,
        LastName: element.lastname,
        Address: element.address,
        Organization: element.organization,
        Amount: element.amount
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        Currency: element.currency,
        TransactionReference: element.transactionReference,
        MaskedPan: element.cardPan,
        AccountNumber: element.accountNumber,
        Brand: element.cardType,
        Type: element.cardType,
        Provider: element.processor,
        ProviderReference: element.providerReference,
        PaymentReference: element.xpressReference,
        PaymentResponseCode: element.paymentResponseCode,
        PaymentResponseMessage: element.paymentResponseMessage,
        ExpiryMonth: element.expiryMonth,
        ExpiryYear: element.expiryYear,
        PhoneNumber: element.phoneNumber,
        DeviceFingerPrint: element.deviceFingerPrint,
        IP: element.ip,
        TransactionProcessedDate: new DateTime().ConvertDateToFieldDateAndTime(
          element.dateCreated as string
        ),
        Metas: element.metaData,
        RevenueCode: GetExcelColumnValue(element.metaData, "revenue_code", ""),
        UpdatedAt: new DateTime().ConvertDateToFieldDateAndTime(
          element.dateModified as string
        ),
        ProductId: element.productId,
        ProductDescription: GetExcelColumnValue(
          element.metaData,
          "product_description",
          element.productDescription as string
        ),
        MerchantName: element.merchantName,
        transactionNumber: element.transactionNumber,
        chargeType: element.chargeType,
        chargeValue: element.chargeValue,
      });
    });
    excelColumn = [
      "Unique Key",
      "Merchant Key",
      "Old Merchant Key",
      "Old Gateway MerchantId",
      "Payment Type",
      "Email",
      "First Name",
      "Last Name",
      "Address",
      "Organization",
      "Amount",
      "Currency",
      "Transaction Reference",
      "Masked Pan",
      "Account Number",
      "Brand",
      "Type",
      "Provider",
      "Provider Reference",
      "Payment Reference",
      "Payment Response Code",
      "Payment Response Msg",
      "Expiry Month",
      "Expiry Year",
      "Phone Number",
      "Device Finger Print",
      "IP",
      "Transaction Process Date",
      "Metas",
      "Revenue Code",
      "Updated At",
      "Product ID",
      "Product Description",
      "Merchant Name",
      "Transaction Number",
      "Charge Type",
      "Charge Value",
    ];
    await setExcelData({
      ...excelData,
      column: DataTableUtil.SetExcelColumn(excelColumn),
      title: "Merchant Transactions Report",
      fileName:
        "xpressPay_merchant_transaction_report_" +
        Math.floor(Math.random() * 1000) +
        1,
      rows: excelRows,
    });
  }

  async function GetTransactionReport(startDate: string, endDate: string) {
    await setState({ ...state, loading: true });
    const response = await GET(
      apiConfig.Report.GetAdminTranReport +
        `?startDate=${startDate}&endDate=${endDate}`
    );
    if (response.success) {
      await setState({ ...state, loading: false });
      let reports: Array<Response.TransactionReport> = response.data?.$values;
      let sn = 1;
      reports.forEach(function (element: Response.TransactionReport) {
        element.key = sn++;
        element.amount = Number(element.amount).toLocaleString();
        element.transactionInformation =
          element.currency === null
            ? element.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
              " from " +
              element.email
            : element.currency +
              " " +
              element.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
              " from " +
              element.email;
        element.datePaid = new DateTime().ConvertDateToFieldDateAndTime(
          element.dateCreated as string
        );
        element.reference = element.providerReference;
        element.paymentMethod = element.paymentType;
        element.status = (
          <React.Fragment>
            {element.paymentResponseCode === "00" ? (
              <b style={{ color: "#2B872B" }}>Successful</b>
            ) : element.paymentResponseCode === "06" ? (
              <b style={{ color: "#B8860B" }}>Pending</b>
            ) : element.paymentResponseCode === "05" ? (
              <b style={{ color: "#B8860B" }}>Pending</b>
            ) : element.paymentResponseCode === "02" ? (
              <b style={{ color: "red" }}>Failed</b>
            ) : (
              <b style={{ color: "#9DA1A9" }}>Abandoned</b>
            )}
            <b></b>
          </React.Fragment>
        );
      });
      // let result: Array<Response.TransactionReport> =
      //   new Array<Response.TransactionReport>();
      // for(const x of length){
      //   result = result.concat(reports);
      // }
      // for (var i = 0; i < 400; i++) {
      //   result = result.concat(reports);
      // }
      //
      setRow(reports);
      setOriginalRows(reports);
      SetExcel(reports);
      setState({ ...state, loading: false });
    } else {
      await setState({ ...state, loading: false });
    }
  }
  const download = async () => {
    await setLoading(true);
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    await delay(10000);
    await setLoading(true);
  };

  useEffect(() => {
    SetColumn();
    GetAllMerchant();
  }, []);
  return (
    <XpressLayout>
      <ReportModal
        setModal={setModal}
        transaction={tranReport}
        showModal={modal}
      />
      <TransactionReceiptModal
        setModal={setReceiptModal}
        transaction={tranReport}
        showModal={receiptModal}
      />
      <section className="admin-report-container">
        <main style={{ marginBottom: 10 }}>
          {" "}
          <Header
            download={download}
            startDate={startDate}
            endDate={endDate}
            onChangeDateRange={onChangeDateRange}
            merchants={merchants}
            Search={Search}
            disableMerchant={false}
            excelData={excelData}
            downloading={loading}
          />
        </main>
        <main style={{ marginLeft: 20, marginRight: 20 }}>
          <DataTable
            columns={column}
            rows={rows}
            size={1000}
            loading={state.loading}
          />
        </main>
      </section>
    </XpressLayout>
  );
};
