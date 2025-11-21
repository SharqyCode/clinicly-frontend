import React, { useMemo, useState } from "react";
import { useCreateInvoice } from "../../../../Hooks/useInvoice";
import { useQuery } from "@tanstack/react-query";
import { getAllAppointments } from "../../../../Api/Services/appointments";
import { getAllPatients } from "../../../../Api/Services/patients";

export default function BillingForm() {
  const createMutation = useCreateInvoice();

  const [form, setForm] = useState({
    appointmentId: "",
    patientId: "",
    baseAmount: "",
    discount: 0,
    discountType: "flat",
    taxRate: 0,
    paymentMethod: "cash",
    notes: "",
    pointsUsed: 0,
  });

  const [appointmentFilter, setAppointmentFilter] = useState("");
  const [patientFilter, setPatientFilter] = useState("");

  /* ===================== FETCH DATA ===================== */

  const { data: apptData, isLoading: apptsLoading } = useQuery({
    queryKey: ["billing-appointments"],
    queryFn: getAllAppointments,
  });

  const { data: patientsData, isLoading: patientsLoading } = useQuery({
    queryKey: ["billing-patients"],
    queryFn: () => getAllPatients({}),
  });

  // ✅ Normalize backend response shape
  const appointmentsRaw = apptData?.data || apptData?.appointments || [];
  const patientsRaw = patientsData?.data || patientsData?.patients || [];

  /* ===================== FILTER LOGIC ===================== */

  const appointments = useMemo(() => {
    if (!appointmentFilter) return appointmentsRaw;
    const term = appointmentFilter.toLowerCase();

    return appointmentsRaw.filter((a) => {
      const patientName = a?.patient?.userId?.firstName
        ? `${a.patient.userId.firstName} ${a.patient.userId.lastName}`
        : "";
      const doctorName = a?.doctor?.userId?.firstName
        ? `${a.doctor.userId.firstName} ${a.doctor.userId.lastName}`
        : "";
      return (
        patientName.toLowerCase().includes(term) ||
        doctorName.toLowerCase().includes(term)
      );
    });
  }, [appointmentsRaw, appointmentFilter]);

  const patients = useMemo(() => {
    if (!patientFilter) return patientsRaw;
    const term = patientFilter.toLowerCase();

    return patientsRaw.filter((p) => {
      const name = `${p?.userId?.firstName || ""} ${p?.userId?.lastName || ""}`;
      return name.toLowerCase().includes(term);
    });
  }, [patientsRaw, patientFilter]);

  /* ===================== HANDLERS ===================== */

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["baseAmount", "discount", "taxRate", "pointsUsed"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const estimatedTotal = useMemo(() => {
    const base = Number(form.baseAmount) || 0;
    let total = base;

    if (form.discountType === "flat") total -= form.discount;
    if (form.discountType === "percentage") total -= (form.discount / 100) * base;
    if (form.taxRate > 0) total += (form.taxRate / 100) * total;

    return Math.max(0, total.toFixed(2));
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.appointmentId || !form.patientId) {
      alert("Appointment and Patient are required");
      return;
    }

    try {
      
      await createMutation.mutateAsync(form);
      alert("Invoice created successfully");

      setForm({
        appointmentId: "",
        patientId: "",
        baseAmount: "",
        discount: 0,
        discountType: "flat",
        taxRate: 0,
        paymentMethod: "cash",
        notes: "",
        pointsUsed: 0,
      });
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  /* ===================== UI ===================== */

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold">Create Invoice</h2>

      {/* APPOINTMENT */}
      <div>
        <label className="block mb-1">Appointment</label>
        <input
          className="input input-bordered w-full mb-2"
          placeholder="Search appointment..."
          value={appointmentFilter}
          onChange={(e) => setAppointmentFilter(e.target.value)}
        />
        <select
          className="select select-bordered w-full"
          value={form.appointmentId}
          onChange={(e) => setForm({ ...form, appointmentId: e.target.value })}
        >
          <option value="">Select Appointment</option>
          {apptsLoading && <option>Loading...</option>}
          {appointments.map((a) => (
            <option key={a._id} value={a._id}>
              {a?.patient?.userId?.firstName} {a?.patient?.userId?.lastName} -
              Dr. {a?.doctor?.userId?.firstName}
            </option>
          ))}
        </select>
      </div>

      {/* PATIENT */}
      <div>
        <label className="block mb-1">Patient</label>
        <input
          className="input input-bordered w-full mb-2"
          placeholder="Search patient..."
          value={patientFilter}
          onChange={(e) => setPatientFilter(e.target.value)}
        />
        <select
          className="select select-bordered w-full"
          value={form.patientId}
          onChange={(e) => setForm({ ...form, patientId: e.target.value })}
        >
          <option value="">Select Patient</option>
          {patientsLoading && <option>Loading...</option>}
          {patients.map((p) => (
            <option key={p._id} value={p._id}>
              {p?.userId?.firstName} {p?.userId?.lastName}
            </option>
          ))}
        </select>
      </div>

      {/* FINANCIAL */}
      <input
        className="input input-bordered w-full"
        type="number"
        name="baseAmount"
        placeholder="Base Amount"
        value={form.baseAmount}
        onChange={onChange}
        required
      />

      <textarea
        className="textarea textarea-bordered w-full"
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={onChange}
      />

      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl">
        <span className="font-semibold">Total: EGP {estimatedTotal}</span>
        <button className="btn btn-primary" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating..." : "Create Invoice"}
        </button>
      </div>
    </form>
  );
}
