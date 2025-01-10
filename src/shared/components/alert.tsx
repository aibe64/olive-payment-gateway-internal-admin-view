import React from "react";
import { Props } from "../../models/application/props";
import { Alert } from "antd";

const Notification: React.FC<Props.AlertProps> = (props) => {
  let alert = props.alert;
  return (
    <>
      {alert?.show ? (
        <Alert
          message={alert.message}
          type={alert.type === "error" ? "error" : "success"}
          showIcon
          closable
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Notification;
