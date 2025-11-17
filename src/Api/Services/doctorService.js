import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

export const createDoctor = async (doctorData) => {
  const token = localStorage.getItem("accessToken"); // read token

  const response = await axios.post(`${API_URL}/create-user`, doctorData, {
    headers: {
      Authorization: `Bearer ${token}`, // include token
    },
  });

  return response.data;
};
