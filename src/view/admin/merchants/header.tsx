import { Button, Col, Input, Row } from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import React from "react";

export const MerchantHeader = () => {
  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      style={{ marginTop: 10, marginLeft: 20, marginRight: 5 }}
    >
      <Col className="gutter-row" span={16}></Col>
      <Col style={{ marginRight: 47 }} className="gutter-row" span={5}>
        <Input
          style={{}}
          placeholder="Search"
          prefix={
            <SearchOutlined
              style={{ color: "black" }}
              className="site-form-item-icon"
            />
          }
        />
      </Col>
      <Col className="gutter-row" span={2}>
        <Button
          icon={<DownloadOutlined />}
          style={{
            backgroundColor: "#006F01",
            border: "none",
            borderRadius: "4px",
            color: "white",
            float: "right",
          }}
        >
          Download
        </Button>
      </Col>
    </Row>
  );
};
