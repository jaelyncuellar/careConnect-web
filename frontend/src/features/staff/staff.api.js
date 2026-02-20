// ../../shared/api/api";

import { apiRequest } from "../../shared/api/api"; 

export function getAllStaff() {
  return apiRequest("/staff"); 
}
