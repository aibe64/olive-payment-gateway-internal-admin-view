/* eslint-disable react-refresh/only-export-components */
import { HomeLayout, XpressProtectedRoutes } from "@/components";
import { ROUTE_PATH } from "@/models";
import { lazy } from "react";

const MerchantPage = lazy(() => import("@/features/Merchant"));
const TransactionPage = lazy(() => import("@/features/Payments/Transactions"));
const StoreTransactionPage = lazy(() => import("@/features/Payments/Store"));
const MerchantApprovalPage = lazy(() => import("@/features/Approval/Merchant"));
const ProviderPage = lazy(() => import("@/features/Setup/Provider"));
const BinPage = lazy(() => import("@/features/Setup/Bin"));
const InstitutionPage = lazy(() => import("@/features/Setup/Institution"));
const RolesPage = lazy(() => import("@/features/ManageUsers/Roles"));
const UsersPage = lazy(() => import("@/features/ManageUsers/Administrators"));
const ProfilePage = lazy(() => import("@/features/Settings"));
const TransactionManagerPage = lazy(
  () => import("@/features/Setup/TransactionManager")
);
const Dashboard = lazy(() => import("@/features/Dashboard"));

export const privateRoutes = [
  {
    element: (
      <XpressProtectedRoutes>
        <HomeLayout />
      </XpressProtectedRoutes>
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
      {
        path: ROUTE_PATH.MerchantApproval,
        Component: MerchantApprovalPage,
      },
      {
        path: ROUTE_PATH.Transaction,
        Component: TransactionPage,
      },
      {
        path: ROUTE_PATH.Store,
        Component: StoreTransactionPage,
      },
      {
        path: ROUTE_PATH.Provider,
        Component: ProviderPage,
      },
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
        path: ROUTE_PATH.Roles,
        Component: RolesPage,
      },
      {
        path: ROUTE_PATH.Users,
        Component: UsersPage,
      },
      {
        path: ROUTE_PATH.Profile,
        Component: ProfilePage,
      },
    ],
  },
];
