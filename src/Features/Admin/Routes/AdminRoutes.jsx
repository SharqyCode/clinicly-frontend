import React from "react";
import { Routes, Route } from "react-router";
import CreateDoctor from "../Pages/CreateDoctor";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreateDoctor />} />
    </Routes>
  );
}
