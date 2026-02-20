console.log("Loaded: Attendance");

import { useState, useEffect } from "react"; 
import AttendanceList from "./AttendanceList";
import AttendanceForm from "./AttendanceForm";
import { getAttendance, clockIn, clockOut } from "./attendance.api.js";

export default function AttendancePage() { 
    const [attendance, setAttendance] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [isClockedIn, setIsClockedIn] = useState(false); 
    const [clockInTime, setClockInTime] = useState(null); 
    const [showForm, setShowForm] = useState(false); 

    // fetch attendance lsit 
    useEffect(() => { 
        async function fetchData() { 
            const data = await getAttendance(); 
            setAttendance(data); 
            setLoading(false); 

            // check if active shift exists 
            const active = data.find((item) => !item.clockOut); 
            if (active) { 
                setIsClockedIn(true); 
                setClockInTime(active.clockIn);
            }
        }
        fetchData();
    }, []); 

  async function handleClockIn() {
    const res = await clockIn();
    setIsClockedIn(true);
    setClockInTime(res.clockIn);
    setAttendance([res, ...attendance]);
  }

  async function handleClockOut() {
    const res = await clockOut();
    setIsClockedIn(false);
    setClockInTime(null);

    // Update last entry
    setAttendance((prev) =>
      prev.map((e) => (e.id === res.id ? res : e))
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Attendance</h1>
        <p className="text-gray-500">Track shifts, clock in/out, and view your time history.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Clock In / Clock Out Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">Shift Status</h2>
            {isClockedIn ? (
              <p className="text-sm text-green-600">
                ● Clocked in at {new Date(clockInTime).toLocaleTimeString()}
              </p>
            ) : (
              <p className="text-sm text-gray-500">Not clocked in</p>
            )}
          </div>

          <button
            onClick={isClockedIn ? handleClockOut : handleClockIn}
            className={`mt-4 py-2 rounded-xl text-white font-medium transition
              ${isClockedIn ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}
            `}
          >
            {isClockedIn ? "Clock Out" : "Clock In"}
          </button>
        </div>

        {/* Submit Time Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">Time Card</h2>
            <p className="text-sm text-gray-500">
              Review and submit your weekly hours.
            </p>
          </div>

          <button className="mt-4 py-2 bg-gray-900 hover:bg-black text-white rounded-xl font-medium transition">
            Submit Time Card
          </button>
        </div>

        {/* Request Time Off */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">Time Off</h2>
            <p className="text-sm text-gray-500">
              Request PTO or sick leave.
            </p>
          </div>

          <button className="mt-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition">
            Request Time Off
          </button>
        </div>

      </div>

      {/* Attendance List + Form */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Attendance History</h2>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm hover:bg-black transition"
          >
            {showForm ? "Close Form" : "Add Entry"}
          </button>
        </div>

        {showForm && (
          <div className="mb-6">
            <AttendanceForm />
          </div>
        )}

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <AttendanceList data={attendance} />
        )}
      </div>
    </div>
  );
}