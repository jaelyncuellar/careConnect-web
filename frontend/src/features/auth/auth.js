// src/auth/auth.js 

const BASE_URL = "http://localhost:3000/api/auth"; 

export const auth = { 
    async register(email, password){ 
        const response = await fetch(`${BASE_URL}/register`, { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json", 
            }, 
            body: JSON.stringify({email,password}), 
        }); 

        const data = await response.json(); 
        if (!response.ok){ 
            throw new Error(data.error || "Registration failed")
        }
        localStorage.setItem("user", JSON.stringify(data)); 
        return data;
    }, 
    async login(email, password) { 
        const response = await fetch(`${BASE_URL}/login`, { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json", 
            }, 
            body: JSON.stringify({ email, password }),
        }); 
        const data = await response.json(); 
        if (!response.ok){ 
            throw new Error(data.error || "Login failed"); 
        }
        localStorage.setItem("user", JSON.stringify(data)); 
        return data; 
    }, 
    logout() { 
        localStorage.removeItem("user"); 
    }, 
    getUser(){ 
        return JSON.parse(localStorage.getItem("user")); 
    }, 
};