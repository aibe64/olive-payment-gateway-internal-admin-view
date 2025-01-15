import React from "react";
import { XpressSideBar } from "./sideBar";
import "./style.css";
import { TopBar } from "./topBar";
import cbn from "../../images/cbn.svg";

export const XpressLayout = ({ children }: any) => {
  return (
    <section className="flex mx-auto max-w-screen-2x">
      <XpressSideBar />
      <main className="flex flex-col">
        <TopBar />
        {children}
      </main>
    </section>
  );
};
