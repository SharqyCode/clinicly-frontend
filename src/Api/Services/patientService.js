// src/Api/Services/PatientService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getAllPatients = async () => {
    const res = await axios.get(`${API_URL}/patients`);
    return res.data; // make sure backend returns {patients: [...]}
};


export const createPatient = async (newPatient) => {
    const res = await axios.post(`${API_URL}/patients`, newPatient);
    return res.data; // make sure backend returns {patients: [...]}
};
