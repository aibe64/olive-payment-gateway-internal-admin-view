import {notification } from "antd";
import { WifiOutlined } from "@ant-design/icons";

export const InternetErrorNotification = () => {
  return notification.open({
    message: "Network Error",
    description:
      "Slow network or Service unreachable. Please check your internet connection",
    icon: <WifiOutlined style={{ color: "red" }} />, 
  });
};
