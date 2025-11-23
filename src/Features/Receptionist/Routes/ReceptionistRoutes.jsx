
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../../Guards/ProtectedRoute";
import RoleRoute from "../../../Guards/RoleRoute";

import ReceptionistLayout from "../Layout/ReceptionistLayout";
import Dashboard from "../Pages/Dashboard";
import Appointments from "../Pages/Appointments";
import Billing from "../Pages/Billing";
import QueueManager from "../Pages/QueueManager";

export default function ReceptionistRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RoleRoute allowed={["receptionist"]}>
              <ReceptionistLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="queue" element={<QueueManager />} />
        <Route path="billing" element={<Billing />} />
      </Route>
    </Routes>
  );
}
