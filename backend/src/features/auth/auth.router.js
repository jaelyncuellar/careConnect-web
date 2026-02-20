// backend/src/features/auth/auth.router.js

import express from "express"; 
import { pool } from "../../db/db.js"; // exporting non-defaults use {}
const router = express.Router(); 

// register
router.post("/register", async (req, res)=>{ 
    const { name, email, password } = req.body; 
    try{ 
        const result = await pool.query( 
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email, name", 
            [name, email, password]
        ); 
        res.status(201).json(result.rows[0]); 
    } catch (err) { 
        console.error(err); 
        res.status(500).json({ error: "User already exists or server error"}); 
    }
}); 

//login 
router.post("/login", async (req, res)=>{ 
    const { email, password } = req.body; 
    try{ 
        const result = await pool.query( 
            "SELECT id, name, email FROM users WHERE email=$1 AND password=$2", 
            [email, password]
        ); 
        if (result.rows.length===0){ 
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.json(result.rows[0]); 
    } catch (err) { 
        console.error(err); 
        res.status(500).json({ error: "Server error" }); 
    }
}); 

export default router; 
