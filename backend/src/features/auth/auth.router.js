// backend/src/features/auth/auth.router.js

import express from "express"; 
import { pool } from "../../db/db.js"; // exporting non-defaults use {}
const router = express.Router(); 

// register
router.post("/register", async (req, res)=>{ 
    const { 
        first_name, 
        last_name, 
        role, 
        phone, 
        email, 
        password, 
        address,
        start_date 
    } = req.body; 
    try{ 
        const result = await pool.query( 
            `INSERT INTO staff 
            (first_name, 
            last_name, 
            role, phone,
            email, password, address, 
            start_date) 
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8) 
            RETURNING 
            id, first_name, last_name, email`, 
            [first_name, last_name, role, phone, email, password, address, start_date]
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
            `SELECT id, first_name, last_name, email 
            FROM staff 
            WHERE email=$1 AND password=$2`, 
            [email, password]
        ); 
        if (result.rows.length===0 ){ 
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.json(result.rows[0]); 
    } catch (err) { 
        console.error(err); 
        res.status(500).json({ error: "Server error" }); 
    }
}); 

export default router; 
