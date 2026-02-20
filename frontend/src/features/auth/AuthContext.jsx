

import { createContext, useContext, useState } from "react"; 

const AuthContext = createContext(); 

export function AuthProvider({ children }){ 
    // initialize & clear user when logout so navbar disappears   
    const [user, setUser] = useState(()=> { 
        return JSON.parse(localStorage.getItem("user"));
    }); 

    function login(userData){ 
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData); 
    }
    function register(userData) { 
        localStorage.setItem("user", JSON.stringify(userData)); 
        setUser(userData);
    }
    function logout() {
        localStorage.removeItem("user"); 
        setUser(null);
    }
    return ( 
        <AuthContext.Provider value={{ user, login, register, logout }}> 
            {children} 
        </AuthContext.Provider>
    ); 
}
// custom hook 
export function useAuth() { 
    return useContext(AuthContext); 
}
