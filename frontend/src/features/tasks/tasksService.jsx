import { apiRequest } from "../../services/api";

// GET
export function getTasks() { 
    return apiRequest("/tasks"); 
}
// POST 
export function createTask(task) { 
    return apiRequest("/tasks", { 
        method: "POST", 
        body: JSON.stringify(task), 
    }); 
}

