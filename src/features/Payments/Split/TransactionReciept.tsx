import { logoImg } from "@/assets";
import { Format } from "@/lib";
import { APIResponse, APIResponseCode } from "@/models";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { FC } from "react";

export const TransactionReceipt: FC<{ record: APIResponse.SplitTransaction }> = ({
  record,
}) => {
  Font.register({
    family: "Inter",
    fonts: [
      {
        src: "/fonts/Inter-Regular.ttf", // Public path
        fontWeight: "normal",
      },
      {
        src: "/fonts/Inter-Medium.ttf",
        fontWeight: "medium",
      },
      {
        src: "/fonts/Inter-Bold.ttf",
        fontWeight: "bold",
      },
    ],
  });

  // Define styles for the PDF
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      paddingHorizontal: 50,
      fontSize: 10,
      fontFamily: "Inter",
      color: "#333",
      position: "relative",
    },
    watermarkImage: {
      position: "absolute",
      top: "20%",
      left: "22%",
      width: "60%", // Adjust width to fit the page
      height: "20%", // Maintain aspect ratio for the image
      opacity: 0.1, // Set opacity for the watermark effect
    },
    logo: {
      width: 120,
      alignSelf: "center",
      height: 40,
    },
    header: {
      textAlign: "center",
      marginVertical: 10,
    },
    footer: {
      textAlign: "center",
      marginVertical: 30,
    },
    section: {
      marginVertical: 10,
    },
    purchasedSection: {
      marginVertical: 1,
      borderWidth: 0.5,
      borderRadius: 5,
    },
    textBold: {
      fontFamily: "Inter",
      fontWeight: "bold",
    },
    textMedium: {
      fontFamily: "Inter",
      fontWeight: "medium",
    },
    grid: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottom: "1px solid #ddd",
      padding: 5,
    },
    purchasedHeader: {
      backgroundColor: "#0067011A",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottom: "1px solid #ddd",
      padding: 5,
      color: "#006F01",
      fontFamily: "Inter",
      fontWeight: "bold",
    },
  });

  const data: { key: string; value: string }[] = [
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
      value: record?.amount?.toString() ?? "0.00",
    },
    {
      key: "Payment Method",
      value: record?.paymentType ?? "N/A",
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
      key: "Transaction Date",
      value: Format.toDateTime(record?.transactionDate),
    },
  ];

  return (
    <Document>
      <Page style={styles.page}>
        {/* Watermark Image */}
        <Image src={logoImg} style={styles.watermarkImage} />
        {/* Header Section */}
        <View style={styles.header}>
          <Image src={logoImg} style={styles.logo} />
          <Text
            style={[
              styles.textBold,
              { fontSize: 14, marginVertical: 8, marginTop: 20 },
            ]}
          >
            Transaction Details
          </Text>
          <Text style={{ marginTop: 10, fontSize: 14 }}>
            {record?.paymentResponseCode === APIResponseCode.Success
              ? "Success"
              : record?.paymentResponseCode === APIResponseCode.Failed
              ? "Failed"
              : "Pending"}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "extrabold",
              marginTop: 10,
              color: "#006F01",
            }}
          >
            {}{" "}
            {Format.toNaira(
              record?.amount?.toString() ?? "0.00",
              undefined,
              true
            )}
          </Text>
          <Text
            style={{
              marginTop: 10,
            }}
          >
            {Format.fromNumberToWords(record?.amount ?? 0)}
          </Text>
          <Text
            style={{
              marginTop: 10,
            }}
          >
            {Format.toDateTime(record?.transactionDate)}
          </Text>
        </View>
        {/* Transaction Details */}
        <View style={styles.section}>
          {data.map((item, index) => (
            <View style={styles.grid} key={index}>
              <Text>{item.key}</Text>
              <Text>{item.value}</Text>
            </View>
          ))}
        </View>
        {/* Footer Section */}
        <View style={styles.footer}>
          <Text
            style={[
              styles.textMedium,
              {
                fontSize: 14,
                color: "#6D6D6D",
              },
            ]}
          >
            Xpress Payment Solutions Limited
          </Text>
          <Text
            style={[
              {
                fontSize: 8,
                marginVertical: 8,
                textDecoration: "underline",
                marginTop: 3,
                color: "blue",
              },
            ]}
          >
            Customer.care@xpresspayments.com
          </Text>
          <Text
            style={[
              {
                fontSize: 8,
                marginVertical: 8,
                textDecoration: "underline",
                marginTop: 0,
                color: "blue",
              },
            ]}
          >
            08188866033, 08188866022, 07002255977,
          </Text>
          <Text
            style={[
              {
                fontSize: 8,
                marginVertical: 8,
                textDecoration: "underline",
                marginTop: 0,
                color: "blue",
              },
            ]}
          >
            02018888565
          </Text>
        </View>
      </Page>
    </Document>
  );
};
