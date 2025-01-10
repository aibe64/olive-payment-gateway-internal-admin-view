import React, { Suspense } from "react";
import "./index.css";
import "antd/dist/antd.min.css";
import { PageRouter } from "./shared/components/pageRouter";
import { XpressLoader } from "./shared/components/loader";
import IdleTimer from "./shared/components/idleTime";

function App() {
  return (
    <Suspense fallback={<XpressLoader />}>
      <IdleTimer />
      <section className="xpress-container">
        <PageRouter />
      </section>
    </Suspense>
  );
}

export default App;
