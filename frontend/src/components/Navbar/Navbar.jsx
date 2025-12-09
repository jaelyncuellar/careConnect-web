// src/components/Navbar/Navbar.jsx
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Homebase", path: "/" },
  { name: "Tasks", path: "/tasks" },
  { name: "Care Plans", path: "/care-plans" },
  { name: "Attendance", path: "/attendance" },
  { name: "Settings", path: "/settings" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
      <h1 className="text-2xl font-semibold text-blue-600">CareConnect</h1>

      <div className="flex gap-6">
        {navItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`text-lg ${
                active ? "text-blue-600 font-semibold" : "text-gray-600"
              } hover:text-blue-500`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
