// shared place for authentication data 
// stores who is logged in 
// gives whole app access to that info 

import { createContext, useContext, useState } from "react"; 

const AuthContext = createContext();  // creates shared container 

export function AuthProvider({ children }){ // wrapper around app 
    // checks if someone already logged in 
    const [user, setUser] = useState(()=> { 
        return JSON.parse(localStorage.getItem("user"));
    }); 
    // saves user info into the browser
    function login(userData){ 
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);  
    }
    function register(userData) { 
        localStorage.setItem("user", JSON.stringify(userData)); 
        setUser(userData);
    }
    // initialize & clear user when logout so navbar disappears   
    function logout() {
        localStorage.removeItem("user"); 
        setUser(null);
    }
    return ( // anyone inside this provider can access: 
        <AuthContext.Provider value={{ user, login, register, logout }}> 
            {children} 
        </AuthContext.Provider>
    ); 
}
// custom hook to shortcut import & handle errors of context
export function useAuth() { 
    const context = useContext(AuthContext); 
    if (context === undefined){ 
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return useContext(AuthContext); 
}
