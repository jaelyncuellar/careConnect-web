import { pool } from "../../db/db.js"; // exporting non-defaults use {}
import bcrypt from 'bcrypt'; 

const saltRounds = parseInt(process.env.SALT_ROUNDS ?? "10"); // config val, shouldnt change per call. dont want to recreate it every time 
async function hashPassword(plainPassword){ 
    try { 
        const hash = await bcrypt.hash(plainPassword, saltRounds); 
        return hash;
    } catch (error) { 
        console.error("Error hashing password:", error); 
        throw new Error("Could not hash password"); 
    }
}

async function verifyPassword(plainPassword, storedHash){ 
    try { 
        const match = await bcrypt.compare(plainPassword, storedHash); 
        return match; 
    } catch (error){ 
        console.error("Error verifying password:", error); 
        throw new Error("Could not verify password"); 
    }
}

export const registerUser = async(data) => { 
    const hashedPassword = await hashPassword(data.password);
    const { 
        firstName, 
        lastName, 
        role, 
        phone, 
        email, 
        address,
        startDate
    } = data;

    try { 
        const result = await pool.query( 
            `INSERT INTO staff 
            (first_name, 
            last_name, 
            role, phone,
            email, password, address, start_date) 
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8) 
            RETURNING 
            id, first_name, last_name, email`, 
            [firstName, lastName, role, phone, email, hashedPassword, address, startDate]
        ); 
        const row = result.rows[0];
        return { 
            id: row.id, 
            name: `${row.first_name} ${row.last_name}`, 
            email: row.email, 
        }
    } catch (err) { 
        if (err.code === "23505"){ 
            throw new Error("Email already exists"); 
        }
        console.error("could not register new user:", err); 
        throw new Error("could not register new user: " + err.message); 
    }
}; 

export const loginUser = async(data) => { 
    const { email, password } = data;

    const result = await pool.query( 
        `SELECT id, first_name, last_name, email, password
        FROM staff 
        WHERE email=$1`, 
        [email]
    ); 

    // if (result.rows.length===0){ 
    //     console.warn(`[auth] login failed: no user for email=${email}`);
    //     throw new Error("Invalid credentials");
    // }

    const user = result.rows[0];

    // compare provided pass with the stored hash 
    let isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
        // fallback for pre-hashed/plaintext seeds (dev only)
        if (user.password === password) {
            console.warn(`[auth] login fallback plaintext match for email=${email}`);
            isMatch = true;
        }
    }

    if (!isMatch) { 
        console.warn(`[auth] login failed: password mismatch for email=${email}, hashLength=${user.password?.length}`);
        throw new Error("Invalid credentials"); 
    }

    return { 
        id: user.id, 
        name: `${user.first_name} ${user.last_name}`, 
        email: user.email
    }
}; 