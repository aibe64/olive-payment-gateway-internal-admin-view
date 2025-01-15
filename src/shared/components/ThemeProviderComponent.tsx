import {
  createContext,
  useContext,
  ReactNode,
} from "react";
import { ConfigProvider, ThemeConfig } from "antd";

interface MyComponentProps {
  children: ReactNode;
}

interface ThemeContextType {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
}

const defaultValue: ThemeContextType = {
  themeMode: "light",
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

// Helper functions

export const ThemeProviderComponent: React.FC<MyComponentProps> = ({
  children,
}) => {
  const antdTheme: ThemeConfig = {
    token: {
      colorPrimary: "#006F01",
    },
    components: {
      Button: {
        paddingBlock: 20,
        paddingInline: 20,
      },
      Segmented: {
        itemSelectedBg: "#006F01",
        itemSelectedColor: "#FFFFFF",
        itemColor: "#006F01",
      },
      Input: {
        controlHeight: 40,
        colorBorder: "#E8E8E8",
      },
      Select: {
        controlHeight: 40,
        boxShadow: "none",
        controlOutline: "none",
      },
      Table: {
        fontSize: 12,
        headerBg: "#F9FBF9",
        borderColor: "#F1F1F1",
        headerColor: "black",
      },
      Checkbox: {
        borderRadiusSM: 10,
      },
    },
  };

  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
};
