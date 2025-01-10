import React from "react";
import { ValidateReceipt } from "./merchants/transactions/validateReceipt";

export const Receipt = () => {
  return (
    <div className="merchant-receipt" >
      <ValidateReceipt hideLayout={true}/>
    </div>
  );
};
