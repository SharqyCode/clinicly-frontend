import React, { act, use, useState } from "react";
import DashboardHeader from "../../../Components/Header/DashboardHeader";
import DoctorSearch from "../Components/DoctorSearch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllDoctors } from "../../../Api/Services/doctorService";
import DoctorList from "../Components/DoctorList";
import Calendar from "react-calendar";
import { isDoctorAvailable } from "../Utils/calenderHelpers";
import DoctorCalender from "../Components/DoctorCalender";
import DoctorTime from "../Components/DoctorTime";
import ConfirmBooking from "../Components/confirmBooking";
import PatientSearch from "../Components/PatientSearch";
import { createAppointment } from "../../../Api/Services/appointmentService";
import { queryClient } from "../../../App/App";
import Snackbar from "@mui/material/Snackbar";

export default function CreateAppointment() {
  const user = {
    fullName: "Pew Pewson",
    phone: "01234567890",
    email: "pew@pewmail.com",
    role: "patient",
    _id: "6915892272440581fe345e97",
  };

  const [activePatient, setActivePatient] = useState(() =>
    user.role === "patient" ? { ...user } : null
  );
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [activeDate, setActiveDate] = useState(null);
  const [chosenTime, setChosenTime] = useState(null);
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setStatus(null);
  };

  const messages = {
    success: "Appointment Booked Successfully",
    error: "Couldn't Book Appointment",
  };

  return (
    <div className="py-10">
      <DashboardHeader
        title="Book An Appointment"
        subtitle="Find the right care for your needs"
      />

      <PatientSearch
        setActivePatient={setActivePatient}
        activePatient={activePatient}
        user={user}
      />

      {activePatient && (
        <DoctorSearch
          activeDoctor={activeDoctor}
          setActiveDoctor={setActiveDoctor}
        />
      )}

      {activeDoctor && (
        <DoctorCalender
          activeDate={activeDate}
          setActiveDate={setActiveDate}
          activeDoctor={activeDoctor}
        />
      )}
      {activeDate && (
        <DoctorTime
          doctor={activeDoctor}
          date={activeDate}
          chosenTime={chosenTime}
          setChosenTime={setChosenTime}
        />
      )}
      <ConfirmBooking
        activePatient={activePatient}
        activeDate={activeDate}
        activeDoctor={activeDoctor}
        chosenTime={chosenTime}
        setStatus={setStatus}
      />
      <Snackbar
        open={status}
        autoHideDuration={3000}
        onClose={handleClose}
        message={messages[status] || ""}
      />
    </div>
  );
}
