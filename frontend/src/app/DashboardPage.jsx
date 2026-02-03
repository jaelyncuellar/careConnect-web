import React, { useEffect, useState } from "react";
import { getTasks } from "../../../backend/src/services/tasksService";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  // Load tasks preview
  useEffect(() => {
    async function load() {
      const data = await getTasks();
      setTasks(data.slice(0, 3)); // show only first 3 tasks
    }
    load();
  }, []);

  return (
    <div className="p-6 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Homebase</h1>
        <p className="text-gray-600">Welcome back! Here’s your daily overview.</p>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Link to="/careplans" className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition">
          <h2 className="text-xl font-semibold">Care Plans</h2>
          <p className="text-gray-600">View and manage client care plans.</p>
        </Link>

        <Link to="/tasks" className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <p className="text-gray-600">See tasks assigned to you.</p>
        </Link>

        <Link to="/attendance" className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition">
          <h2 className="text-xl font-semibold">Attendance</h2>
          <p className="text-gray-600">Clock in/out, submit time cards.</p>
        </Link>

      </div>

      {/* Next Shift Card */}
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h3 className="text-xl font-semibold">Your Next Shift</h3>
        <p className="text-gray-700 mt-2">Tomorrow – 9:00 AM to 5:00 PM</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Clock In
        </button>
      </div>

      {/* Task Preview */}
      <div className="p-6 bg-white shadow rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">My Tasks</h3>
          <Link to="/tasks" className="text-blue-600 hover:underline">View All</Link>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500 mt-4">No tasks assigned.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {tasks.map((task) => (
              <li key={task.id} className="p-4 border rounded-lg flex justify-between">
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-gray-600 text-sm">{task.description}</p>
                </div>
                <span className="text-gray-500 text-sm">{task.dueDate}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
