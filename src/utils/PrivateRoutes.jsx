import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
export const PrivateRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
