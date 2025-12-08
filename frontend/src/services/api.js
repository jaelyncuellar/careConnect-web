// this file centralizes the backend URL
// and common fetch settings 
const API_BASE_URL = "http://localhost:3000"; 

export async function apiRequest(path, options = {}) { 
    const res = await fetch(`${API_BASE_URL}${path}`, { 
        headers: { "Content-Type" : "application/json" }, 
        ...options, 
    }); 
    if (!res.ok) { 
        throw new Error(`API error: ${res.status} - ${res.statusText}`); 
    }
    return res.json(); 
}