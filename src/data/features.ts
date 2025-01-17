import { ROUTE_PATH, SearchData } from "@/models";
import {
  UserOutlined,
  SettingOutlined,
  ShopOutlined,
  MoneyCollectOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

export const featuresData: Array<SearchData> = [
  {
    menuName: "Get Started",
    redirectTo: ROUTE_PATH.GetStarted,
    icon: UserOutlined,
    details: [
      {
        id: 1,
        featureName: "Update KYC",
        redirectTo: ROUTE_PATH.GetStarted,
      },
      {
        id: 2,
        featureName: "API documentation",
        redirectTo: ROUTE_PATH.GetStarted,
      },
      {
        id: 3,
        featureName: "Private key",
        redirectTo: ROUTE_PATH.GetStarted,
      },
      {
        id: 4,
        featureName: "Public Key",
        redirectTo: ROUTE_PATH.GetStarted,
      },
    ],
  },
  {
    menuName: "Settings",
    redirectTo: ROUTE_PATH.Settings,
    icon: SettingOutlined,
    details: [
      {
        id: 1,
        featureName: "Update Public Key",
        redirectTo: ROUTE_PATH.GetStarted,
      },
      {
        id: 2,
        featureName: "Update Private Key",
        redirectTo: ROUTE_PATH.Keys,
      },
      {
        id: 3,
        featureName: "Profile Information",
        redirectTo: ROUTE_PATH.Settings,
      },
      {
        id: 4,
        featureName: "Business Information",
        redirectTo: ROUTE_PATH.BusinessDetails,
      },
      {
        id: 5,
        featureName: "Team",
        redirectTo: ROUTE_PATH.Settings,
      },
      {
        id: 6,
        featureName: "Roles and Permissions",
        redirectTo: ROUTE_PATH.Roles,
      },
    ],
  },
  {
    menuName: "Store",
    redirectTo: ROUTE_PATH.Shipping,
    icon: ShopOutlined,
    details: [
      {
        id: 1,
        featureName: "Shipping Region",
        redirectTo: ROUTE_PATH.Shipping,
      },
      {
        id: 2,
        featureName: "Storefront",
        redirectTo: ROUTE_PATH.StoreFront,
      },
      {
        id: 3,
        featureName: "Product",
        redirectTo: ROUTE_PATH.Product,
      },
      {
        id: 4,
        featureName: "Category",
        redirectTo: ROUTE_PATH.Category,
      },
      {
        id: 5,
        featureName: "Discount",
        redirectTo: ROUTE_PATH.DiscountCode,
      },
      {
        id: 6,
        featureName: "Overview",
        redirectTo: ROUTE_PATH.Overview,
      },
    ],
  },
  {
    menuName: "Commerce",
    redirectTo: ROUTE_PATH.PaymentLink,
    icon: MoneyCollectOutlined,
    details: [
      {
        id: 1,
        featureName: "Payment Link",
        redirectTo: ROUTE_PATH.PaymentLink,
      },
      {
        id: 2,
        featureName: "Invoice",
        redirectTo: ROUTE_PATH.Invoice,
      },
    ],
  },
  {
    menuName: "Payments",
    redirectTo: ROUTE_PATH.Transactions,
    icon: MoneyCollectOutlined,
    details: [
      {
        id: 1,
        featureName: "Transactions",
        redirectTo: ROUTE_PATH.Transactions,
      },
      {
        id: 2,
        featureName: "Store Transactions",
        redirectTo: ROUTE_PATH.StoreTransaction,
      },
      {
        id: 3,
        featureName: "Customers",
        redirectTo: ROUTE_PATH.Customers,
      },
      {
        id: 4,
        featureName: "Validate Receipt",
        redirectTo: ROUTE_PATH.ValidateReceipt,
      },
      {
        id: 6,
        featureName: "Sub-Account",
        redirectTo: ROUTE_PATH.SubAccount,
      },
      {
        id: 7,
        featureName: "Split Payment",
        redirectTo: ROUTE_PATH.SubAccountGroup,
      },
      {
        id: 2,
        featureName: "Orders",
        redirectTo: ROUTE_PATH.Orders,
      },
    ],
  },
  {
    menuName: "Dashboard",
    redirectTo: ROUTE_PATH.Dashboard,
    icon: DashboardOutlined,
    details: [
      {
        id: 1,
        featureName: "Dashboard",
        redirectTo: ROUTE_PATH.Dashboard,
      },
    ],
  },
];
