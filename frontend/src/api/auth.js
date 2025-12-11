// src/services/auth.js 

export const auth = { 
    login: async (email, password) => { 
        // fake api delay 
        await new Promise((resolve) => setTimeout(resolve, 400)); 

        //hardcoded demo user
        const validUser = { 
            email: "test@careconnect.com", 
            password: "123456", 
            name: "CareConnect Staff"
        }; 
        if (email ===validUser.email && password === validUser.password) { 
            // save user into localStorage 
            localStorage.setItem("user", JSON.stringify(validUser)); 
            return validUser; 
        }
        throw new Error("Invaalid email or password"); 
    }, 
    logout: () => { 
        localStorage.removeItem("user"); 
    }, 
    getUser: () => { 
        return JSON.parse(localStorage.getItem("user")); 
    }
};