import { Format } from "@/lib";
import { APIResponse } from "@/models";
import React from "react";
interface Props {
  transaction: APIResponse.SplitTransaction;
}

export const SplitAccountGroupCell: React.FC<Props> = ({ transaction }) => {
  const group = transaction?.SplitAccountGroup;

  return (
    <div>
      <strong>{group.groupName}</strong>
      <ul className="mt-1 text-sm text-gray-600 space-y-1">
        {group.SplitAccounts.map((sub, idx) => (
          <li key={sub.id || idx}>
            {sub.accountNumber} ({sub.bankName}) —{" "}
            <span className="text-[#FF6D00] font-medium">
              {sub.percentage ? `${sub.percentage}%` : "" }{" "}
              {sub.amount && sub.amount > 0
                ? `/ ${Format.toNaira(sub.amount?.toString() ?? "0.00")}`
                : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
