import React from "react";
import { DatePicker, Input, Select, Form, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
// import moment from "moment";
import { Props } from "../../../../models/application/props";
import { usePageValidation } from "../../../../shared/hooks/usePageValidation";
const { RangePicker } = DatePicker;
const { Option } = Select;
const Header: React.FC<Props.ReportHeader> = (props) => {
  const dateFormat = "DD-MM-YYYY";
  const { canAccessOnRender } = usePageValidation("CanDownloadMerchantTransactions");
  return (
    <>
      <div className="merchant-trans-desktop">
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginLeft: 5, marginTop: 20, width: "100%" }}
        >
          <Col span={6} className="gutter-row">
            <Input
              style={{ width: "100%" }}
              addonBefore={<SearchOutlined className="site-form-item-icon" />}
              onChange={(e) => props.Search(e.target.value, "all")}
            />
          </Col>
          <Col className="gutter-row" span={6}>
            <RangePicker
              style={{ height: 20 }}
              // ranges={{
              //   Today: [moment(), moment()],
              //   "This Month": [
              //     moment().startOf("month"),
              //     moment().endOf("month"),
              //   ],
              // }}
              onChange={props.onChangeDateRange}
              format={dateFormat}
            />
          </Col>
          <Col className="gutter-row" span={12} style={{ float: "right" }}>
            {props.isMerchant ? (
              canAccessOnRender ? (
                // <ExcelExport
                //   download={props.download}
                //   downloading={props.downloading}
                //   fileName={props.excelData?.fileName}
                //   title={props.excelData?.title}
                //   rows={props.excelData?.rows}
                //   column={props.excelData?.column}
                //   buttonName={"Download"}
                // />
                <></>
              ) : (
                ""
              )
            ) : (
              // <ExcelExport
              //   download={props.download}
              //   downloading={props.downloading}
              //   fileName={props.excelData?.fileName}
              //   title={props.excelData?.title}
              //   rows={props.excelData?.rows}
              //   column={props.excelData?.column}
              //   buttonName={"Download"}
              // />
              <></>
            )}

            {!props.disableMerchant ? (
              // <ExcelExport
              //   downloadMetaData={props.downloadMetaData}
              //   downloading={props.downloading}
              //   fileName={props.excelMetaData?.fileName}
              //   title={props.excelMetaData?.title}
              //   rows={props.excelMetaData?.rows}
              //   column={props.excelMetaData?.column}
              //   buttonName={"Download Additional Info"}
              // />
              <></>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginLeft: 5, marginTop: 5, width: "100%" }}
        >
          <Col className="gutter-row" span={5}>
            <Form layout="vertical">
              <Form.Item label="Status">
                <Select
                  onChange={(e) =>
                    props.Search(e?.toString() as string, "status")
                  }
                  defaultValue="All"
                  style={{ width: "100%" }}
                >
                  <Option value="00">Successful</Option>
                  <Option value="02">Failed</Option>
                  <Option value="06">Pending</Option>
                </Select>
              </Form.Item>
            </Form>
          </Col>
          <Col className="gutter-row" span={5}>
            <Form layout="vertical">
              <Form.Item label="Payment Method">
                <Select
                  onChange={(e) =>
                    props.Search(e?.toString() as string, "paymentMethod")
                  }
                  defaultValue="All"
                  style={{ width: "100%" }}
                >
                  <Option value="Card">Card</Option>
                  <Option value="Account">Bank</Option>
                  <Option value="Transfer">Transfer</Option>
                  <Option value="ENaira">E-Naira</Option>
                </Select>
              </Form.Item>
            </Form>
          </Col>

          {props.disableMerchant ? (
            <Col span={5}>
              <Form layout="vertical">
                <Form.Item label="Currency">
                  <Select
                    onChange={(e) =>
                      props.Search(e?.toString() as string, "currency")
                    }
                    defaultValue="All"
                    style={{ width: "100%" }}
                  >
                    <Option value="NGN">Naira</Option>
                    <Option value="USD">Dollar</Option>
                    <Option value="GBP">Pounds</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Col>
          ) : (
            <Col span={5}>
              <Form layout="vertical">
                <Form.Item label="Merchant">
                  <Select
                    onChange={(e) =>
                      props.Search(e?.toString() as string, "merchantId")
                    }
                    style={{ width: "100%" }}
                  >
                    {props.merchants?.map((x) => (
                      <Option value={x.id!?.toString()}>
                        {x.businessName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
            </Col>
          )}
          <Col span={4}>
            <Form layout="vertical">
              <Form.Item label="Customer Email">
                <Input
                  style={{ width: "100%", height: 40 }}
                  placeholder="Search Customer Email"
                  onChange={(e) => props.Search(e.target.value, "email")}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col span={4}>
            <Form layout="vertical">
              <Form.Item label="Xpress Reference">
                <Input
                  style={{ width: "125%", height: 40 }}
                  placeholder="Search Reference"
                  onChange={(e) => props.Search(e.target.value, "reference")}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
      <div className="merchant-trans-mobile">
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginLeft: 5, marginTop: 20, width: "100%" }}
        >
          <Col span={22} className="gutter-row">
            <Input
              style={{ width: "100%", marginLeft: 10 }}
              addonBefore={<SearchOutlined className="site-form-item-icon" />}
              onChange={(e) => props.Search(e.target.value, "all")}
            />
          </Col>
          <Col
            className="gutter-row"
            span={9}
            style={{ marginTop: 10, marginLeft: 10 }}
          >
            <Form layout="vertical">
              <Form.Item label="Status">
                <Select
                  onChange={(e) =>
                    props.Search(e?.toString() as string, "status")
                  }
                  defaultValue="All"
                  style={{ width: "100%" }}
                >
                  <Option value="00">Successful</Option>
                  <Option value="02">Failed</Option>
                  <Option value="06">Pending</Option>
                </Select>
              </Form.Item>
            </Form>
          </Col>
          <Col className="gutter-row" span={12} style={{ marginTop: 40 }}>
            <RangePicker
              style={{ height: 20 }}
              // ranges={{
              //   Today: [moment(), moment()],
              //   "This Month": [
              //     moment().startOf("month"),
              //     moment().endOf("month"),
              //   ],
              // }}
              onChange={props.onChangeDateRange}
              format={dateFormat}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Header;
