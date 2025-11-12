import ButtonExample from "../_themeUseExample/buttonExample";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PatientDash from "../Features/Patient/Pages/PatientDash";
import DoctorDash from "../Features/Doctor/Pages/DoctorDash";

function App() {
  return (
    <>
    <PatientDash/>
     <DoctorDash/>
    </>
  );
}

export default App;
