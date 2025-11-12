import React from "react";
import { usePatients } from "../../hooks/usePatients";

export default function DoctorPatients() {
  const { data, isLoading, error } = usePatients();

  if (isLoading) return <p className="p-6 text-text-dark">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error fetching patients.</p>;

  return (
    <div className="p-6">
      <h2 className="text-[22px] font-bold mb-4 text-text-dark">
        Patients ({data?.count || 0})
      </h2>

      <ul className="space-y-3">
        {data?.patients.map((p) => (
          <li
            key={p._id}
            className="flex flex-col gap-2 bg-bg-light-secondary hover:bg-bg-light-primary p-4 rounded-lg transition-all duration-200"
          >
            {/* Basic Info */}
            <div className="flex justify-between items-center">
              <p className="font-semibold text-text-dark text-lg">
                {p.userId?.firstName} {p.userId?.lastName}
              </p>
              <span className="text-sm text-gray-500">{p.gender || "—"}</span>
            </div>

            {/* Extra Info */}
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <p>
                <span className="font-medium text-text-dark">Email:</span>{" "}
                {p.userId?.email || "N/A"}
              </p>
              <p>
                <span className="font-medium text-text-dark">Date of Birth:</span>{" "}
                {p.dateOfBirth || "N/A"}
              </p>
              <p>
                <span className="font-medium text-text-dark">Blood Type:</span>{" "}
                {p.bloodType || "N/A"}
              </p>
              <p>
                <span className="font-medium text-text-dark">Emergency Contact:</span>{" "}
                {p.emergencyContact || "N/A"}
              </p>
              <p>
                <span className="font-medium text-text-dark">Relation:</span>{" "}
                {p.relation || "N/A"}
              </p>
              <p>
                <span className="font-medium text-text-dark">Phone:</span>{" "}
                {p.phone || "N/A"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
