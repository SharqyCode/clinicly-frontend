import api from "../axiosInstance";

export const getReceptionistDashboard = async () => {
    const { data } = await api.get("/dashboard/receptionist");
    return data;
};
