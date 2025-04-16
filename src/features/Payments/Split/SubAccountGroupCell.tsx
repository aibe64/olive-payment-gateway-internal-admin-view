import { Format } from "@/lib";
import { APIResponse } from "@/models";
import React from "react";
interface Props {
  transaction: APIResponse.SplitTransaction;
}

export const SubAccountGroupCell: React.FC<Props> = ({ transaction }) => {
  const group = transaction?.subAccountGroup;

  if (!group) return <span className="text-gray-400 italic">No Split</span>;

  return (
    <div>
      <strong>{group.groupName}</strong>
      <ul className="mt-1 text-sm text-gray-600 space-y-1">
        {group.subAccounts.map((sub, idx) => (
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
