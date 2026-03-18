// this file centralizes the backend URL
// and common fetch settings 
const BASE_URL = "http://localhost:3000"; 

export async function apiRequest(endpoint, options = {}) { 

    const res = await fetch(`${BASE_URL}${endpoint}`, { 
        headers: { 
            "Content-Type" : "application/json", 
            ...(options.headers || {})
        }, 
        ...options, 
    }); 

    if (!res.ok) { 
        const data = await res.json().catch(() => ({})); 
        throw new Error(data.message || "API request failed"); 
    }
    return data;
}





