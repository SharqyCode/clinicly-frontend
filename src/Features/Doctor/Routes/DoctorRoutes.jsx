import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../../Guards/ProtectedRoute";
import RoleRoute from "../../../Guards/RoleRoute";

import DoctorLayout from "../Layout/DoctorLayout";
import DiagnosisAI from "../Pages/DiagnosisAI";
import DoctorDash from "../Pages/DoctorDash";
import AppointmentsList from "../Pages/AppointmentsList";
import PatientsList from "../Pages/PatientsList";
import PrescriptionForm from "../Pages/PrescriptionForm";
import PrescriptionsList from "../Pages/PrescriptionsList";
import Profile from "../Pages/Profile";

export default function DoctorRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RoleRoute allowed={["doctor"]}>
              <DoctorLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<DoctorDash />} />
        <Route path="appointments" element={<AppointmentsList />} />
        <Route path="patients" element={<PatientsList />} />
        <Route path="assistant" element={<DiagnosisAI />} />
        <Route path="add-prescription" element={<PrescriptionForm />} />
        <Route path="read-prescriptions" element={<PrescriptionsList />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

