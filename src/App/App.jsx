import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// Auth Pages
import Signup from "./../Features/Auth/Pages/signup.jsx";
import Login from "./../Features/Auth/Pages/Login.jsx";

// Admin Layout + Pages
import AdminLayout from "./../Features/Admin/Layout/Layout.jsx";
import Dashboard from "./../Features/Admin/Pages/Dashboard.jsx";
import Patients from "./../Features/Admin/Pages/Patients.jsx";
import CreateDoctor from "./../Features/Admin/Pages/CreateDoctor.jsx";
import CreateReceptionist from "../Features/Admin/Pages/CreateReceptionist.jsx";
import UsersManagement from "../Features/Admin/Pages/UsersManagement.jsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
    mutations: { retry: 1 },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="bottom-center" />

        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Nested Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="create-doctor" element={<CreateDoctor />} />
            <Route path="create-receptionist" element={<CreateReceptionist />} />
            <Route path="crud-users" element={<UsersManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
