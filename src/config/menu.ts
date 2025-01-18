import { ApprovalIcon, HomeIcon, PaymentIcon, UserIcon } from "@/assets";
import { Props, ROUTE_PATH } from "@/models";

export const menuList: Props.MenuListProps[] = [
  {
    label: "Dashboard",
    path: ROUTE_PATH.Dashboard,
    icon: HomeIcon,
  },
  {
    label: "Merchants",
    path: ROUTE_PATH.Merchant,
    icon: UserIcon,
  },
  {
    label: "Approval",
    icon: ApprovalIcon,
    children: [
      {
        label: "Merchant",
        path: ROUTE_PATH.MerchantApproval,
      },
    ],
  },
  {
    label: "Payments",
    icon: PaymentIcon,
    children: [
      {
        label: "Transaction",
        path: ROUTE_PATH.Transaction,
      },
      {
        label: "Store",
        path: ROUTE_PATH.Store,
      },
    ],
  },
];
