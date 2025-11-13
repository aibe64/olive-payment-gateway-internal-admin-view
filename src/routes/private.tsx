/* eslint-disable react-refresh/only-export-components */
import { HomeLayout, OliveProtectedRoutes } from "@/components";
import { ROUTE_PATH } from "@/models";
import { lazy } from "react";

const MerchantPage = lazy(() => import("@/features/Merchant"));
const TransactionPage = lazy(() => import("@/features/Payments/Transactions"));
// const StoreTransactionPage = lazy(() => import("@/features/Payments/Store"));
const SplitTransactionPage = lazy(() => import("@/features/Payments/SplitTransaction"));
// const MerchantApprovalPage = lazy(() => import("@/features/Approval/Merchant"));
const ProviderPage = lazy(() => import("@/features/Setup/Provider"));
const BinPage = lazy(() => import("@/features/Setup/Bin"));
const InstitutionPage = lazy(() => import("@/features/Setup/Institution"));
const PaymentMethodPage = lazy(() => import("@/features/Setup/PaymentMethod"));
// const OliveStorePage = lazy(() => import("@/features/Setup/OliveStore"));
// const RolesPage = lazy(() => import("@/features/ManageUsers/Roles"));
// const UsersPage = lazy(() => import("@/features/ManageUsers/Administrators"));
const ProfilePage = lazy(() => import("@/features/Settings"));
const UAuthorizedPage = lazy(() => import("@/features/UnAuthorize"));
const TransactionManagerPage = lazy(
  () => import("@/features/Setup/TransactionManager")
);
const Dashboard = lazy(() => import("@/features/Dashboard"));
const SplitAccountPage = lazy(() => import("@/features/Payments/SplitAccount"));
const SplitPaymentPage = lazy(
  () => import("@/features/Payments/SplitAccountGroup")
);
const NqrMerchantPage = lazy(() => import("@/features/NQR/Merchant"));
const NqrSubMerchantPage = lazy(() => import("@/features/NQR/SubMerchant"));
// const AuditTrailPage = lazy(() => import("@/features/AuditTrail"));

export const privateRoutes = [
  {
    element: (
      <OliveProtectedRoutes>
        <HomeLayout />
      </OliveProtectedRoutes>
    ),
    children: [
      {
        path: ROUTE_PATH.Dashboard,
        Component: Dashboard,
      },
      {
        path: ROUTE_PATH.Merchant,
        Component: MerchantPage,
      },
      // {
      //   path: ROUTE_PATH.MerchantApproval,
      //   Component: MerchantApprovalPage,
      // },
      {
        path: ROUTE_PATH.Transaction,
        Component: TransactionPage,
      },
      {
        path: ROUTE_PATH.SplitTransaction,
        Component: SplitTransactionPage,
      },
      // {
      //   path: ROUTE_PATH.Store,
      //   Component: StoreTransactionPage,
      // },
      {
        path: ROUTE_PATH.Provider,
        Component: ProviderPage,
      },
      // {
      //   path: ROUTE_PATH.OliveStore,
      //   Component: OliveStorePage,
      // },
      {
        path: ROUTE_PATH.Bin,
        Component: BinPage,
      },
      {
        path: ROUTE_PATH.Institution,
        Component: InstitutionPage,
      },
      {
        path: ROUTE_PATH.TransactionManager,
        Component: TransactionManagerPage,
      },
      {
        path: ROUTE_PATH.PaymentMethod,
        Component: PaymentMethodPage,
      },
      // {
      //   path: ROUTE_PATH.Roles,
      //   Component: RolesPage,
      // },
      // {
      //   path: ROUTE_PATH.Users,
      //   Component: UsersPage,
      // },
      {
        path: ROUTE_PATH.Profile,
        Component: ProfilePage,
      },
      {
        path: ROUTE_PATH.UnAuthorize,
        Component: UAuthorizedPage,
      },
      {
        path: ROUTE_PATH.SplitAccount,
        Component: SplitAccountPage,
      },
      {
        path: ROUTE_PATH.SplitAccountGroup,
        Component: SplitPaymentPage,
      },
      {
        path: ROUTE_PATH.QrMerchant,
        Component: NqrMerchantPage,
      },
      {
        path: ROUTE_PATH.QrSubMerchant,
        Component: NqrSubMerchantPage,
      },
      // {
      //   path: ROUTE_PATH.AuditTrail,
      //   Component: AuditTrailPage,
      // },
    ],
  },
];
