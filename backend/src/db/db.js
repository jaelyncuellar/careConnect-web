import dotenv from "dotenv"; // what do? 
dotenv.config(); 

import pkg from "pg"; 
const { Pool } = pkg; // conx to the db ? 

console.log("ENV CHECK:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  passwordLoaded: !!process.env.DB_PASSWORD, // true if loaded
  port: process.env.DB_PORT,
});

export const pool = new Pool({ 
    host: process.env.DB_HOST, // this get data from .env ? 
    user: process.env.DB_USER, 
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD?.trim(),
    port: Number(process.env.DB_PORT), 
}); 

// opt: test connection to db
pool.connect()
  .then(client => {
    console.log("✅ PostgreSQL connected successfully!");
    client.release();
  })
  .catch(err => console.error("❌ PostgreSQL connection error:", err.message));