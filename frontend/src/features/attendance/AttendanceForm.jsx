console.log("Loaded: attendance form ");

import { useState } from "react";
import { createAttendance } from "../../../../backend/src/services/attendanceService"; 


export default function AttendanceForm({ onCreated }) {
  const [date, setDate] = useState("");
  const [clockIn, setClockIn] = useState("");
  const [clockOut, setClockOut] = useState("");
  const [notes, setNotes] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const entry = {
      date,
      clockIn,
      clockOut,
      notes,
    };

    const newEntry = await createAttendance(entry);
    onCreated?.(newEntry);

    // Reset form
    setDate("");
    setClockIn("");
    setClockOut("");
    setNotes("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
      
      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border-gray-300 rounded-lg shadow-sm"
          required
        />
      </div>

      {/* Clock In */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Clock In</label>
        <input
          type="time"
          value={clockIn}
          onChange={(e) => setClockIn(e.target.value)}
          className="w-full border-gray-300 rounded-lg shadow-sm"
          required
        />
      </div>

      {/* Clock Out */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Clock Out</label>
        <input
          type="time"
          value={clockOut}
          onChange={(e) => setClockOut(e.target.value)}
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border-gray-300 rounded-lg shadow-sm"
          rows={2}
          placeholder="Optional"
        ></textarea>
      </div>

      {/* Submit  */}
      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition"
      >
        Save Entry
      </button>
    </form>
  );
}
