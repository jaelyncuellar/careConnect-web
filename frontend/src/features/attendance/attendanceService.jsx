import { apiRequest } from "../../services/api";

console.log("Loaded: attendance service ");

const BASE_URL = "http://localhost:3000/attendance";

// GET all attendance
export async function getAttendance() {
  const res = await fetch(BASE_URL);
  return res.json();
}

// CLOCK IN (POST)
export async function clockIn() {
  const res = await fetch(`${BASE_URL}/clockin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
}

// CLOCK OUT (PATCH)
export async function clockOut() {
  const res = await fetch(`${BASE_URL}/clockout`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
  
  return res.json();
}

// CREATE manual attendance entry (admin correction)
export async function createAttendance(entry) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
  
  return res.json();
}

// EDIT attendance entry
export async function updateAttendance(id, entry) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });

  return res.json();
}

// DELETE entry
export async function deleteAttendance(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return true;
}


