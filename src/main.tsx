import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./service/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProviderComponent } from "./shared/components/ThemeProviderComponent";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProviderComponent>
        <App />
      </ThemeProviderComponent>
    </Provider>
  </QueryClientProvider>
);
