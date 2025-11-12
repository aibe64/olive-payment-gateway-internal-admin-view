import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import "./App.css";
import { LazyLoader, PageLoader, OliveModal } from "@/components";
import { AppRoutes } from "./routes";

function App() {
  return (
    <Suspense
      fallback={
        <>
          <PageLoader />
          <LazyLoader />
        </>
      }
    >
      <AppRoutes />
      <ToastContainer />
      <OliveModal />
    </Suspense>
  );
}

export default App;
