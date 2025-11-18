// src/Api/Services/PatientService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getAllPatients = async () => {
  const res = await axios.get(`${API_URL}/patients`);
  return res.data; // make sure backend returns {patients: [...]}
};

export const getAllDoctors = async () => {
  const res = await axios.get(`${API_URL}/doctors`);
  return res.data; // make sure backend returns {doctors: [...]}
};


export const deleteDoctor = async (doctorId) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.delete(`${API_URL}/doctors/${doctorId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; // { message: "Doctor profile deactivated successfully." }
};

export const deletePatient = async (patientId) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.delete(`${API_URL}/patients/${patientId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; // { message: "Doctor profile deactivated successfully." }
};