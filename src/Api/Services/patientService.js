import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getAllPatients = async () => {
  const res = await axios.get(`${API_URL}/patients`);
  return res.data; // make sure backend returns {patients: [...]}
};