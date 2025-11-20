import React from "react";
import { Route, Routes } from "react-router";
import DoctorLayout from "../Layout/DoctorLayout";
import DiagnosisAI from "../Pages/DiagnosisAI";
import DoctorDash from "../Pages/DoctorDash";

export default function DoctorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DoctorLayout />}>
        <Route path="dashboard" element={<DoctorDash />} />
        <Route path="assistant" element={<DiagnosisAI />} />
      </Route>
    </Routes>
  );
}
