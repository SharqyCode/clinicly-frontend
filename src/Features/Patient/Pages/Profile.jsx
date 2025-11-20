import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProfileInfo from "../components/ProfileInfo";
import EditeProfile from "../components/EditeProfile";
import { getAllPatients } from "../../../Api/Services/PatientService";
import { useAuth } from "../../../Context/AuthContext";
// import { getAllPatients } from "../../../Api/Services/patients";

export default function Profile() {
  const { user, loading } = useAuth();
  console.log("profile", user);
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-500 text-xl">
        Loading profile...
      </div>
    );

  const patientId = user._id;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["patientProfile", patientId],
    queryFn: () => getAllPatients(patientId),
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-500 text-xl">
        Loading profile...
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        Error loading profile
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
          {/* <ProfileAvatar imageUrl={data.imageUrl} /> */}
          <div className="flex-1">
            <ProfileInfo patient={data.data[0]} />
            <hr className="my-6 border-gray-300" />
            <EditeProfile patient={data.data[0]} />
          </div>
        </div>
      </div>
    </div>
  );
}
