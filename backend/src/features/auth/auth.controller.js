import * as authService from "./auth.service.js"; 

export const register = async(req, res) => { 
    try { 
        const user = await authService.registerUser(req.body); 
        res.status(201).json(user)
    } catch (err){ 
        res.status(400).json({ error: err.message });
    }
}

export const login = async(req, res) => { 
    try { 
        const user = await authService.loginUser(req.body); 
        res.status(200).json(user)
    } catch (err){ 
        res.status(401).json({ error: err.message });
    }
}