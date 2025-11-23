import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoutes from "../Features/Admin/Routes/AdminRoutes";
import DoctorRoutes from "../Features/Doctor/Routes/DoctorRoutes";
import ReceptionistRoutes from "../Features/Receptionist/Routes/ReceptionistRoutes";
import PatientRoutes from "../Features/Patient//Routes/PatientRoutes";
import HomeRoutes from "../Features/Home/Routes/HomeRoutes";
import AuthRoutes from "../Features/Auth/Routes/AuthRoutes";
import DebugSystem from "../DebugSystem";

export default function App() {
  return (
    <>
      {/* <DebugSystem /> */}

      <Routes>
        <Route path="/*" element={<HomeRoutes />} />

        <Route path="auth/*" element={<AuthRoutes />} />

        <Route path="admin/*" element={<AdminRoutes />} />
        <Route path="doctor/*" element={<DoctorRoutes />} />
        <Route path="receptionist/*" element={<ReceptionistRoutes />} />
        <Route path="patient/*" element={<PatientRoutes />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
