import { Modal } from "antd";
import React from "react";
import { Props } from "../../../../models/application/props";
import { Form, Input, Row, Button, List, Col } from "antd";

const ReportModal: React.FC<Props.TransactionReprtModal> = (props) => {
  const formatMetaData = (metaData: any) => {
    try {
      if (Array.isArray(metaData)) {
        return parseMetadata(metaData);
      } else {
        if (metaData && metaData?.length > 1) {
          return JSON.parse(metaData);
        } else {
          return [];
        }
      }
    } catch (error) {
      return [];
    }
  };
  const parseMetadata = (metaData: any) => {
    try {
      return JSON.parse(metaData);
    } catch (error) {
      return metaData;
    }
  };
  const GetFieldColumnValue = (
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
                  return paymentDetails
                    .map((x) => x.paymentItemName)
                    .toString();
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
  // const metaData = [
  //   {
  //     Name: "revenue_items",
  //     Value:
  //       '[{"amount":5000,"agency_code":{"id":211,"display_name":"Tai Solarin University Of Education","agency_code":"200050072110000","ministry_id":10,"created_at":"2021-12-14 15:20:55","updated_at":"2021-12-14 15:20:55"},"agency_name":"Tai Solarin University Of Education","revenue_code":"200050072112012001","revenue_name":"Medical & Laboratory Fees","payment_reference":"0088000014450_620ADE35C251D\\/1552","revenue_item_reference":"0088000014450_200050072112012001"}]',
  //   },
  //   { Name: "payment_code", Value: "0088000014450" },
  //   { Name: "environment", Value: "production" },
  // ];
  const GetMetatData = (metaData: any) => {
    try {
      if (Array.isArray(JSON.parse(metaData.Value))) {
        return (
          <>
            <span>{metaData.Value}</span>
          </>
        );
      }
    } catch (error) {
      return <>{metaData.Value}</>;
    }
  };

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
        <Form layout="vertical">
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Business Name">
                <Input value={props.transaction?.merchantName} readOnly />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Business Number">
                <Input value={props.transaction?.reference} readOnly />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Revenue Code">
                <Input
                  value={GetFieldColumnValue(
                    props.transaction?.metaData,
                    "revenue_code",
                    ""
                  )}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Amount">
                <Input value={props.transaction?.amount} readOnly />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Email">
                <Input value={props.transaction?.email} readOnly />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Masked pan">
                <Input value={props.transaction?.cardPan} readOnly />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Unique Key">
                <Input value={props.transaction?.id} readOnly />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Brand">
                <Input value={props.transaction?.brand} readOnly />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Account Number">
                <Input value={props.transaction?.accountNumber} readOnly />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Account Name">
                <Input value={props.transaction?.accountName} readOnly />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Provider">
                <Input value={props.transaction?.processor} readOnly />
              </Form.Item>
            </Col>

            <Col className="gutter-row" span={12}>
              <Form.Item label="Card Type">
                <Input value={props.transaction?.cardType} readOnly />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Payment Response Code">
                <Input
                  value={props.transaction?.paymentResponseCode}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item label="Payment Response Message">
                <Input
                  value={props.transaction?.paymentResponseMessage}
                  readOnly
                />
              </Form.Item>
            </Col>
            {!props.transaction?.productId?.includes("[{") && (
              <Col className="gutter-row" span={12}>
                <Form.Item label="Product Code">
                  <Input value={props.transaction?.productId} readOnly />
                </Form.Item>
              </Col>
            )}
            {props.transaction?.firstname && (
              <Col className="gutter-row" span={12}>
                <Form.Item label="First Name">
                  <Input value={props.transaction?.firstname} readOnly />
                </Form.Item>
              </Col>
            )}
            {props.transaction?.lastname && (
              <Col className="gutter-row" span={12}>
                <Form.Item label="Last Name">
                  <Input value={props.transaction?.lastname} readOnly />
                </Form.Item>
              </Col>
            )}
            {props.transaction?.organization && (
              <Col className="gutter-row" span={12}>
                <Form.Item label="Organization">
                  <Input value={props.transaction?.organization} readOnly />
                </Form.Item>
              </Col>
            )}
            {props.transaction?.address && (
              <Col className="gutter-row" span={12}>
                <Form.Item label="Address">
                  <Input value={props.transaction?.address} readOnly />
                </Form.Item>
              </Col>
            )}
            <Col className="gutter-row" span={12}>
              <Form.Item label="Product Description">
                <Input
                  value={GetFieldColumnValue(
                    props.transaction?.metaData,
                    "product_description",
                    props.transaction?.productDescription as string
                  )}
                  readOnly
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <span style={{ fontWeight: "bold" }}>Meta Data</span>
        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <List
              size="small"
              header={
                <Row>
                  <Col md={8}>
                    <strong>Name</strong>
                  </Col>
                  <Col md={14}>
                    <strong>Values</strong>
                  </Col>
                </Row>
              }
              bordered
              dataSource={
                Array.isArray(props.transaction?.metaData)
                  ? formatMetaData(props.transaction?.metaData)
                  : []
              }
              renderItem={(item: any) => (
                <List.Item>
                  <Row style={{ width: "100%" }}>
                    <Col md={8}>
                      <span style={{ fontWeight: 700 }}>{item.Name}</span>
                    </Col>
                    <Col md={14}>{GetMetatData(item)}</Col>
                  </Row>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default ReportModal;
