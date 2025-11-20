import React from "react";
import { Route, Routes } from "react-router";
import ReceptionistLayout from "../Layout/ReceptionistLayout";
import Dashboard from "../Pages/Dashboard";
import Appointments from "../Pages/Appointments";
import Queue from "../Pages/Queue";

export default function ReceptionistRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ReceptionistLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="queue" element={<Queue />} />
      </Route>
    </Routes>
  );
}
