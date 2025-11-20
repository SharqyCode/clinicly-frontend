import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React from "react";
import { getPatientHistory } from "../../../Api/Services/patients";

export default function ProfileInfo({ patient }) {
  const {
    data: history = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["history", patient],
    queryFn: () => getPatientHistory(patient._id),
  });

  console.log(patient._id);
  console.log(history);
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {patient.fullName}'s Profile
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p>
          <span className="font-semibold">Email:</span> {patient.userId.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {patient.userId.phone}
        </p>
        <p>
          <span className="font-semibold">Date of Birth:</span>{" "}
          {format(new Date(patient.dateOfBirth), "dd/mm/yyyy")}
        </p>
        <p>
          <span className="font-semibold">Gender:</span> {patient.gender}
        </p>
        <p>
          <span className="font-semibold">Address: </span>
          {patient.address.street}, {patient.address.area} -{" "}
          {patient.address.city}, ​​ {patient.address.country} ​​
        </p>
      </div>
      <div>
        {history.length > 0 ? (
          history.map((visit) => {
            return (
              <div className="flex p-4 border border-gray-400">
                <div>
                  <h3>
                    Date: {format(new Date(visit.startTime), "dd/mm/yyyy")}
                  </h3>
                  <h3>
                    Doctor: {visit.doctorInfo.fullName} -{" "}
                    {visit.doctorInfo.specialty}
                  </h3>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-400 p-4 mt-8">
            Patient has no previous visits.
          </p>
        )}
      </div>
    </div>
  );
}
