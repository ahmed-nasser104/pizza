import { Navigate } from "react-router-dom";
import { getRoleFromToken } from "../utils/role.js";

export default function GuestRoute({ children }) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) return children;

  const role = getRoleFromToken(token);

  if (!role) {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    return children;
  }

  return <Navigate to={role === "admin" ? "/admin" : "/client"} replace />;
}
