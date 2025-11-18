import { useState } from "react";
import { useQuery,useMutation,useQueryClient} from "@tanstack/react-query";
import { getAllDoctors, getAllPatients,deleteDoctor,deletePatient } from "../../../Api/Services/PatientService";





export default function UsersManagement() {
//const queryClient=new QueryClient();
const queryClient = useQueryClient();
  const [showDoctors, setShowDoctors] = useState(false);
  const [showPatients, setShowPatients] = useState(false);
  const [status, setStatus] = useState(null); 

  // Fetch doctors
  const { data: doctorsData, isLoading: doctorsLoading } = useQuery({
  queryKey: ["doctors"],
  queryFn: getAllDoctors,
});

/* const handleDelete = (userId, role) => {
    if (window.confirm("Are you sure you want to delete this " + role + "?")) {
      if(role==="patient"){
        deletePatient(userId);
      } else {
        deleteDoctor(userId);
      }
    }
  }; */
  // Fetch patients
  const { data: patientsData, isLoading: patientsLoading } = useQuery({
  queryKey: ["patients"],
  queryFn: getAllPatients,
});
  
const patientMutation = useMutation({
   // mutationKey: ["patientDelete"],
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries(["patients"]);
      setStatus("success");
     
    },
    onError: (err) => {
      console.error(err.message);
      setStatus("error");
    },
  });

  const doctorMutation = useMutation({
   // mutationKey: ["patientDelete"],
    mutationFn: deleteDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries(["doctors"]);
      setStatus("success");
    },
    onError: (err) => {
      console.error(err.message);
      setStatus("error");
    },
  });
  // Delete user + doctor/patient
  


  

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Users Management</h1>

      {/* Doctors Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <button
          onClick={() => setShowDoctors(!showDoctors)}
          className="font-medium text-lg mb-2 w-full text-left"
        >
          Doctors {showDoctors ? "▲" : "▼"}
        </button>

        {showDoctors && (
          <div className="space-y-2 mt-2">
            {doctorsLoading ? (
              <p>Loading doctors...</p>
            ) : doctorsData?.doctors?.length ? (
              doctorsData.doctors.map((doc) => (
                doc.userId.isActive &&
                <div
                  key={doc._id}
                  className="flex justify-between items-center border-b p-2"
                >
                  <div>
                    {doc.userId.firstName} {doc.userId.lastName} —{" "}
                    {doc.specialization} -- {doc.userId.email}
                  </div>
                  <button
                    onClick={() => doctorMutation.mutate(doc._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No doctors found.</p>
            )}
          </div>
        )}
      </div>

      {/* Patients Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <button
          onClick={() => setShowPatients(!showPatients)}
          className="font-medium text-lg mb-2 w-full text-left"
        >
          Patients {showPatients ? "▲" : "▼"}
        </button>

        {showPatients && (
          <div className="space-y-2 mt-2">
            {patientsLoading ? (
              <p>Loading patients...</p>
            ) : patientsData?.data?.length ? (
              patientsData.data.map((patient) => (
                patient.userId.isActive &&
                <div
                  key={patient._id}
                  className="flex justify-between items-center border-b p-2"
                >
                  <div>
                    {patient.userId.firstName} {patient.userId.lastName} —{" "}
                    {patient.userId.email}
                  </div>
                  <button
                    onClick={() => patientMutation.mutate(patient._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No patients found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
