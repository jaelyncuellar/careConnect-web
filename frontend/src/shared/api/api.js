// this file centralizes the backend URL
// and common fetch settings 
const BASE_URL = "http://localhost:3000"; // store in shared 

export async function apiRequest(endpoint, options = {}) { 
    const token = localStorage.getItem("token"); 

    const res = await fetch(`${BASE_URL}${endpoint}`, { 
        headers: { 
            "Content-Type" : "application/json", 
            ...(token && { Authorization: `Bearer ${token}`}), 
            ...options.headers, 
        }, 
        ...options, 
    }); 
    const data = await res.json(); 

    if (!res.ok) { 
        throw new Error(data.message || "API request failed"); 
    }
    return data;
}





