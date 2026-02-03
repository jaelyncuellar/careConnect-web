import dotenv from "dotenv";
dotenv.config(); 

import pkg from "pg"; 
const { Pool } = pkg; 

console.log("ENV CHECK:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  passwordLoaded: !!process.env.DB_PASSWORD, // true if loaded
  port: process.env.DB_PORT,
});

export const pool = new Pool({ 
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD?.trim(),
    port: Number(process.env.DB_PORT), 
}); 

// optional: test connection
pool.connect()
  .then(client => {
    console.log("✅ PostgreSQL connected successfully!");
    client.release();
  })
  .catch(err => console.error("❌ PostgreSQL connection error:", err.message));