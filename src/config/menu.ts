import { ApprovalIcon, HomeIcon, UserIcon } from "@/assets";
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
];
