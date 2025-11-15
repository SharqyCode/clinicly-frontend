import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPrescription,
  getPrescriptionsByPatient,
  getPrescriptionsByDoctor,
  getPrescriptionById,
  deletePrescription,
  updatePrescription,
} from "../../Api/Services/prescriptions";

// Query Keys
export const prescriptionKeys = {
  all: ["prescriptions"],
  byPatient: (patientId) => [...prescriptionKeys.all, "patient", patientId],
  byDoctor: (doctorId) => [...prescriptionKeys.all, "doctor", doctorId],
  byId: (id) => [...prescriptionKeys.all, "detail", id],
};

// Get prescriptions by patient ID
export const usePrescriptionsByPatient = (patientId) => {
  return useQuery({
    queryKey: prescriptionKeys.byPatient(patientId),
    queryFn: () => getPrescriptionsByPatient(patientId),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get prescriptions by doctor ID
export const usePrescriptionsByDoctor = (doctorId) => {
  return useQuery({
    queryKey: prescriptionKeys.byDoctor(doctorId),
    queryFn: () => getPrescriptionsByDoctor(doctorId),
    enabled: !!doctorId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get single prescription by ID
export const usePrescriptionById = (prescriptionId) => {
  return useQuery({
    queryKey: prescriptionKeys.byId(prescriptionId),
    queryFn: () => getPrescriptionById(prescriptionId),
    enabled: !!prescriptionId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create prescription mutation
export const useCreatePrescription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPrescription,
    onSuccess: (newPrescription) => {
      // Invalidate and refetch prescriptions queries
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all });

      // Invalidate specific patient and doctor queries if we have the data
      if (newPrescription.patient) {
        queryClient.invalidateQueries({
          queryKey: prescriptionKeys.byPatient(newPrescription.patient),
        });
      }
      if (newPrescription.doctor) {
        queryClient.invalidateQueries({
          queryKey: prescriptionKeys.byDoctor(newPrescription.doctor),
        });
      }
    },
    onError: (error) => {
      console.error("Error creating prescription:", error);
    },
  });
};

// Update prescription mutation
export const useUpdatePrescription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ prescriptionId, prescriptionData }) =>
      updatePrescription(prescriptionId, prescriptionData),
    onSuccess: (updatedPrescription, { prescriptionId }) => {
      // Update the specific prescription in cache
      queryClient.setQueryData(
        prescriptionKeys.byId(prescriptionId),
        updatedPrescription
      );

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all });
    },
    onError: (error) => {
      console.error("Error updating prescription:", error);
    },
  });
};

// Delete prescription mutation
export const useDeletePrescription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePrescription,
    onSuccess: (_, prescriptionId) => {
      // Remove the prescription from cache
      queryClient.removeQueries({
        queryKey: prescriptionKeys.byId(prescriptionId),
      });

      // Invalidate all prescription queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all });
    },
    onError: (error) => {
      console.error("Error deleting prescription:", error);
    },
  });
};
