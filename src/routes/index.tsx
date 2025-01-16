import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { privateRoutes } from "./private";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

  return <RouterProvider router={router} />;
};
