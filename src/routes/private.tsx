/* eslint-disable react-refresh/only-export-components */
import { HomeLayout, XpressProtectedRoutes } from "@/components";
import { ROUTE_PATH } from "@/models";
import { lazy } from "react";

const MerchantPage = lazy(() => import("@/features/Merchant"));
const TransactionPage = lazy(() => import("@/features/Payments/Transactions"));
const StoreTransactionPage = lazy(() => import("@/features/Payments/Store"));
const MerchantApprovalPage = lazy(() => import("@/features/Approval/Merchant"));
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
    ],
  },
];
