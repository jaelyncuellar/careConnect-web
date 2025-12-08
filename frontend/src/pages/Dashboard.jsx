// src/pages/Dashboard.jsx
console.log("Loaded: Dashboard");

import { Link } from "react-router-dom";

export default function Dashboard() {
  const cards = [
    {
      title: "Tasks",
      description: "View daily caregiver tasks",
      path: "/tasks",
    },
    {
      title: "Care Plans",
      description: "Manage client care plans",
      path: "/care-plans",
    },
    {
      title: "Attendance",
      description: "Review clock-in and clock-out logs",
      path: "/attendance",
    },
    {
      title: "Settings",
      description: "Customize system preferences",
      path: "/settings",
    },
  ];

  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.path}
            to={card.path}
            className="p-6 border rounded-xl shadow hover:shadow-lg transition bg-white"
          >
            <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
