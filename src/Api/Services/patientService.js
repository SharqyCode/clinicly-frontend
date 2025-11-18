import axios from "axios";

const API_URL = "http://localhost:5000/api/patients";

export const getPatientProfile = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const updatePatientProfile = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};
