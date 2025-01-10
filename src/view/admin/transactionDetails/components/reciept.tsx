/* eslint-disable no-useless-escape */
import { Modal, Tag } from "antd";
import React from "react";
import { Props } from "../../../../models/application/props";
import { Row, Button, List, Col } from "antd";
import {
  CloseCircleOutlined,
  CheckCircleFilled,
  PauseCircleOutlined,
} from "@ant-design/icons";
import DateTime from "../../../../shared/functions/DateTime";

const TransactionReceiptModal: React.FC<Props.TransactionReprtModal> = (
  props
) => {
  let data = [
    {
      key: "Trans ID",
      value: props.transaction?.transactionReference,
    },
    {
      key: "Merchant ID",
      value: props.transaction?.id,
    },
    {
      key: "Merchant",
      value: props.transaction?.merchantName,
    },
    {
      key: "Transaction Ref.",
      value: props.transaction?.xpressReference,
    },
    {
      key: "Payment Type",
      value: props.transaction?.paymentType,
    },
    {
      key: "Amount",
      value: props.transaction?.amount,
    },
    {
      key: "Currency",
      value: props.transaction?.currency,
    },
    !props.transaction?.productId?.includes("[{") && {
      key: "Product ID",
      value: props.transaction?.productId,
    },
    props.transaction?.firstname && {
      key: "First Name",
      value: props.transaction?.firstname,
    },
    props.transaction?.lastname && {
      key: "Last Name",
      value: props.transaction?.lastname,
    },
    props.transaction?.address && {
      key: "Address",
      value: props.transaction?.address,
    },
    props.transaction?.organization && {
      key: "Organization",
      value: props.transaction?.organization,
    },
    {
      key: "Description",
      value: props.transaction?.productDescription,
    },
    {
      key: "Transaction Date",
      value: new DateTime().ConvertDateToFieldDateAndTime(
        props.transaction?.dateCreated as string
      ),
    },
    {
      key: "Status",
      value: props.transaction?.paymentResponseMessage,
    },
    {
      key: "PAN/Account",
      value: props.transaction?.cardPan,
    },
  ];
  data = data.filter(item => item !== undefined);
  return (
    <>
      <Modal
        style={{ borderRadius: "5px", width: "100px" }}
        title={"Transaction Information"}
        centered
        width={800}
        visible={props.showModal}
        onCancel={() => props.setModal(false)}
        footer={[
          <Button key="back" onClick={() => props.setModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Row gutter={16}>
          <Col
            style={{ textAlign: "left", marginLeft: 20 }}
            className="gutter-row"
            span={12}
          >
            <p style={{ fontSize: 20 }}>Amount</p>
            <p style={{ fontSize: 20, fontWeight: 600, marginTop: -25 }}>
              {props.transaction?.amount}
            </p>
          </Col>
          <Col style={{ textAlign: "right", marginTop: 10 }} span={9}>
            {props.transaction?.paymentResponseCode === "00" ? (
              <Tag
                icon={<CheckCircleFilled />}
                color="#cd201f"
                style={{ background: "#00a700", borderRadius: 10 }}
              >
                <span style={{ fontSize: 17, fontWeight: 600 }}>Success</span>
              </Tag>
            ) : props.transaction?.paymentResponseCode === "02" ? (
              <Tag
                icon={<CloseCircleOutlined />}
                color="#cd201f"
                style={{ background: "rgb(197 2 67)", borderRadius: 10 }}
              >
                <span style={{ fontSize: 17, fontWeight: 600 }}>Failed</span>
              </Tag>
            ) : (
              <Tag
                icon={<PauseCircleOutlined />}
                color="#cd201f"
                style={{ background: "#720366", borderRadius: 10 }}
              >
                <span style={{ fontSize: 17, fontWeight: 600 }}>Abadoned</span>
              </Tag>
            )}
          </Col>
        </Row>
        <List
          size="small"
          bordered
          dataSource={Array.isArray(data) ? data : []}
          renderItem={(item) =>
             item  && (
              <List.Item>
                {
                  <Row style={{ width: "100%" }}>
                    <Col style={{ textAlign: "left" }} span={12}>
                      {item?.key ?? ""}
                    </Col>
                    <Col style={{ textAlign: "right" }} span={12}>
                      <span style={{ fontWeight: 600 }}>{item?.value}</span>
                    </Col>
                  </Row>
                }
              </List.Item>
            )
          }
        />
      </Modal>
    </>
  );
};
export default TransactionReceiptModal;
