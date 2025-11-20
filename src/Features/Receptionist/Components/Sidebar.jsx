import { NavLink } from "react-router";
import { Calendar, Users, ClipboardList, CreditCard, Menu } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`bg-[--color-bg-light-secondary] dark:bg-[--color-bg-dark-secondary] h-screen transition-all duration-300 
        ${open ? "w-64" : "w-20 "} sticky top-0 flex flex-col border-r `}
    >
      {/* Toggle button */}
      <button className="p-4 " onClick={() => setOpen(!open)}>
        <Menu className="w-6 h-6" />
      </button>

      <nav className="mt-4 flex flex-col gap-2">
        <SidebarItem
          to="/receptionist"
          icon={<Calendar />}
          label="Dashboard"
          open={open}
        />

        <SidebarItem
          to="/receptionist/appointments"
          icon={<ClipboardList />}
          label="Appointments"
          open={open}
        />

        <SidebarItem
          to="/receptionist/queue"
          icon={<Users />}
          label="Queue"
          open={open}
        />

        <SidebarItem
          to="/receptionist/billing"
          icon={<CreditCard />}
          label="Billing"
          open={open}
        />
      </nav>
    </aside>
  );
}

function SidebarItem({ to, icon, label, open }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-lg mx-2 transition-colors
                 `
      }
    >
      <span className="w-6 h-6">{icon}</span>
      {open && <span className="text-sm font-medium">{label}</span>}
    </NavLink>
  );
}
