import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProviderComponent } from "@/components";
import "./index.css";
import { Provider } from "react-redux";
import { store, apolloClient } from "@/service";
import { ApolloProvider } from "@apollo/client";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <ThemeProviderComponent>
        <App />
      </ThemeProviderComponent>
    </ApolloProvider>
  </Provider>
);
