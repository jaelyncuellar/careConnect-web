// src/services/staffService.js

const BASE_URL = "http://localhost:3000/staff";

export async function getAllStaff() {
  const res = await fetch(BASE_URL);
  return res.json();
}
