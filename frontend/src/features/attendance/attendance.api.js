import { stringify } from "ajv";
import { apiRequest } from "../../shared/api/api.js";

export async function getAttendance() {
    return apiRequest("/attendance");
}

export function clockIn() {
    return apiRequest("/attendance/clockin", { method: "POST"});
}

export function clockOut() {
    return apiRequest("/attendance/clockout", { method: "PATCH"}); 
}

// manual attendance entry (admin correction)
export function createAttendance(entry) {
    return apiRequest("/attendance", { method: "POST", body: JSON.stringify(entry)}); 
}

export function updateAttendance(id, entry) {
    return apiRequest(`/attendance/${id}`, { method: "PATCH", body: JSON.stringify(entry)}); 
}

export function deleteAttendance(id) {
    return apiRequest(`/attendance/${id}`, { method: "DELETE" }); 
}