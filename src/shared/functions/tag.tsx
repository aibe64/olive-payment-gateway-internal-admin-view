/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import MerchantApprovalIcon from "../../images/icons/MerchantApprovalIcon.svg";
import DisapproveIcon from "../../images/icons/DisapproveIcon.svg";
import { TransactionOutlined, RedoOutlined,EyeOutlined } from "@ant-design/icons";
import { Tag } from "antd";
export function UserStatus(status: any) {
  return (
    <React.Fragment>
      {status ? (
        <img src={MerchantApprovalIcon} alt={""} />
      ) : (
        <img src={DisapproveIcon} alt={""} />
      )}
    </React.Fragment>
  );
}

export const tag = (isSubsription: boolean) => {
  if (isSubsription) {
    return (
      <Tag icon={<RedoOutlined />} color="rgb(58 182 130)">
        Subscription
      </Tag>
    );
  } else {
    return (
      <Tag icon={<TransactionOutlined />} color="rgb(214 106 43)">
        Payment
      </Tag>
    );
  }
};
export const linkTag = (paymentLink: string) => {
  return (
    <a
      style={{ textDecoration: "underline", color:'black' }}
      href={paymentLink}
      target="_blank"
    >
      {" "}
       Preview{" "}<EyeOutlined />
    </a>
  );
};
export const stokTag = (isUnlimited: boolean, inStock: number) => {
  if (isUnlimited) {
    return (
      <Tag icon={<RedoOutlined />} color="rgb(58 182 130)">
        Unlimited
      </Tag>
    );
  } else {
    return (
      <Tag icon={<TransactionOutlined />} color="rgb(214 106 43)">
        {inStock} in stock
      </Tag>
    );
  }
};
