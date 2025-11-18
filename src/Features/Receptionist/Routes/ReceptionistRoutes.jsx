import React from "react";
import { Route, Routes } from "react-router";
import ReceptionistLayout from "../Layout/ReceptionistLayout";
import Dashboard from "../Pages/Dashboard";
import Appointments from "../Pages/Appointments";

export default function ReceptionistRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ReceptionistLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="appointments" element={<Appointments />} />
        {/* <Route path="create-appointment" element={<CreateAppointment />} /> */}
      </Route>
    </Routes>
  );
}
