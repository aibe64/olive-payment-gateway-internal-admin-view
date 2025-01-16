import { ROUTE_PATH } from "@/models";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes: React.FC<{ children: ReactNode }> = ({ children }) => {
  const token = "eygdgdgdgdggdgdggd";

  if (!token) {
    return <Navigate to={ROUTE_PATH.Landing} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
