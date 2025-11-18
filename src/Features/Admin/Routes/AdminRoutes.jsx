import { Route } from "lucide-react";
import React from "react";
import { Routes } from "react-router";
import CreateDoctor from "../Pages/CreateDoctor";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route path="create-doctor" element={<CreateDoctor />} />
      </Route>
    </Routes>
  );
}
