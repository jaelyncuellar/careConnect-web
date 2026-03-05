// displays nav and shows active page 
import { NavLink } from "react-router-dom";

// if was inside fn - would recreate the array on every render 
const navItems = [
  { name: "Home", path: "/dashboard" },
  { name: "Tasks", path: "/tasks" },
  { name: "Care Plans", path: "/care-plans" },
  { name: "Attendance", path: "/attendance" },
  { name: "Settings", path: "/settings" },
];

export default function Navbar() {
  return (                                               
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
      <h1 className="text-2xl font-semibold text-blue-600">
        CareConnect
      </h1>

      <div className="flex gap-6"> 
        
        {navItems.map((item) => ( // for each item: create a link, send user to path, display name 
          // implicit return 
          <NavLink
            key={item.path}
            to={item.path} 
            // dynamic className. conditional styling 
            className={({ isActive }) => 
              `text-lg ${ 
              isActive 
                ? "text-blue-600 font-semibold" 
                : "text-gray-600"
            } hover:text-blue-500`}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
