import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function RoleRoute({ children, allowed = [] }) {
  const { user, superUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/auth/login" replace />;

  const role = superUser?.role || user?.role || user?.roles;
  // supported: allowed = ["admin"] or ["doctor","admin"]

  if (!allowed.includes(role)) {
    // تقدر تغير الوجهة علي راحتك )
    return <Navigate to="/" replace />;
  }

  return children;
}
