
import React from "react";
import { NavLink } from "react-router-dom"; 

import homelogo from "../../../assets/homelogo.svg";
import calender from "../../../assets/calender.svg";
import record from "../../../assets/record.svg";
import msg from "../../../assets/msg.svg";
import profile from "../../../assets/profile.svg";
import mail from "../../../assets/mail.svg";

export default function PatientDash() {
    

  const sidebarItems = [
    { label: "Dashboard", icon: homelogo, path: "/dashboard" }, 
    { label: "My Appointments", icon: calender, path: "/my-appointments" },
    { label: "Medical Records", icon: record, path: "/medical-records" },
    { label: "Messages", icon: msg, path: "/messages" },
    { label: "Profile", icon: profile, path: "/profile" },
  ];

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
                {/* Profile */}
                <div className="flex items-center gap-3">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWB2Y4rFUjXQHFFX6FnQhGDl2n8AOyuqcSXNKKcXVk7bcUWIW2jAIL5g7yWGObBeXhDP7p457vR8BCL1hTKelgzXmPBIVITI8SsI1f3sAQ23PItwcZIm-vE8scR396pmoqyrJ7aHFPlzYlTcH52J8XVtHgCJTz8VHSc6ukGXGh-WoZVDA3XHnoL3xHjV8SIweNsnedHWxA_UmmqW8AuQNZxXlbxqSczJ_nnjXv4owSmq0PLx8ufsN7N-oK8BiXoBG98aDSae2l1uo")',
                    }}
                  ></div>
                  <h1 className="text-text-dark text-base font-medium leading-normal">
                    Sophia Clark
                  </h1>
                </div>

                {/* Sidebar Menu */}
                <div className="flex flex-col gap-2 mt-4">
                  {sidebarItems.map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-200
                        ${
                          isActive
                            ? "bg-bg-light-secondary text-text-dark"
                            : "bg-bg-light-primary text-text-dark hover:bg-dark-primary hover:text-light"
                        }`
                      }
                    >
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-6 h-6 object-contain opacity-90"
                      />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/*MAIN CONTENT  */}
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-text-dark text-[32px] font-bold leading-tight min-w-72">
                Welcome back, Sophia
              </p>
            </div>

            {/* Book Button */}
            <div className="flex px-4 py-3 justify-start">
              <button className="bg-accent-primary-main hover:bg-accent-primary-dark text-text-light rounded-lg px-6 py-2 font-bold transition-colors duration-200">
                Book New Appointment
              </button>
            </div>

            {/* Upcoming Appointment */}
            <h2 className="text-text-dark text-[22px] font-bold px-4 pb-3 pt-5">
              Upcoming Appointment
            </h2>

            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-lg bg-bg-light-primary p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#616f89] text-sm font-normal leading-normal">
                      Next Appointment
                    </p>
                    <p className="text-text-dark text-base font-bold leading-tight">
                      Dr. Emily Carter
                    </p>
                    <p className="text-[#616f89] text-sm font-normal leading-normal">
                      General Practitioner | 123 Medical Center
                    </p>
                  </div>
                  <button className="bg-bg-light-secondary hover:bg-bg-light-primary text-text-dark rounded-lg px-4 py-1 text-sm font-medium transition-colors duration-200 w-fit">
                    View Details
                  </button>
                </div>

                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkafd4HBZ8rkWJmkQf9gvaYYp6-sSAKUtvaHWUE1K4bjw25OuEcep6vc1-G1tWml0ykW8HDVPChUPI-bWbuz31OhKeavh41DR3rbbVSb0YRG-RzHCxfHK75-F_dOc4hAQZb7kgqMQHp4dzts-nXXDDBeutO1XkQZHWF97xVGXTBBjqAcL3-Fs8UFh0WB88CRN0E2oiln94m_VpKuRyxJ-7pXUSlFEUgwRIQbSouSka1WNIx8QiASA8QwLnOQ5gzV1hvX8MORVBLSs")',
                  }}
                ></div>
              </div>
            </div>

            {/* Recent Activity */}
            <h2 className="text-text-dark text-[22px] font-bold px-4 pb-3 pt-5">
              Recent Activity
            </h2>
             {[
            {
                title: "Message Received",
                desc: "New message from Dr. Carter",
                time: "2d ago",
                 icon: mail,
            },
            {
                title: "Test Results",
                desc: "Your blood test results are ready",
                time: "3d ago",
                icon: record,
            },
            ].map((activity, i) => (
            <div
        key={i}
             className="flex items-center gap-4 bg-bg-light-primary px-4 min-h-[72px] py-2 justify-between hover:bg-bg-light-secondary transition-colors duration-200"
>
        <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-lg bg-bg-light-secondary shrink-0 size-12">
            <img
                src={activity.icon}
                alt={`${activity.title} icon`}
                className="w-6 h-6 object-contain"
            />
            </div>

            <div className="flex flex-col justify-center">
            <p className="text-text-dark text-base font-medium leading-normal">
                {activity.title}
            </p>
            <p className="text-[#616f89] text-sm font-normal leading-normal">
                {activity.desc}
            </p>
            </div>
        </div>

        <p className="text-[#616f89] text-sm font-normal leading-normal">
            {activity.time}
        </p>
        </div>

))}
            {/* Past Appointments */}
            <h2 className="text-text-dark text-[22px] font-bold px-4 pb-3 pt-5">
              Past Appointments
            </h2>

            {[
            {
                doctor: "Dr. Carter",
                type: "General Checkup",
                time: "2 months ago",
                icon: calender,
            },
            {
                doctor: "Dr. Bennett",
                type: "Dermatology Consultation",
                time: "6 months ago",
                icon: calender,
            },
            ].map((apt, i) => (
            <div
                key={i}
                className="flex items-center gap-4 bg-bg-light-primary px-4 min-h-[72px] py-2 justify-between hover:bg-bg-light-secondary transition-colors duration-200"
            >

                <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg bg-bg-light-secondary shrink-0 w-12 h-12">
                    <img
                    src={apt.icon}
                    alt={`${apt.doctor} icon`}
                    className="w-6 h-6 object-contain"
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <p className="text-text-dark text-base font-medium leading-normal">
                    {apt.doctor}
                    </p>
                    <p className="text-[#616f89] text-sm font-normal leading-normal">
                    {apt.type}
                    </p>
                </div>
                </div>
                <p className="text-[#616f89] text-sm font-normal leading-normal">
                {apt.time}
                </p>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}