import { stringify } from "ajv";
import { apiRequest } from "../../shared/api/api.js";

// GET all attendance
export async function getAttendance() {
    return apiRequest("/attendance");
}

// CLOCK IN (POST)
export function clockIn() {
    return apiRequest("/attendance/clockin", { method: "POST"});
}

// CLOCK OUT (PATCH)
export function clockOut() {
    return apiRequest("/attendance/clockout", { method: "PATCH"}); 
}

// CREATE manual attendance entry (admin correction)
export function createAttendance(entry) {
    return apiRequest("/attendance", { method: "POST", body: JSON.stringify(entry)}); 
}

// EDIT attendance entry
export function updateAttendance(id, entry) {
    return apiRequest(`/attendance/${id}`, { method: "PATCH", body: JSON.stringify(entry)}); 
}

// DELETE entry
export function deleteAttendance(id) {
    return apiRequest(`/attendance/${id}`, { method: "DELETE" }); 
}