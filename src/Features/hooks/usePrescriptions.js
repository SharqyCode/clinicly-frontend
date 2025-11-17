import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPrescriptionsByDoctor,
  getPrescriptionsByPatient,
  deletePrescription,
} from "../../Api/Services/prescriptions.js";

/**
 * Custom hook for managing prescriptions with TanStack Query
 * @param {Object} options - Configuration options
 * @param {string} options.doctorId - Doctor ID for fetching doctor's prescriptions
 * @param {string} options.patientId - Patient ID for fetching patient's prescriptions
 * @param {string} options.mode - 'doctor' or 'patient' to determine which API to call
 * @returns {Object} Hook state and methods
 */
export const usePrescriptions = ({ doctorId, patientId, mode = "doctor" }) => {
  const queryClient = useQueryClient();

  // Create query key based on mode and ID
  const queryKey =
    mode === "patient"
      ? ["prescriptions", "patient", patientId]
      : ["prescriptions", "doctor", doctorId];

  // Query function based on mode
  const queryFn = () => {
    if (mode === "patient" && patientId) {
      console.log("Fetching prescriptions for patient:", patientId);
      return getPrescriptionsByPatient(patientId);
    } else if (mode === "doctor" && doctorId) {
      console.log("Fetching prescriptions for doctor:", doctorId);
      return getPrescriptionsByDoctor(doctorId);
    }
    console.log("No ID provided for prescriptions query");
    return Promise.resolve([]);
  };

  // Main query for fetching prescriptions
  const {
    data: prescriptions = [],
    isLoading: loading,
    error,
    refetch: refreshPrescriptions,
  } = useQuery({
    queryKey,
    queryFn,
    enabled:
      (mode === "doctor" && !!doctorId) || (mode === "patient" && !!patientId),
    select: (data) => (Array.isArray(data) ? data : []),
    retry: (failureCount, error) => {
      // Don't retry on 404 (doctor/patient not found)
      if (error.message.includes("404")) return false;
      // Retry on network errors up to 2 times
      return failureCount < 2;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deletePrescription,
    onSuccess: (_, prescriptionId) => {
      // Remove the deleted prescription from cache optimistically
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return [];
        return oldData.filter((p) => p._id !== prescriptionId);
      });

      // Optionally invalidate to refetch from server
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
    },
    onError: (error) => {
      console.error("Failed to delete prescription:", error);
    },
  });

  const deletePrescriptionById = async (prescriptionId) => {
    try {
      await deleteMutation.mutateAsync(prescriptionId);
      return true;
    } catch (err) {
      return false;
    }
  };

  return {
    prescriptions,
    loading,
    error: error
      ? error.message.includes("Failed to fetch")
        ? "Cannot connect to server. Please check if the backend is running on http://localhost:5002"
        : `Failed to load prescriptions: ${error.message}`
      : "",
    refreshPrescriptions,
    deletePrescriptionById,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error?.message || "",
    setError: () => {}, // Kept for compatibility but not needed with React Query
  };
};
