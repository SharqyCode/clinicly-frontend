import TextField from "@mui/material/TextField";
import React, { useState, useMemo } from "react";
import FormTitle from "./FormTitle";
import { useQuery } from "@tanstack/react-query";
import { getAllPatients } from "../../../Api/Services/patientService";
import clsx from "clsx";
import PatientList from "./PatientList";
import { set } from "react-hook-form";

export default function PatientSearch({
  setActivePatient,
  activePatient,
  user,
}) {
  const { role } = user;
  const [phone, setPhone] = useState(() =>
    role === "patient" ? user.phone : ""
  );
  const [email, setEmail] = useState(() =>
    role === "patient" ? user.email : ""
  );
  const [name, setName] = useState(() =>
    role === "patient" ? user.fullName : ""
  );

  const {
    data: patients,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
  });

  // console.log(activePatient);

  // console.log(patients);
  // Filter patients based on any filled field
  const filteredPatients = useMemo(() => {
    if (!patients?.data) return [];
    return patients.data.filter((p) => {
      const matchesPhone = phone ? p.userId?.phone?.includes(phone) : true;
      const matchesEmail = email
        ? p.userId?.email?.toLowerCase().includes(email.toLowerCase())
        : true;
      const matchesName = name
        ? p.fullName?.toLowerCase().includes(name.toLowerCase())
        : true;
      return matchesPhone && matchesEmail && matchesName;
    });
  }, [patients, phone, email, name]);

  if (isLoading) return "Loading...";
  if (isError) return "Error loading patients";

  return (
    <div className="flex w-full justify-center md:justify-start">
      <div className="mt-8 px-8">
        <FormTitle text="Step 1: Search for a patient" />

        <div className="mt-4 flex flex-col md:flex-row gap-4 items-center md:justify-start">
          <TextField
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label="Patient's Number"
            placeholder="Enter patient's phone number"
            disabled={user.role === "patient"}
          />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Patient's Email"
            placeholder="e.g. abcd@example.com"
            type="email"
            disabled={user.role === "patient"}
          />
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Patient's Name"
            placeholder="e.g. Ahmed Mohammed"
            disabled={user.role === "patient"}
          />
        </div>
        <div className="mt-4 text-center md:text-start">
          <button
            className="btn border-2 border-accent-primary-main text-accent-primary-main disabled:bg-bg-light-primary  disabled:border-gray-500 disabled:text-gray-500 "
            onClick={() => {
              setName("");
              setPhone("");
              setEmail("");
              setActivePatient(null);
            }}
            disabled={!activePatient}
          >
            Reset
          </button>
        </div>
        <PatientList
          filteredPatients={filteredPatients}
          activePatient={activePatient}
          setActivePatient={setActivePatient}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
        />
      </div>
    </div>
  );
}
