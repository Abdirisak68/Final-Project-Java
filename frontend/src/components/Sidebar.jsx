import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Plane,
  LayoutDashboard,
  LogOut,
  MapPin,
  Ticket,
  Users,
  Plus,
  Package,
  UserPlus,
  CalendarCheck,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const { logout, role } = useAuth();

  const navItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN"],
  },
  {
    path: "/all-destinations",
    label: "All Destinations",
    icon: MapPin,
    roles: ["ADMIN"],
  },
  {
    path: "/add-destination",
    label: "Add New Destination",
    icon: Plus,
    roles: ["ADMIN"],
  },
  {
    path: "/all-packages",
    label: "All Packages",
    icon: Package,
    roles: ["ADMIN"],
  },
  {
    path: "/add-package",
    label: "Add New Package",
    icon: Plus,
    roles: ["ADMIN"],
  },
  {
    path: "/all-bookings",
    label: "Manage Bookings",
    icon: CalendarCheck,
    roles: ["ADMIN"],
  },
  {
    path: "/my-bookings",
    label: "My Bookings",
    icon: Ticket,
    roles: ["CUSTOMER"],
  },
  {
    path: "/all-users",
    label: "Manage All Users",
    icon: Users,
    roles: ["ADMIN"],
  },
  {
    path: "/profile",
    label: "Profile",
    icon: UserPlus,
    roles: ["ADMIN", "CUSTOMER"],
  },
];

  return (
    <div className="w-64 bg-(--primary) text-(--text-color) h-screen flex flex-col fixed left-0 top-0 border-r border-(--gray-700)">
      <div className="p-6 border-b border-(--gray-700) flex items-center gap-2">
        <Plane className="text-(--secondary)" size={24} />
        <span className="text-xl font-bold">Warfaa</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems
          .filter((item) => item.roles.includes(role))
          .map((item) => (
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? "bg-(--secondary) text-(--white)"
                : "text-gray-300 hover:bg-(--gray-200)/15 hover:text-(--white)"
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-(--gray-700)">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-(--red-600) hover:text-(--white) transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
