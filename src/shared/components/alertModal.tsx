import React from "react";
import { Modal, Button } from "antd";
import { Props } from "../../models/application/props";
import { CheckCircleOutlined,ExclamationCircleOutlined } from "@ant-design/icons";

const AlertModal: React.FC<Props.ModalAlertProps> = (props) => {
  return (
    <Modal
      style={{ borderRadius: "5px", width: "100px" }}
      title=""
      centered
      visible={props.show}
      onCancel={() => props.handleClose()}
      footer={null}
    >
      <div style={{ marginTop: "20px", fontSize: "16px", textAlign: "center" }}>
        {props.isSuccess ? (
          <> 
            <CheckCircleOutlined
              style={{ textAlign: "center", color: "green", fontSize:'25px' }}
            />
            <br />
          </>
        ) : (
          <>
          <ExclamationCircleOutlined
            style={{ textAlign: "center", color: "red", fontSize:'25px' }}
          />
          <br />
        </>
        )}
        {
          
          props.isApproved ?
          props.message :
          parseInt(props.noOfApproveditem!)  > 0 ?
          `You have successfully accepted ${props.noOfApproveditem}   KYC document(s) and rejected ${props.noOfDissapprovedItem}  KYC document(s).`
          : `You have successfully rejected ${props.noOfDissapprovedItem}  KYC document(s).`
        }
       
      </div>
      <div style={{ textAlign: "center" }}>
        <br />
        <Button
          style={{
            border: "none",
            background: "#2B872B",
            width: "68px",
            height: "35px",
          }}
          onClick={() => props.handleClose()}
        >
          <span style={{ color: "white" }}>Ok</span>
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
