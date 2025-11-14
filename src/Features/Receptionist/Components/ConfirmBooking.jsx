import { useMutation } from "@tanstack/react-query";
import React from "react";
import { createAppointment } from "../../../Api/Services/appointmentService";
import { queryClient } from "../../../App/App";

export default function ConfirmBooking({
  activePatient,
  activeDoctor,
  activeDate,
  chosenTime,
  setStatus,
}) {
  const appointmentMutation = useMutation({
    mutationKey: ["patientAppointments"],
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patientAppointments"] });
      setStatus("success");
    },
    onError: (err) => {
      console.error(err.message);
      setStatus("error");
    },
  });

  const handleBooking = () => {
    const appointment = {
      patient: activePatient._id,
      doctor: activeDoctor._id,
      startTime: new Date(
        activeDate.setHours(chosenTime.hour, chosenTime.minute)
      ),
    };
    console.log(activeDate);
    console.log(chosenTime);
    console.log(appointment);
    appointmentMutation.mutate(appointment);
  };

  return (
    <div className="text-center md:text-end mt-8 px-8">
      <button
        className="btn bg-accent-primary-main hover:accent-accent-primary-dark text-text-light disabled:bg-gray-500"
        onClick={() => document.getElementById("my_modal_2").showModal()}
        disabled={!activeDoctor || !activeDate || !chosenTime}
      >
        Book Appointment
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Confirmation</h3>
          <div className="text-center">
            <p className="py-2 border-b border-b-bg-dark-secondary flex justify-between">
              <span className="font-bold">Patient:</span>
              <span>{activePatient?.fullName}</span>
            </p>
            <p className="py-2 border-b border-b-bg-dark-secondary flex justify-between">
              <span className="font-bold">Doctor:</span>
              <span>
                {activeDoctor?.fullName} - {activeDoctor?.specialization}{" "}
                {activeDoctor?.rank}
              </span>
            </p>
            <p className="py-2 border-b border-b-bg-dark-secondary flex justify-between">
              <span className="font-bold">Date:</span>
              <span>{activeDate?.toDateString()}</span>
            </p>
            <p className="py-2 flex justify-between">
              <span className="font-bold">Time:</span>
              <span>{chosenTime?.time}</span>
            </p>
          </div>
          <form method="dialog" className="text-center md:text-end mt-4">
            <button
              onClick={handleBooking}
              className="btn bg-accent-primary-main hover:accent-accent-primary-dark text-text-light"
            >
              Confirm
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
