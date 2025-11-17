import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { HiMenu } from "react-icons/hi"; // hamburger icon

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Patients", path: "/admin/patients" },
    { name: "Create Doctor", path: "/admin/create-doctor" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar for desktop */}
      <div
        className={`bg-white shadow-md p-4 transition-all duration-300 hidden md:block ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-4 p-2 bg-blue-500 text-white rounded w-full"
        >
          {collapsed ? ">" : "<"}
        </button>

        <nav>
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`text-gray-800 font-medium block truncate ${
                    collapsed ? "text-center" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile hamburger menu */}
      <div className="md:hidden flex-none bg-white shadow-md p-4 flex items-center justify-between w-full">
        <span className="font-bold text-lg">Admin Panel</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-gray-800 text-2xl"
        >
          <HiMenu />
        </button>
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed top-0 left-0 w-64 bg-white h-full shadow-md p-4 z-50">
            <button
              onClick={() => setMobileOpen(false)}
              className="mb-4 p-2 bg-blue-500 text-white rounded w-full"
            >
              Close
            </button>

            <nav>
              <ul className="space-y-3">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className="text-gray-800 font-medium block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
