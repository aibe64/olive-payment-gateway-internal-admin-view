import { ROUTE_PATH } from "@/models";
import { lazy } from "react";

const LandingPage = lazy(() => import("@/features/LandingPage/index"));

export const publicRoutes = [
  {
    path: ROUTE_PATH.Landing,
    Component: LandingPage,
  },
];
