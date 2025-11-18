import api from "../axiosInstance";

export const createInvoice = async (payload) => {
    const { data } = await api.post("/invoices", payload);
    return data;
};

export const getInvoices = async (filters = {}) => {
    const { data } = await api.get("/invoices", { params: filters });
    return data;
};

export const getInvoiceById = async (id) => {
    const { data } = await api.get(`/invoices/${id}`);
    return data;
};

export const updateInvoice = async (id, payload) => {
    const { data } = await api.patch(`/invoices/${id}`, payload);
    return data;
};
