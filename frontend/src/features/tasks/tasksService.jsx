// src/api/tasksService.js 
import { apiRequest } from "../../services/api";

export function getTasks() { 
    return apiRequest("/tasks");
}

export function createTask(task) { 
    return apiRequest("/tasks", { 
        method: "POST", 
        body: JSON.stringify(task), 
    });
}

export function updateTask(id, updates) {
  return apiRequest(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

export function deleteTask(id) {
  return apiRequest(`/tasks/${id}`, {
    method: "DELETE",
  });
}

