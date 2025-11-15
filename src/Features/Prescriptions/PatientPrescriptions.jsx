import React, { useState } from "react";
import { usePrescriptionsByPatient } from "../../hooks/usePrescriptions";

const PatientPrescriptions = ({ patientId }) => {
  // If no patientId is provided, use a mock one (replace with actual authentication)
  const currentPatientId = patientId || "673744c1d1b8f64cb13d892f";

  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // TanStack Query hook
  const {
    data: prescriptions = [],
    isLoading,
    error,
  } = usePrescriptionsByPatient(currentPatientId);

  // Filter and sort prescriptions
  const filteredAndSortedPrescriptions = prescriptions
    .filter(
      (prescription) =>
        prescription.medications?.some((med) =>
          med.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        prescription.additionalNotes
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        prescription.doctor?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "doctor":
          return (a.doctor?.name || "").localeCompare(b.doctor?.name || "");
        default:
          return 0;
      }
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">
          Loading your prescriptions...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-600">
          Error loading prescriptions: {error.message}
        </p>
      </div>
    );
  }

  // Check if we're using mock data
  const usingMockData = prescriptions.some((p) => p._id?.startsWith("mock"));

  return (
    <div className="p-6 bg-white">
      {/* Developer Mode Banner */}
      {usingMockData && (
        <div className="mb-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <strong>Demo Mode:</strong> Viewing sample prescriptions -
                Connect to your doctor's system for real data
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Prescriptions</h1>
        <p className="text-gray-600 mt-1">
          View your medication history and current prescriptions
        </p>
      </div>

      {/* Search and Sort */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search medications, notes, or doctor name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="doctor">By Doctor</option>
        </select>
      </div>

      {/* Statistics */}
      {prescriptions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {prescriptions.length}
            </div>
            <div className="text-sm text-blue-800">Total Prescriptions</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {prescriptions.reduce(
                (count, p) => count + (p.medications?.length || 0),
                0
              )}
            </div>
            <div className="text-sm text-green-800">Total Medications</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {
                new Set(prescriptions.map((p) => p.doctor?._id || p.doctor))
                  .size
              }
            </div>
            <div className="text-sm text-purple-800">Doctors</div>
          </div>
        </div>
      )}

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredAndSortedPrescriptions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">
              {searchTerm
                ? "No prescriptions match your search"
                : "No prescriptions found"}
            </div>
            <p className="text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Your prescriptions will appear here when your doctor creates them"}
            </p>
          </div>
        ) : (
          filteredAndSortedPrescriptions.map((prescription) => (
            <div
              key={prescription._id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedPrescription(prescription)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Prescription from{" "}
                    {prescription.doctor?.name || "Dr. Unknown"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Prescribed on {formatDate(prescription.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {prescription.medications?.length || 0} medication
                    {prescription.medications?.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Quick Medication Preview */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Medications:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {prescription.medications
                    ?.slice(0, 4)
                    .map((medication, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded-md">
                        <p className="font-medium text-gray-900 text-sm">
                          {medication.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {medication.dosage} • {medication.frequency}
                        </p>
                      </div>
                    ))}
                  {prescription.medications?.length > 4 && (
                    <div className="bg-gray-50 p-2 rounded-md flex items-center justify-center">
                      <p className="text-sm text-gray-500">
                        +{prescription.medications.length - 4} more
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Notes Preview */}
              {prescription.additionalNotes && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Notes:</span>{" "}
                    {prescription.additionalNotes.length > 100
                      ? `${prescription.additionalNotes.substring(0, 100)}...`
                      : prescription.additionalNotes}
                  </p>
                </div>
              )}

              <div className="mt-4 text-right">
                <span className="text-blue-600 text-sm hover:text-blue-800">
                  Click to view full details →
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Prescription Details Modal */}
      {selectedPrescription && (
        <PrescriptionDetailsModal
          prescription={selectedPrescription}
          onClose={() => setSelectedPrescription(null)}
        />
      )}
    </div>
  );
};

// Prescription Details Modal Component (Patient View)
const PrescriptionDetailsModal = ({ prescription, onClose }) => {
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Prescription Details
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1 text-blue-600 hover:text-blue-800 border border-blue-600 rounded-md hover:bg-blue-50"
              >
                Print
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Header Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Prescribed by</p>
                  <p className="font-semibold text-gray-900">
                    {prescription.doctor?.name || "Dr. Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date Prescribed</p>
                  <p className="font-semibold text-gray-900">
                    {formatDateTime(prescription.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Appointment ID</p>
                  <p className="font-mono text-sm text-gray-700">
                    {prescription.appointment}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="font-semibold text-gray-900">
                    {formatDateTime(prescription.updatedAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Medications */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Prescribed Medications
              </h3>
              <div className="space-y-4">
                {prescription.medications?.map((medication, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-medium text-gray-900">
                        {medication.name}
                      </h4>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Medication {index + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Dosage
                        </p>
                        <p className="text-gray-900">{medication.dosage}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Frequency
                        </p>
                        <p className="text-gray-900">{medication.frequency}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Duration
                        </p>
                        <p className="text-gray-900">{medication.duration}</p>
                      </div>
                    </div>

                    {medication.notes && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-md">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Special Instructions:
                        </p>
                        <p className="text-gray-800">{medication.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            {prescription.additionalNotes && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Additional Instructions
                </h3>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-md">
                  <p className="text-gray-800 leading-relaxed">
                    {prescription.additionalNotes}
                  </p>
                </div>
              </div>
            )}

            {/* Important Notice */}
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-red-800">
                    Important Reminders
                  </h4>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Take medications exactly as prescribed</li>
                      <li>
                        Do not stop taking medication without consulting your
                        doctor
                      </li>
                      <li>
                        Contact your doctor if you experience any side effects
                      </li>
                      <li>Keep this prescription for your records</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPrescriptions;
