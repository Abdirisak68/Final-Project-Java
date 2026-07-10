import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoutes({ children, allowedRoles }) {
  const { token } = useAuth();
  const role = localStorage.getItem("role");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  // if(role ==="CUSTOMER"&& token){
  //   return <Navigate to="/my-bookings" replace />;
  // }

  return children;
}