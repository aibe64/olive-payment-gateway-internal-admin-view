import { Card, Col, Row } from "antd";
import React from "react";
import { XpressLayout } from "../../../shared/layout";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const AdminDashboard = () => {
  const data = [
    {
      name: "Page A",
      uv: 590,
      pv: 800,
      amt: 1400,
    },
    {
      name: "Page B",
      uv: 868,
      pv: 967,
      amt: 1506,
    },
    {
      name: "Page C",
      uv: 1397,
      pv: 1098,
      amt: 989,
    },
    {
      name: "Page D",
      uv: 1480,
      pv: 1200,
      amt: 1228,
    },
    {
      name: "Page E",
      uv: 1520,
      pv: 1108,
      amt: 1100,
    },
    {
      name: "Page F",
      uv: 1400,
      pv: 680,
      amt: 1700,
    },
  ];
  const data2 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <XpressLayout>
      <section>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ width: "100%", marginTop: 40, }}
        >
          <Col className="gutter-row" span={4} style={{marginLeft:'7%'}}>
            <div style={{ border: "1px solid green", borderRadius: 5 }}>
              <div style={{ marginTop: 15, marginLeft: 15 }}>
                <span style={{ color: "green" }}>Successful</span>
              </div>
              <div style={{ marginLeft: 15, color: "#575F6E" }}>(258)</div>
              <div
                style={{
                  marginTop: 20,
                  textAlign: "center",
                  borderTop: "1px solid green",
                  width: "100%",
                  fontWeight: 800,
                }}
              >
                <p>NGN 250,000</p>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div style={{ border: "1px solid #FFBE21", borderRadius: 5 }}>
              <div style={{ marginTop: 15, marginLeft: 15 }}>
                <span style={{ color: "#FFBE21" }}>Pending</span>
              </div>
              <div style={{ marginLeft: 15, color: "#575F6E" }}>(258)</div>
              <div
                style={{
                  marginTop: 20,
                  textAlign: "center",
                  borderTop: "1px solid #FFBE21",
                  width: "100%",
                  fontWeight: 800,
                }}
              >
                <p>NGN 250,000</p>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div style={{ border: "1px solid #575F6E", borderRadius: 5 }}>
              <div style={{ marginTop: 15, marginLeft: 15 }}>
                <span style={{ color: "#575F6E" }}>Abadoned</span>
              </div>
              <div style={{ marginLeft: 15, color: "#575F6E" }}>(258)</div>
              <div
                style={{
                  marginTop: 20,
                  textAlign: "center",
                  borderTop: "1px solid #575F6E",
                  width: "100%",
                  fontWeight: 800,
                }}
              >
                <p>NGN 250,000</p>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div style={{ border: "1px solid #F3722C", borderRadius: 5 }}>
              <div style={{ marginTop: 15, marginLeft: 15 }}>
                <span style={{ color: "#F3722C" }}>Abadoned</span>
              </div>
              <div style={{ marginLeft: 15, color: "#575F6E" }}>(258)</div>
              <div
                style={{
                  marginTop: 20,
                  textAlign: "center",
                  borderTop: "1px solid #F3722C",
                  width: "100%",
                  fontWeight: 800,
                }}
              >
                <p>NGN 250,000</p>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div style={{ border: "1px solid #F94144", borderRadius: 5 }}>
              <div style={{ marginTop: 15, marginLeft: 15 }}>
                <span style={{ color: "#F94144" }}>Abadoned</span>
              </div>
              <div style={{ marginLeft: 15, color: "#575F6E" }}>(258)</div>
              <div
                style={{
                  marginTop: 20,
                  textAlign: "center",
                  borderTop: "1px solid #F94144",
                  width: "100%",
                  fontWeight: 800,
                }}
              >
                <p>NGN 250,000</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ width: "100%", marginTop: 40,  }}
        >
          <Col className="gutter-row" span={14} style={{marginLeft: "7%"}}>
            <Card bordered style={{borderRadius:5}}>
                <div style={{fontWeight:600, marginLeft:25}}>Daily Transactions</div>
              <ComposedChart
                layout="vertical"
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" scale="band" />
                <Tooltip />
                <Legend />
                <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                <Line dataKey="uv" stroke="#ff7300" />
              </ComposedChart>
            </Card>
          </Col>
          <Col className="gutter-row" span={7} style={{marginRight:30}}>
            <Card bordered style={{background:'white'}}>
            <div style={{fontWeight:600, textAlign:'center'}}>Transaction Summary</div>
              <div style={{marginLeft:20, marginTop:-10}}>
                <PieChart width={400} height={400}>
                  <Pie
                    data={data2}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={110}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data2.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </Card>
          </Col>
        </Row>
      </section>
    </XpressLayout>
  );
};
