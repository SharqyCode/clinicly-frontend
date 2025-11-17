import React from "react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold">Total Patients</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">42</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold">Appointments Today</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">13</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold">New Registrations</h2>
          <p className="text-4xl font-bold text-purple-600 mt-2">5</p>
        </div>
      </div>

      {/* Recent Patients */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recently Added Patients</h2>

        <ul className="space-y-3">
          <li className="border-b pb-2">Ahmed Hassan — Male</li>
          <li className="border-b pb-2">Sara Mohamed — Female</li>
          <li className="border-b pb-2">Omar Ali — Male</li>
        </ul>
      </div>
    </div>
  );
}
