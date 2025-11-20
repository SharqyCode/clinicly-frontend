import { BrowserRouter, Route, Router, Routes } from "react-router";
import DoctorRoutes from "../Features/Doctor/Routes/DoctorRoutes";
import ReceptionistRoutes from "../Features/Receptionist/Routes/ReceptionistRoutes";
import AdminRoutes from "../Features/Admin/Routes/AdminRoutes";
import MyAppointments from "../Features/Patient/Pages/MyAppointments";
import MedicalRecords from "../Features/Patient/Pages/MedicalRecords";

function App() {
  return (
    <Routes>
      <Route path="/doctor/*" element={<DoctorRoutes />} />
      <Route path="/receptionist/*" element={<ReceptionistRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}

export default App;
