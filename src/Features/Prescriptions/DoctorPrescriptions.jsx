import React, { useState } from "react";
import {
  usePrescriptionsByDoctor,
  useCreatePrescription,
  useDeletePrescription,
} from "../hooks/usePrescriptions";

const DoctorPrescriptions = () => {
  // Mock doctor ID - replace with actual authentication
  const doctorId = "673744c1d1b8f64cb13d892e";

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // TanStack Query hooks
  const {
    data: prescriptions = [],
    isLoading,
    error,
  } = usePrescriptionsByDoctor(doctorId);

  const createPrescriptionMutation = useCreatePrescription();
  const deletePrescriptionMutation = useDeletePrescription();

  // Filter prescriptions based on search and status
  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      prescription.patient?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.medications?.some((med) =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (filterStatus === "all") return matchesSearch;
    // Add more filters as needed
    return matchesSearch;
  });

  const handleCreatePrescription = async (prescriptionData) => {
    try {
      await createPrescriptionMutation.mutateAsync(prescriptionData);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Failed to create prescription:", error);
    }
  };

  const handleDeletePrescription = async (prescriptionId) => {
    if (window.confirm("Are you sure you want to delete this prescription?")) {
      try {
        await deletePrescriptionMutation.mutateAsync(prescriptionId);
      } catch (error) {
        console.error("Failed to delete prescription:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading prescriptions...</span>
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

  // Check if we're using mock data (prescriptions with mock IDs)
  const usingMockData = prescriptions.some((p) => p._id?.startsWith("mock"));

  return (
    <div className="p-6 bg-white">
      {/* Developer Mode Banner */}
      {usingMockData && (
        <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
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
              <p className="text-sm text-yellow-800">
                <strong>Demo Mode:</strong> Using sample data - API connection
                not available
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-600 mt-1">Manage patient prescriptions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          + New Prescription
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by patient name or medication..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Prescriptions</option>
          <option value="recent">Recent</option>
          <option value="chronic">Chronic</option>
        </select>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">
              No prescriptions found
            </div>
            <p className="text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Create your first prescription"}
            </p>
          </div>
        ) : (
          filteredPrescriptions.map((prescription) => (
            <div
              key={prescription._id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {prescription.patient?.name || "Unknown Patient"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Prescribed on {formatDate(prescription.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedPrescription(prescription)}
                    className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md hover:bg-blue-50"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDeletePrescription(prescription._id)}
                    className="text-red-600 hover:text-red-800 px-3 py-1 rounded-md hover:bg-red-50"
                    disabled={deletePrescriptionMutation.isPending}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Medications */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Medications:</h4>
                {prescription.medications?.map((medication, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          {medication.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {medication.dosage} • {medication.frequency} •{" "}
                          {medication.duration}
                        </p>
                        {medication.notes && (
                          <p className="text-sm text-gray-500 mt-1">
                            Notes: {medication.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Notes */}
              {prescription.additionalNotes && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Additional Notes:</span>{" "}
                    {prescription.additionalNotes}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Create Prescription Modal */}
      {showCreateModal && (
        <CreatePrescriptionModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePrescription}
          isLoading={createPrescriptionMutation.isPending}
        />
      )}

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

// Create Prescription Modal Component
const CreatePrescriptionModal = ({ onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    appointment: "",
    patient: "",
    medications: [
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        notes: "",
      },
    ],
    additionalNotes: "",
    createdBy: "673744c1d1b8f64cb13d892e", // Mock doctor ID
  });

  const addMedication = () => {
    setFormData((prev) => ({
      ...prev,
      medications: [
        ...prev.medications,
        {
          name: "",
          dosage: "",
          frequency: "",
          duration: "",
          notes: "",
        },
      ],
    }));
  };

  const removeMedication = (index) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }));
  };

  const updateMedication = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      doctor: "673744c1d1b8f64cb13d892e", // Mock doctor ID
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Create New Prescription</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient and Appointment */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient ID
                </label>
                <input
                  type="text"
                  required
                  value={formData.patient}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      patient: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter patient ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment ID
                </label>
                <input
                  type="text"
                  required
                  value={formData.appointment}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      appointment: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter appointment ID"
                />
              </div>
            </div>

            {/* Medications */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Medications
                </label>
                <button
                  type="button"
                  onClick={addMedication}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Medication
                </button>
              </div>

              {formData.medications.map((medication, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-md p-4 mb-3"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-900">
                      Medication {index + 1}
                    </h4>
                    {formData.medications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedication(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      required
                      placeholder="Medication name"
                      value={medication.name}
                      onChange={(e) =>
                        updateMedication(index, "name", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Dosage (e.g., 10mg)"
                      value={medication.dosage}
                      onChange={(e) =>
                        updateMedication(index, "dosage", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      required
                      placeholder="Frequency (e.g., twice daily)"
                      value={medication.frequency}
                      onChange={(e) =>
                        updateMedication(index, "frequency", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Duration (e.g., 7 days)"
                      value={medication.duration}
                      onChange={(e) =>
                        updateMedication(index, "duration", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <textarea
                    placeholder="Additional notes for this medication (optional)"
                    value={medication.notes}
                    onChange={(e) =>
                      updateMedication(index, "notes", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                  />
                </div>
              ))}
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    additionalNotes: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="Any additional instructions or notes..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create Prescription"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Prescription Details Modal Component
const PrescriptionDetailsModal = ({ prescription, onClose }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Prescription Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Patient Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Patient Information
              </h3>
              <p className="text-gray-700">
                <span className="font-medium">Name:</span>{" "}
                {prescription.patient?.name || "Unknown Patient"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Patient ID:</span>{" "}
                {prescription.patient?._id || prescription.patient}
              </p>
            </div>

            {/* Prescription Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Prescription Information
              </h3>
              <p className="text-gray-700">
                <span className="font-medium">Created:</span>{" "}
                {formatDate(prescription.createdAt)}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Last Updated:</span>{" "}
                {formatDate(prescription.updatedAt)}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Appointment ID:</span>{" "}
                {prescription.appointment}
              </p>
            </div>

            {/* Medications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Medications
              </h3>
              <div className="space-y-3">
                {prescription.medications?.map((medication, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4"
                  >
                    <h4 className="font-medium text-gray-900 mb-2">
                      {medication.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Dosage:</span>{" "}
                        {medication.dosage}
                      </p>
                      <p>
                        <span className="font-medium">Frequency:</span>{" "}
                        {medication.frequency}
                      </p>
                      <p>
                        <span className="font-medium">Duration:</span>{" "}
                        {medication.duration}
                      </p>
                    </div>
                    {medication.notes && (
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Notes:</span>{" "}
                        {medication.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            {prescription.additionalNotes && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Additional Notes
                </h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                  {prescription.additionalNotes}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPrescriptions;
