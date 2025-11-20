import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createInvoice, getInvoiceById, getInvoices, updateInvoice } from "../Api/Services/billingService";

export const useInvoices = (filters) =>
    useQuery({
        queryKey: ["invoices", filters],
        queryFn: () => getInvoices(filters),
    });

export const useInvoice = (id) =>
    useQuery({
        queryKey: ["invoice", id],
        queryFn: () => getInvoiceById(id),
        enabled: !!id,
    });

export const useCreateInvoice = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: createInvoice,
        onSuccess: () => client.invalidateQueries(["invoices"]),
    });
};

export const useUpdateInvoice = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => updateInvoice(id, payload),
        onSuccess: () => client.invalidateQueries(["invoices"]),
    });
};
