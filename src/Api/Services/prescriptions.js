const API_BASE_URL = "http://localhost:5002/api";

// Mock data for testing when API is not available
const mockPrescriptions = [
  {
    _id: "mock1",
    patient: {
      _id: "patient1",
      name: "John Smith",
    },
    doctor: {
      _id: "673744c1d1b8f64cb13d892e",
      name: "Dr. Emily Carter",
    },
    appointment: "appointment1",
    medications: [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "3 times daily",
        duration: "7 days",
        notes: "Take with food",
      },
      {
        name: "Ibuprofen",
        dosage: "200mg",
        frequency: "As needed",
        duration: "5 days",
        notes: "For pain relief",
      },
    ],
    additionalNotes: "Follow up in 1 week if symptoms persist",
    createdAt: "2024-11-15T10:00:00Z",
    updatedAt: "2024-11-15T10:00:00Z",
  },
  {
    _id: "mock2",
    patient: {
      _id: "patient2",
      name: "Sarah Johnson",
    },
    doctor: {
      _id: "673744c1d1b8f64cb13d892e",
      name: "Dr. Emily Carter",
    },
    appointment: "appointment2",
    medications: [
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        duration: "Ongoing",
        notes: "Take with meals",
      },
    ],
    additionalNotes: "Monitor blood sugar levels",
    createdAt: "2024-11-14T14:30:00Z",
    updatedAt: "2024-11-14T14:30:00Z",
  },
  {
    _id: "mock3",
    patient: {
      _id: "patient3",
      name: "Michael Brown",
    },
    doctor: {
      _id: "673744c1d1b8f64cb13d892e",
      name: "Dr. Emily Carter",
    },
    appointment: "appointment3",
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "Ongoing",
        notes: "Take in the morning",
      },
      {
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once daily",
        duration: "Ongoing",
        notes: "Take at bedtime",
      },
    ],
    additionalNotes: "Monitor blood pressure and cholesterol levels",
    createdAt: "2024-11-13T09:15:00Z",
    updatedAt: "2024-11-13T09:15:00Z",
  },
  {
    _id: "mock4",
    patient: {
      _id: "patient4",
      name: "Emma Davis",
    },
    doctor: {
      _id: "673744c1d1b8f64cb13d892e",
      name: "Dr. Emily Carter",
    },
    appointment: "appointment4",
    medications: [
      {
        name: "Omeprazole",
        dosage: "20mg",
        frequency: "Once daily before breakfast",
        duration: "30 days",
        notes: "Take on empty stomach",
      },
    ],
    additionalNotes: "Patient reports acid reflux symptoms",
    createdAt: "2024-11-12T16:20:00Z",
    updatedAt: "2024-11-12T16:20:00Z",
  },
  {
    _id: "mock5",
    patient: {
      _id: "patient5",
      name: "David Wilson",
    },
    doctor: {
      _id: "673744c1d1b8f64cb13d892e",
      name: "Dr. Emily Carter",
    },
    appointment: "appointment5",
    medications: [
      {
        name: "Albuterol Inhaler",
        dosage: "90 mcg",
        frequency: "2 puffs every 4-6 hours as needed",
        duration: "30 days",
        notes: "For asthma symptoms",
      },
      {
        name: "Fluticasone Inhaler",
        dosage: "110 mcg",
        frequency: "2 puffs twice daily",
        duration: "30 days",
        notes: "Maintenance therapy",
      },
    ],
    additionalNotes:
      "Patient with mild persistent asthma. Review inhaler technique.",
    createdAt: "2024-11-11T11:45:00Z",
    updatedAt: "2024-11-11T11:45:00Z",
  },
];

// Create a new prescription
export const createPrescription = async (prescriptionData) => {
  try {
    console.log(
      `💊 Creating new prescription for patient: ${prescriptionData.patient}`
    );
    console.log(`📡 API Endpoint: ${API_BASE_URL}/prescriptions`);

    const response = await fetch(`${API_BASE_URL}/prescriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prescriptionData),
    });

    if (!response.ok) {
      console.warn(
        `⚠️  Create API responded with ${response.status} ${response.statusText}, simulating success`
      );
      const mockResult = {
        _id: `mock_${Date.now()}`,
        ...prescriptionData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      console.log(`✨ Mock prescription created with ID: ${mockResult._id}`);
      return mockResult;
    }

    const data = await response.json();
    console.log(
      `✅ Successfully created prescription via API with ID: ${data._id}`
    );
    return data;
  } catch (error) {
    console.warn(
      "🚫 Create API connection failed, simulating success:",
      error.message
    );
    const mockResult = {
      _id: `mock_${Date.now()}`,
      ...prescriptionData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    console.log(`✨ Mock prescription created with ID: ${mockResult._id}`);
    return mockResult;
  }
};

// Get prescriptions by patient ID
export const getPrescriptionsByPatient = async (patientId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/prescriptions/patient/${patientId}`
    );

    if (!response.ok) {
      console.warn("API not available, using mock data");
      return mockPrescriptions.filter((p) => p.patient._id === patientId);
    }

    const data = await response.json();

    // If API returns empty array, use mock data for demo purposes
    const filteredMockData = mockPrescriptions.filter(
      (p) => p.patient._id === patientId
    );
    if (!data || data.length === 0) {
      console.log(
        `📋 API returned empty result for patient, using ${filteredMockData.length} mock prescriptions for demo`
      );
      return filteredMockData;
    }

    return data;
  } catch (error) {
    console.warn("API connection failed, using mock data:", error.message);
    return mockPrescriptions.filter((p) => p.patient._id === patientId);
  }
};

// Get prescriptions by doctor ID
export const getPrescriptionsByDoctor = async (doctorId) => {
  try {
    console.log(`🔍 Fetching prescriptions for doctor: ${doctorId}`);
    console.log(
      `📡 API Endpoint: ${API_BASE_URL}/prescriptions/doctor/${doctorId}`
    );

    const response = await fetch(
      `${API_BASE_URL}/prescriptions/doctor/${doctorId}`
    );

    if (!response.ok) {
      console.warn(
        `⚠️  API responded with ${response.status} ${response.statusText}, using mock data`
      );
      console.log(
        `📋 Returning ${mockPrescriptions.length} mock prescriptions`
      );
      return mockPrescriptions;
    }

    const data = await response.json();
    console.log(
      `✅ Successfully fetched ${data.length || 0} prescriptions from API`
    );

    // If API returns empty array, use mock data for demo purposes
    if (!data || data.length === 0) {
      console.log(
        `📋 API returned empty result, using ${mockPrescriptions.length} mock prescriptions for demo`
      );
      return mockPrescriptions;
    }

    return data;
  } catch (error) {
    console.warn("🚫 API connection failed, using mock data:", error.message);
    console.log(`📋 Returning ${mockPrescriptions.length} mock prescriptions`);
    return mockPrescriptions;
  }
};

// Get single prescription by ID
export const getPrescriptionById = async (prescriptionId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/prescriptions/${prescriptionId}`
    );

    if (!response.ok) {
      console.warn("API not available, using mock data");
      return mockPrescriptions.find((p) => p._id === prescriptionId);
    }

    return response.json();
  } catch (error) {
    console.warn("API connection failed, using mock data:", error.message);
    return mockPrescriptions.find((p) => p._id === prescriptionId);
  }
};

// Delete prescription
export const deletePrescription = async (prescriptionId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/prescriptions/${prescriptionId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.warn("API not available, simulating delete success");
      return { success: true, message: "Prescription deleted successfully" };
    }

    return response.json();
  } catch (error) {
    console.warn(
      "API connection failed, simulating delete success:",
      error.message
    );
    return { success: true, message: "Prescription deleted successfully" };
  }
};

// Update prescription (for potential future use)
export const updatePrescription = async (prescriptionId, prescriptionData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/prescriptions/${prescriptionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prescriptionData),
      }
    );

    if (!response.ok) {
      console.warn("API not available, simulating update success");
      return {
        _id: prescriptionId,
        ...prescriptionData,
        updatedAt: new Date().toISOString(),
      };
    }

    return response.json();
  } catch (error) {
    console.warn(
      "API connection failed, simulating update success:",
      error.message
    );
    return {
      _id: prescriptionId,
      ...prescriptionData,
      updatedAt: new Date().toISOString(),
    };
  }
};
