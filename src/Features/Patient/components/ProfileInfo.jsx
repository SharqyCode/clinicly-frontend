import React from "react";

export default function ProfileInfo({ patient }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {patient.name}'s Profile
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <p><span className="font-semibold">Email:</span> {patient.email}</p>
        <p><span className="font-semibold">Phone:</span> {patient.phone}</p>
        <p><span className="font-semibold">Age:</span> {patient.age}</p>
        <p><span className="font-semibold">Gender:</span> {patient.gender}</p>
        <p><span className="font-semibold">Address:</span> {patient.address}</p>
        <p><span className="font-semibold">Medical History:</span> {patient.medicalHistory || "N/A"}</p>
      </div>
    </div>
  );
}
