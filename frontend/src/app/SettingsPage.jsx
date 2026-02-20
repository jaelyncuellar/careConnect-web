// src/pages/Settings.jsx

console.log("Loaded: Settings");

import React, { useEffect, useState } from "react";
import { getAllStaff } from "../features/staff/staff.api";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const [staff, setStaff] = useState([]);
  const [profile, setProfile] = useState({
    name: "",
    email: ""
  });

  const navigate = useNavigate();

  // fetch staff, update prof state, 
  useEffect(() => {
    async function load() {
      const data = await getAllStaff();
      setStaff(data);
      // load curr user from localStorage (where user info stored by auth)
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (currentUser) { 
        setProfile({
          name: currentUser.name || "", 
          email: currentUser.email || ""
        }); 
      }   
    } 
  load();
  }, []);

  function handleProfileChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function handleSaveProfile() {
    alert("Profile updated!");
    // later → call update API
  }

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="p-6 space-y-10">

      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-gray-600">Manage your profile and account settings.</p>

      {/* Profile Settings */}
      <section className="bg-white p-6 shadow rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">My Profile</h2>

        <div className="space-y-3">
          <label className="block text-gray-700">Name</label>
          <input
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded-lg"
          />

          <label className="block text-gray-700 mt-4">Email</label>
          <input
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            className="w-full border p-2 rounded-lg"
          />

          {/* You can add password update later */}
        </div>

        <button
          onClick={handleSaveProfile}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </section>

      {/* Staff List */}
      <section className="bg-white p-6 shadow rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">All Staff</h2>
        <p className="text-gray-600">View the list of active team members.</p>

        {staff.length === 0 ? (
          <p className="text-gray-500">Loading staff...</p>
        ) : (
          <ul className="divide-y">
            {staff.map((person) => (
              <li key={person.id} className="py-3 flex justify-between items-center">
                <span>
                  <p className="font-medium">{person.name}</p>
                  <p className="text-gray-600 text-sm">{person.role}</p>
                </span>
                <span className="text-gray-500 text-sm">{person.email}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Logout */}
      <section className="bg-red-50 border border-red-200 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-red-700">Log Out</h2>
        <p className="text-gray-700 mb-4">
          This will sign you out of CareConnect.
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Log Out
        </button>
      </section>

    </div>
  );
}
