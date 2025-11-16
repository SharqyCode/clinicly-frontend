import { BrowserRouter } from "react-router";
import ButtonExample from "../_themeUseExample/buttonExample";
import Landing from "../Features/Home/Pages/Landing";
import Profile from "../Features/Patient/Pages/Profile";
import CreateAppointment from "../Features/Receptionist/Pages/CreateAppointment";
import ClinicLandingPage from "../Features/Home/Pages/ClinicLandingPage";
import DoctorDash from "../Features/Doctor/Pages/DoctorDash";
import PatientDash from "../Features/Patient/Pages/PatientDash";

// Import global routing here
function App() {
  return (
    <>
      {/* <ClinicLandingPage /> */}
      {/* <Landing /> */}
      {/* <CreateAppointment /> */}
      <PatientDash />
    </>
  );
}

export default App;
