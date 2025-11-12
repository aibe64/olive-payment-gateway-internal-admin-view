import {
  ApprovalIcon,
  HomeIcon,
  PaymentIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "@/assets";
import AuditTrailIcon from "@/assets/AuditTrailIcon";
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
    label: "NQR",
    icon: SettingsIcon,
    children: [
      {
        label: "Merchant",
        path: ROUTE_PATH.QrMerchant,
      },
      {
        label: "Sub Merchant",
        path: ROUTE_PATH.QrSubMerchant,
      },
    ],
  },
  {
    label: "Manage Users",
    icon: UsersIcon,
    children: [
      {
        label: "Roles",
        path: ROUTE_PATH.Roles,
      },
      {
        label: "Administrators",
        path: ROUTE_PATH.Users,
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
        label: "Split",
        path: ROUTE_PATH.Split,
      },
      {
        label: "Store",
        path: ROUTE_PATH.Store,
      },
      {
        label: "Sub Account",
        path: ROUTE_PATH.SubAccount,
      },
      {
        label: "Sub Account Group",
        path: ROUTE_PATH.SubAccountGroup,
      },
    ],
  },
  {
    label: "Setup",
    icon: SettingsIcon,
    children: [
      {
        label: "Provider",
        path: ROUTE_PATH.Provider,
      },
      {
        label: "BIN",
        path: ROUTE_PATH.Bin,
      },
      {
        label: "Transaction Manager",
        path: ROUTE_PATH.TransactionManager,
      },
      {
        label: "Institutions",
        path: ROUTE_PATH.Institution,
      },
      {
        label: "Payment Methods",
        path: ROUTE_PATH.PaymentMethod,
      },
      {
        label: "Olive Store",
        path: ROUTE_PATH.OliveStore,
      },
    ],
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
    label: "Audit Trail",
    path: ROUTE_PATH.AuditTrail,
    icon: AuditTrailIcon,
  },
];
