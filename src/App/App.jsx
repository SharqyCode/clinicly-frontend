import { BrowserRouter, Route, Router, Routes } from "react-router";
import DoctorRoutes from "../Features/Doctor/Routes/DoctorRoutes";
import ReceptionistRoutes from "../Features/Receptionist/Routes/ReceptionistRoutes";
import AdminRoutes from "../Features/Admin/Routes/AdminRoutes";
import ClinicLandingPage from "../Features/Home/Pages/ClinicLandingPage";
import AuthRoutes from "../Features/Auth/Routes/AuthRoutes";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<ClinicLandingPage />} />
      <Route path="/doctor/*" element={<DoctorRoutes />} />
      <Route path="/receptionist/*" element={<ReceptionistRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
    </Routes>
  );
}

export default App;
