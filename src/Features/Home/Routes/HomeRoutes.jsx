import React from "react";
import { Route, Routes } from "react-router";
import Layout from "../Layout/Layout";
import ClinicLandingPage from "../Pages/ClinicLandingPage";

export default function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ClinicLandingPage />} />
      </Route>
    </Routes>
  );
}
