import { AppConfig } from "@/config";
import { Typography } from "antd";

export const LazyLoader: React.FC = () => {
  document.title = `${AppConfig.APP_NAME}${AppConfig.APP_DESCRIPTION}`
  return (
    <div className="grid place-content-center gap-3 h-screen">
      <span className="loader mx-auto"></span>
      <Typography>Loading...</Typography>
    </div>
  );
};
