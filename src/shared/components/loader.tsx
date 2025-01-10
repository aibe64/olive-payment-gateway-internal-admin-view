/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Progress, Row } from "antd";
import { useMemo, useState } from "react";
import logo from "../../images/logo.svg";
import "../components/style.css";
export const XpressLoader: React.FC = (props) => {
  const [percent, setPercent] = useState(0);
  const setState = () => {
    for (var i = 1; i <= 100; i++) {
      var tick = function (percent: number) {
        return function () {
          setPercent(percent);
        };
      };
      setTimeout(tick(i), 100 * i);
    }
  };
  useMemo(() => {
    setState();
  }, []);
  return (
    <Row  className="home_page_loader_div">
      <Col span={24}>
        <img src={logo} style={{ width: "40px", marginBottom: 10 }} alt="" />{" "}
        <span className="loader_logo_title">
          Xpress<span style={{ color: "rgb(230, 108, 23)" }}>Pay</span>
        </span>
      </Col>
      <Col span={24}>
        <Progress percent={percent} status="active" showInfo={false} />
      </Col>
    </Row>
  );
};
