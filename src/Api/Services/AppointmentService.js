// import axios from "axios";

// const API_URL = "http://localhost:5000/api/patients";

// const getAppointmentsHistory = async (patientId) => {
//   const token = localStorage.getItem("token");

//   const res = await axios.get(`${API_URL}/${patientId}/history`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return res.data;
// };

// export default {
//   getAppointmentsHistory,
// };

import axios from "axios";

const API_URL = "http://localhost:5000/api/patients";

export const getAppointmentsHistory = async (patientId) => {
  const response = await axios.get(`${API_URL}/${patientId}/history`);
  return response.data;
};

export default {
  getAppointmentsHistory,
};
