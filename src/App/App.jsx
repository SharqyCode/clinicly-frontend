import ButtonExample from "../_themeUseExample/buttonExample";
import CreateAppointment from "../Features/Receptionist/Pages/CreateAppointment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

// Import global routing here
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        {/* <ButtonExample /> */}
        <CreateAppointment />
      </>
    </QueryClientProvider>
  );
}

export default App;
