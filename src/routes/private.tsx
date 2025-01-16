/* eslint-disable react-refresh/only-export-components */
import { HomeLayout, XpressProtectedRoutes } from "@/components";
import { ROUTE_PATH } from "@/models";
import { lazy } from "react";

const UserPage = lazy(() => import("@/features/User"));
const Dashboard = lazy(() => import("@/features/Dashboard"));

export const privateRoutes = [
  {
    element: (
      <XpressProtectedRoutes>
        <HomeLayout />
      </XpressProtectedRoutes>
    ),
    children: [
      // {
      //   path: ROUTE_PATH.GetStarted,
      //   Component: GetStarted,
      // },
      {
        path: ROUTE_PATH.Dashboard,
        Component: Dashboard,
      },
      {
        path: ROUTE_PATH.Users,
        Component: UserPage,
      },
    ],
  },
];
