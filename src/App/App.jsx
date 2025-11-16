import { BrowserRouter } from "react-router";
import ButtonExample from "../_themeUseExample/buttonExample";
import Landing from "../Features/Home/Pages/Landing";
import Profile from "../Features/Patient/Pages/Profile";
import CreateAppointment from "../Features/Receptionist/Pages/CreateAppointment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClinicLandingPage from "../Features/Home/Pages/ClinicLandingPage";

export const queryClient = new QueryClient();

// Import global routing here
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <>
          {/* <ClinicLandingPage /> */}
          {/* <Landing /> */}
          <CreateAppointment />
        </>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
