import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProfileInfo from "../components/ProfileInfo";
import EditeProfile from "../components/EditeProfile";
import { getPatientProfile } from "../../../Api/Services/patientService";
export default function Profile() {
  const patientId = localStorage.getItem("patientId");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["patientProfile", patientId],
    queryFn: () => getPatientProfile(patientId),
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
          <ProfileAvatar imageUrl={data.imageUrl} />
          <div className="flex-1">
            <ProfileInfo patient={data} />
            <hr className="my-6 border-gray-300" />
            <EditeProfile patient={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
