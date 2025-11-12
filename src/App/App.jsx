import { BrowserRouter, Routes, Route } from "react-router-dom";

import PatientDash from "../Features/Patient/Pages/PatientDash";
import DoctorDash from "../Features/Doctor/Pages/DoctorDash";
import DoctorPatients from "../Features/Doctor/Pages/DoctorPatients";

function App() {
  return (
      <Routes>
        {/* Default Route (you can change this to whichever you prefer) */}
        {/* <Route path="/" element={<PatientDash />} /> */}

        {/* Doctor Dashboard */}
        <Route path="/doctors" element={<DoctorDash />} />

        {/* Doctor's Patients Page */}
        <Route path="/patients" element={<DoctorPatients />} />
      </Routes>
  );
}

export default App;
