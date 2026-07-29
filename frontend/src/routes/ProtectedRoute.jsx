import { Navigate } from "react-router-dom";
import { getRoleFromToken } from "../utils/role.js";

export default function ProtectedRoute({ children }) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const role = getRoleFromToken(token);
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/client" replace />;
  }

  return children;
}
