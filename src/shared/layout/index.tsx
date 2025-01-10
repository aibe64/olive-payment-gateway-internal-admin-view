import React from "react";
import { XpressSideBar } from "./sideBar";
import "./style.css";
import { TopBar } from "./topBar";
import cbn from "../../images/cbn.svg";

export const XpressLayout = ({ children }: any) => {
  return (
    <section className="xpress-pay-container">
      <XpressSideBar />
      <main className="xpress-pay-page-body">
        <TopBar />
        {children}
        {/* <footer className="pg-footer" style={{ textAlign: "center" }}>
          © Copyright Xpresspayments Limited
        </footer> */}
        <footer
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "85%",
            margin: "0 auto",
            marginTop: -20,
          }}
        >
          <img src={cbn} alt="" style={{ width: "80%", height: "20px" }} />
        </footer>
      </main>
    </section>
  );
};
