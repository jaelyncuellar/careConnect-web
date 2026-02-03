// this file centralizes the backend URL
// and common fetch settings 
const BASE_URL = "http://localhost:3000"; 

export async function apiRequest(endpoint, options = {}) { 
    const res = await fetch(`${BASE_URL}${endpoint}`, { 
        headers: { "Content-Type" : "application/json" }, 
        ...options, 
    }); 
    if (!res.ok) { 
        throw new Error("Request failed at api.js"); 
    }
    return res.json(); 
}