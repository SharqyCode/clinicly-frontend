import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; 

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // أثناء التحميل اعرض حاجة بسيطة
  if (loading) return <div>Loading...</div>;

  // لو مفيش user يحول للصفحة بتاعة login
  if (!user) return <Navigate to="/auth/login" replace />;

  return children;
}
