import React from "react";
import { Row, Col, Input } from "antd";
import "../style.css";
import { Props } from "../../../../models/application/props";
import { SearchOutlined } from "@ant-design/icons";
import ExcelExport from "../../../../shared/components/excelExport";

const FilterButtons: React.FC<Props.Header> = (props) => {
  return (
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ marginLeft: 5, marginTop: 20, width: "100%" }}
      >
        <Col className="gutter-row" span={24}>
          <ExcelExport
            fileName={props.excelData?.fileName}
            title={props.excelData?.title}
            rows={props.excelData?.rows}
            column={props.excelData?.column}
          />
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

export default FilterButtons;
