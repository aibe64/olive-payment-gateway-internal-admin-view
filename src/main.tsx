import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProviderComponent } from "@/components";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "@/service";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
  <ThemeProviderComponent>
    <App />
  </ThemeProviderComponent>
  </Provider>
);
