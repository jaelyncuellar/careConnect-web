// handles server comm, talks to backE

const BASE_URL = "http://localhost:3000/api/auth"; 

export const auth = { 
    async register(userData){ 
        const response = await fetch(`${BASE_URL}/register`, { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json", 
            }, 
            body: JSON.stringify(userData), // JSON obj -> JS obj (backend)
        }); 

        const data = await response.json(); 
        if (!response.ok){ 
            const validation = data.errors && Array.isArray(data.errors) ? data.errors.map(e => `${e.instancePath || e.dataPath || ''} ${e.message}`.trim()).join('; ') : null;
            const message = data.error || data.message || validation || JSON.stringify(data) || "Registration failed";
            throw new Error(message);
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
            // displays the error clearly 
            const validation = data.errors && Array.isArray(data.errors) ? data.errors.map(e => `${e.instancePath || e.dataPath || ''} ${e.message}`.trim()).join('; ') : null; 
            const message = data.error || data.message || validation || JSON.stringify(data) || "Login failed"; 
            throw new Error(message); 
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