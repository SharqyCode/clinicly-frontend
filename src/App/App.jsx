import { BrowserRouter, Route, Router, Routes } from "react-router";
import DoctorRoutes from "../Features/Doctor/Routes/DoctorRoutes";
import ReceptionistRoutes from "../Features/Receptionist/Routes/ReceptionistRoutes";

// Import global routing here
function App() {
  return (
    <Routes>
      <Route path="/doctor/*" element={<DoctorRoutes />} />
      <Route path="/receptionist/*" element={<ReceptionistRoutes />} />
    </Routes>
  );
}

export default App;
