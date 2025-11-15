import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import homeIcon from "../../../assets/homelogo.svg";
import calender from "../../../assets/calender.svg";
import patients from "../../../assets/patients.svg";
import Brain from "../../../assets/Brain.svg";
import prescriptionIcon from "../../../assets/prescription.svg";
import PatientsList from "./PatientsList";
import AppointmentsList from "./AppointmentsList";
import DoctorPrescriptions from "../../Prescriptions/DoctorPrescriptions";

export default function DoctorDash() {
  const [activeView, setActiveView] = useState("dashboard");

  const sidebarItems = [
    { label: "Dashboard", icon: homeIcon, view: "dashboard" },
    { label: "Appointments", icon: calender, view: "appointments" },
    { label: "Patients", icon: patients, view: "patients" },
    { label: "Prescriptions", icon: prescriptionIcon, view: "prescriptions" },
    { label: "AI Diagnosis Tool", icon: Brain, view: "ai-tool" },
  ];

  const appointments = [
    {
      time: "9:00 AM",
      patient: "Liam Harper",
      type: "Check-up",
      status: "Confirmed",
    },
    {
      time: "10:30 AM",
      patient: "Olivia Bennett",
      type: "Consultation",
      status: "Confirmed",
    },
    {
      time: "2:00 PM",
      patient: "Noah Carter",
      type: "Follow-up",
      status: "Confirmed",
    },
  ];

  const messages = [
    {
      name: "Ava Thompson",
      message: "I've been experiencing severe headaches...",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdFjSQd9umJeHEUx74xU-Ut27vCce33pdddUS07FywQKYXdpmvJcWj47uxOiR8cKv5WjO6fqAXViGrWOIVkhTY6vI5lO6aKmZ32Vv-MUlcBHGY3drQ-MuZBgMNeOsCvG6pV_FK0ZHY_VxdNwwXPhfCCUGff3d58PyW_pBvg7CLvZYL83OghZWTQ7GoUOZWQABYXR0gTbK9jMtx1crESrS1Vov-pZZ_HtEcBgVOfNLQgSYFPC3AoG83ZAigJEM9I4nlc4eKtRaRAKs",
    },
    {
      name: "Ethan Walker",
      message: "My child has a high fever...",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsisbYTeQMpK-sIbl-whXmJ_RtsHIfCPpL5h_fmiSJIzR_da7-dze-3ZXTkxkDL8EXB8VjkMoDlaruAlTeRyOpTaN6ULaqqG5rx2Q7GLvrNz6GtoHl438EkTXeKQLPw_KPbw0-POaKnsbEH_qWRl0yzUtbtUQ5t8c9e3tBknIMwoe-FJHMoaS1QHbWVCJT7q1hBDbISPOsQWY2yasChvqC-c5q7IJ791IOm5qOGLkVZb2GsU1A3AfkVg8DuKQ8H1ZKLp-CrU_7jWY",
    },
    {
      name: "Sophia Hayes",
      message: "I need to reschedule my appointment...",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPnkewXSR4TDUuj52bd8fd9N8B8Up7WhoDmoVkXCqZWYdvW2XTLO8Qzb8r9zZnP_msUW_MDHc4CzjCXeKs58cyvz-HsH6iOf0q0ogc2vWa0tn3xKP22ZG0-cvWWP9s5-ftmvOwrqUJFY5mTtORyExVB2Nf1QQb9yuarMybRWbB2I5N22xsyD07pU4wFcXVTTKd1jWmlga7l1oS1VxeiH5jj9uDIfNdkfuxQBdEb5aUKisz1SQ1q2YK4nBFfk2L22Y-hsWN8pfetxM",
    },
  ];

  const renderDashboardContent = () => (
    <>
      {/* Appointments */}
      <h2 className="text-text-dark text-[22px] font-bold px-4 pb-3 pt-5">
        Today's Appointments
      </h2>
      <div className="px-4 py-3">
        <div className="flex overflow-hidden rounded-lg border border-[#dbdfe6] bg-bg-light-primary">
          <table className="flex-1 w-full">
            <thead>
              <tr className="bg-bg-light-secondary">
                <th className="px-4 py-3 text-left text-text-dark text-sm font-medium">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-text-dark text-sm font-medium">
                  Patient
                </th>
                <th className="px-4 py-3 text-left text-text-dark text-sm font-medium">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-text-dark text-sm font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, i) => (
                <tr
                  key={i}
                  className="border-t border-[#dbdfe6] hover:bg-bg-light-secondary transition-colors duration-200"
                >
                  <td className="px-4 py-2 text-[#616f89] text-sm">
                    {appt.time}
                  </td>
                  <td className="px-4 py-2 text-text-dark text-sm">
                    {appt.patient}
                  </td>
                  <td className="px-4 py-2 text-[#616f89] text-sm">
                    {appt.type}
                  </td>
                  <td className="px-4 py-2 text-sm font-medium">
                    <button className="rounded-lg bg-bg-light-secondary text-text-dark px-4 py-1 text-sm font-medium">
                      {appt.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Messages */}
      <h2 className="text-text-dark text-[22px] font-bold px-4 pb-3 pt-5">
        Recent Patient Messages
      </h2>
      {messages.map((msg, i) => (
        <div
          key={i}
          className="flex items-center gap-4 bg-bg-light-primary px-4 min-h-[72px] py-2 justify-between hover:bg-bg-light-secondary transition-colors duration-200"
        >
          <div className="flex items-center gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14"
              style={{ backgroundImage: `url(${msg.img})` }}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-text-dark text-base font-medium">{msg.name}</p>
              <p className="text-[#616f89] text-sm font-normal">
                {msg.message}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Quick Access */}
      <h2 className="text-text-dark text-[22px] font-bold px-4 pb-3 pt-5">
        Quick Access
      </h2>
      <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-lg">
          <div className="flex flex-[2_2_0px] flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-text-dark text-base font-bold">
                AI Diagnosis Tool
              </p>
              <p className="text-[#616f89] text-sm font-normal">
                Quickly analyze patient symptoms and get preliminary insights.
              </p>
            </div>
            <button
              className="flex items-center justify-center gap-2 bg-bg-light-secondary hover:bg-bg-light-primary text-text-dark 
                        rounded-lg text-sm font-medium transition-colors duration-200"
              style={{ width: "125px", height: "32px" }}
            >
              <span>Launch Tool</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
              </svg>
            </button>
          </div>
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCp1ztmCNjaQ4Ysr6JJ9C5Uk2P1o14xYEcqmZm4A9nVo3FzSIId0CpiED0cZ435FYxcpkkZxkjPDb1Yl8lN_H3p3QnQK3m4Gx3cT_6ZslTe2CzL1d0bPKE30WjbqpRe8MS0rKZMbDg8YRYRxU4Y3807ozuMhWdmlegE_xuVUoXV7UmSDfqZ0ypExFjkCcj6aNL-RO1lDZ9K8ZNY-FXjp2ZYPKc9-5ZVvSeAFhxuMskkKfjoqfUsa59vw-pmT-Ez4uHoyPuFI__ZQB8")',
            }}
          ></div>
        </div>
      </div>
    </>
  );

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-bg-light-primary text-text-dark overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* SIDEBAR */}
          <div className="layout-content-container flex flex-col w-80">
            <div className="flex h-full min-h-[700px] flex-col justify-between bg-bg-light-primary p-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h1 className="text-text-dark text-base font-medium leading-normal">
                    HealthFirst MD
                  </h1>
                  <p className="text-[#616f89] text-sm font-normal leading-normal">
                    Dr. Emily Carter
                  </p>
                </div>

                {/* Sidebar Menu */}
                <div className="flex flex-col gap-2 mt-4">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveView(item.view)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-200 text-left
                        ${
                          activeView === item.view
                            ? "bg-bg-light-secondary text-black font-semibold"
                            : "hover:bg-gray-200 text-[#111318] active:font-semibold"
                        }`}
                    >
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-6 h-6 object-contain opacity-90"
                      />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {activeView === "patients" ? (
              <PatientsList />
            ) : activeView === "appointments" ? (
              <AppointmentsList />
            ) : activeView === "prescriptions" ? (
              <DoctorPrescriptions />
            ) : activeView === "ai-tool" ? (
              <div className="p-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  AI Diagnosis Tool
                </h1>
                <p className="text-gray-600">
                  AI diagnosis functionality coming soon...
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex flex-wrap justify-between gap-3 p-4">
                  <p className="text-text-dark text-[32px] font-bold leading-tight min-w-72">
                    Dashboard
                  </p>
                </div>
                {renderDashboardContent()}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
