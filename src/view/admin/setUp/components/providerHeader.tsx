import React from "react";
import { Row, Col, Button, Input } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Props } from "../../../../models/application/props";

const ProviderHeader: React.FC<Props.SetupHeaders> = (props) => {
  return (
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ marginLeft: 5, marginTop: 20, width: "100%" }}
      >
        <Col style={{}} md={12}>
          {props.showAddButton ? (
            <Button
              icon={<PlusOutlined style={{ color: "green" }} />}
              onClick={() => props.OpenCreateSetupMenuModal()}
              style={{
                backgroundColor: "#F8F8F8",
                border: "1px solid #2B872B",
                borderRadius: "4px",
                float: "left",
              }}
            >
              <span style={{ color: "#2B872B" }}>Add Provider</span>
            </Button>
          ) : (
            ""
          )}
        </Col>
        <Col className="gutter-row" span={12}>
          <Input
            style={{ width: 200, float: "right", marginRight: 5 }}
            onChange={(e) => props.Search(e.target.value)}
            type="text"
            placeholder="Search"
            addonBefore={<SearchOutlined className="site-form-item-icon" />}
          />
        </Col>
      </Row>
    </>
  );
};

export default ProviderHeader;
