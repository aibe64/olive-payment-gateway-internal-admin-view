import { notification } from "antd";
import { CheckmarkIcon, CloseIcon, WarningAlertIcon } from "@/assets";

export const Notify = (message: string, isSuccess: boolean) => {
  return notification.open({
    message: (
      <span style={{ color: "black", fontWeight: "600" }}>
        {isSuccess ? "Success" : "Error"}
      </span>
    ),
    duration: 5,
    description: <span style={{ color: "black" }}>{message}</span>,
    style: {
      background: "white",
      color: "black",
      borderRadius: 10,
    },
    closeIcon: <CloseIcon width={10} height={10} color={"#656565"} />,
    icon: !isSuccess ? (
      <div
        style={{
          padding: "4px",
          backgroundColor: "rgba(255,0,0,10%)",
          borderRadius: "100%",
        }}
      >
        <WarningAlertIcon width={20} height={20} color={"#FF0000"} />
      </div>
    ) : (
      <div
        style={{
          padding: "4px",
          backgroundColor: "rgba(0,111,1,10%)",
          borderRadius: "100%",
        }}
      >
        <CheckmarkIcon width={16} height={16} />
      </div>
    ),
  });
};
