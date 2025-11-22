import React, { useState } from "react";
import { usePrescriptions } from "../../hooks/usePrescriptions.js";
import { useAuth } from "../../../Context/AuthContext";

const PatientPrescriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const { superUser } = useAuth();

  // Get patient ID from the logged-in user's superUser data
  const patientId = superUser?._id;

  // Use the updated hook with TanStack Query
  const { prescriptions, loading, error } = usePrescriptions({
    patientId,
    mode: "patient",
  });

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    const doctorFirstName =
      prescription.doctor?.userId?.firstName?.toLowerCase() || "";
    const doctorLastName =
      prescription.doctor?.userId?.lastName?.toLowerCase() || "";
    const doctorName = `${doctorFirstName} ${doctorLastName}`;
    const medications =
      prescription.medications?.some((med) =>
        med.name.toLowerCase().includes(searchLower)
      ) || false;

    return doctorName.includes(searchLower) || medications;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openPrescriptionDetail = (prescription) => {
    setSelectedPrescription(prescription);
  };

  const closePrescriptionDetail = () => {
    setSelectedPrescription(null);
  };

  if (selectedPrescription) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={closePrescriptionDetail}
          className="flex items-center text-accent-primary-main hover:text-accent-primary-dark transition-colors duration-200 font-medium mb-6"
        >
          ← Back to Prescriptions
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-accent-primary-main to-accent-primary-dark p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">Prescription Details</h2>
            <p className="text-blue-100">Review your medication details</p>
          </div>

          {/* Doctor & Date Info */}
          <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50 border-b">
            <div>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Doctor
              </span>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                Dr. {selectedPrescription.doctor?.userId?.firstName}{" "}
                {selectedPrescription.doctor?.userId?.lastName ||
                  "Unknown Doctor"}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Date Prescribed
              </span>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {formatDate(selectedPrescription.createdAt)}
              </p>
            </div>
          </div>

          {/* Medications Section */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-accent-primary-main text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                💊
              </span>
              Prescribed Medications
            </h3>
            <div className="space-y-4">
              {selectedPrescription.medications?.map((medication, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-xl p-5 bg-white hover:shadow-md transition-shadow"
                >
                  <h4 className="text-xl font-bold text-accent-primary-main mb-4">
                    {medication.name}
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <span className="text-xs font-semibold text-gray-600 uppercase block mb-1">
                        Dosage
                      </span>
                      <span className="text-lg font-semibold text-gray-800">
                        {medication.dosage}
                      </span>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <span className="text-xs font-semibold text-gray-600 uppercase block mb-1">
                        Frequency
                      </span>
                      <span className="text-lg font-semibold text-gray-800">
                        {medication.frequency}
                      </span>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <span className="text-xs font-semibold text-gray-600 uppercase block mb-1">
                        Duration
                      </span>
                      <span className="text-lg font-semibold text-gray-800">
                        {medication.duration}
                      </span>
                    </div>
                  </div>
                  {medication.notes && (
                    <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                      <span className="font-semibold text-gray-700 block mb-1">
                        📝 Special Instructions:
                      </span>
                      <p className="text-gray-700">{medication.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          {selectedPrescription.additionalNotes && (
            <div className="p-6 bg-amber-50 border-t-2 border-amber-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">⚠️</span>
                Additional Instructions
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {selectedPrescription.additionalNotes}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">My Prescriptions</h2>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by doctor or medication..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-primary-main focus:border-transparent outline-none min-w-[250px]"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold mb-1">Error Loading Prescriptions</p>
          <p className="text-sm">{error}</p>
          {error.includes("Cannot connect") && (
            <p className="text-sm mt-2">
              💡 <strong>Tip:</strong> Make sure your backend server is running
              on{" "}
              <code className="bg-red-100 px-1 rounded">
                http://localhost:5002
              </code>
            </p>
          )}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary-main"></div>
          <p className="mt-4 text-gray-600">Loading your prescriptions...</p>
        </div>
      ) : filteredPrescriptions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-500 text-lg">
            {searchTerm
              ? "No prescriptions match your search."
              : "You have no prescriptions yet."}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrescriptions.map((prescription) => (
            <div
              key={prescription._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Dr. {prescription.doctor?.userId?.firstName}{" "}
                      {prescription.doctor?.userId?.lastName ||
                        "Unknown Doctor"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(prescription.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => openPrescriptionDetail(prescription)}
                    className="bg-accent-primary-main hover:bg-accent-primary-dark text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Medications ({prescription.medications?.length || 0}):
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {prescription.medications
                      ?.slice(0, 3)
                      .map((medication, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {medication.name}
                        </span>
                      ))}
                    {prescription.medications?.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        +{prescription.medications.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {prescription.additionalNotes && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Notes:</span>{" "}
                      {prescription.additionalNotes.length > 80
                        ? prescription.additionalNotes.substring(0, 80) + "..."
                        : prescription.additionalNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientPrescriptions;
