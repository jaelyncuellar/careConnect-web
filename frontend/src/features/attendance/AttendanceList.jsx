import { useEffect, useState } from "react"; 
import { getAttendance } from "../../../../backend/src/services/attendanceService"; 
import Card from "../../UI/Card"; 

console.log("Loaded: attendance list ");

export default function AttendanceList({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-sm">No attendance records found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Clock In</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Clock Out</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Hours</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Notes</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 text-sm">
          {data.map((item) => {
            const hours = item.clockIn && item.clockOut
              ? (
                  (new Date(item.clockOut) - new Date(item.clockIn)) /
                  (1000 * 60 * 60)
                ).toFixed(2)
              : "--";

            const status = item.clockOut ? "Completed" : "Active";

            return (
              <tr key={item.id}>
                <td className="px-4 py-3">{item.date || item.clockIn?.slice(0,10)}</td>
                <td className="px-4 py-3">{item.clockIn ? new Date(item.clockIn).toLocaleTimeString() : "--"}</td>
                <td className="px-4 py-3">{item.clockOut ? new Date(item.clockOut).toLocaleTimeString() : "--"}</td>
                <td className="px-4 py-3">{hours}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
                    `}
                  >
                    {status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{item.notes || "--"}</td>
              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
}
