import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { APIResponse, APIResponseCode } from "@/models";
import { Format } from "@/lib";
import { logoImg } from "@/assets";
import { useMemo } from "react";

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

export const TransactionReceipt: React.FC<{
  record: APIResponse.StoreTransaction;
}> = ({ record }) => {
  const data = [
    { key: "Store Name", value: record?.storeName ?? "N/A" },
    { key: "Customer Email", value: record?.email ?? "N/A" },
    { key: "Transaction ID", value: record?.transactionId ?? "N/A" },
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
            {record?.status === APIResponseCode.Success
              ? "Success"
              : record?.status === APIResponseCode.Failed
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
            {record?.currency}{" "}
            {Format.toNaira(
              record?.totalAmount?.toString() ?? "0.00",
              undefined,
              true
            )}
          </Text>
          <Text
            style={{
              marginTop: 10,
            }}
          >
            {Format.fromNumberToWords(record?.totalAmount ?? 0)}
          </Text>
          <Text
            style={{
              marginTop: 10,
            }}
          >
            {Format.toDateTime(record?.paymentDate)}
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
        {/* Products Purchased */}
        <View style={styles.section}>
          <Text style={[styles.textBold, { marginBottom: 5 }]}>
            Product Purchased
          </Text>
          <View style={styles.purchasedSection}>
            <View style={styles.purchasedHeader}>
              <Text>Product Name</Text>
              <Text>Qty</Text>
              <Text>Amount</Text>
            </View>
            {productPurchased.map((item, index) => (
              <View style={styles.grid} key={index}>
                <Text>{item.productName}</Text>
                <Text>{item.quantity || "-"}</Text>
                {item.productName === "Total" ? (
                  <Text style={styles.textBold}>
                    {Format.toNaira(
                      item.amount?.toString() ?? "0.00",
                      record?.currency
                    )}
                  </Text>
                ) : (
                  <Text>
                    {Format.toNaira(
                      item.amount?.toString() ?? "0.00",
                      record?.currency
                    )}
                  </Text>
                )}
              </View>
            ))}
          </View>
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
            Olive Payment
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
            Customer.care@olivepayments.com
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
