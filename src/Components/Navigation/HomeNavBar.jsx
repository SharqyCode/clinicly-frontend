import React from "react";
import { Link } from "react-router";
import Logo from "./Logo";
import { UserCircle } from "lucide-react";

export default function HomeNavBar() {
  return (
    <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-4">
        <Link
          to="/patient/appointments/book"
          className="text-sm px-4 py-2 rounded-md hover:bg-slate-100"
        >
          Book Appointment
        </Link>
        <Link
          to="/doctor/apply"
          className="text-sm px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:opacity-95"
        >
          Join as Doctor
        </Link>
        <Link
          to="/auth/signup"
          className="text-sm px-4 py-2  rounded-md  hover:opacity-95"
        >
          <UserCircle />
        </Link>
        <Link
          to="/auth/login"
          className="text-sm px-4 py-2 rounded-md hover:bg-slate-100"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
