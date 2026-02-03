// backend/src/features/clients/clients.schema.js

import { pool } from "../../db/db.js"

export const getAllClients = async() => { 
    const result = await pool.query("SELECT * FROM clients"); 
    return result.rows; 
}

export const getClientById = async(id) => { 
    const result = await pool.query(
        "SELECT * FROM clients WHERE id=$1", 
        [id]
    ); 
    return result.rows[0]; 
}

export const createClient = async(clientData) => { 
    const { 
        first_name, 
        last_name, 
        level_of_care, 
        phone, 
        house_id, 
        guardian_first_name, 
        guardian_last_name, 
        guardian_phone, 
        start_date, 
        end_date, 
        meds, 
        active
    } = clientData;
    const result = await pool.query( 
        `INSERT INTO clients
        (first_name, last_name, 
        level_of_care, phone, 
        house_id, guardian_first_name, 
        guardian_last_name,  guardian_phone, 
        start_date, end_date, 
        meds, active)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        RETURNING *
        `, 
        [first_name, last_name, level_of_care, phone, house_id, guardian_first_name, guardian_last_name, guardian_phone, start_date, end_date, meds, active]
    ); 
    return result.rows[0]; 
}

export const updateClient = async(id, clientData) => { 
    // dynamically build SET clause
    const fields = Object.keys(clientData); 
    if (fields.length === 0) return null; 

    const values = Object.values(clientData); 
    const setClause = fields.map((f,i) => `"${f}" = $${i+1}`).join(", "); 
    
    const result = await pool.query( 
        `UPDATE clients SET ${setClause} WHERE id=$${fields.length+1} RETURNING *`, 
        [...values, id]
    ); 
    
    return result.rows[0]; 
}; 

export const deleteClient = async(id) =>  {
    await pool.query("DELETE FROM clients WHERE id = $1", [id]); 
    return { message: "Client deleted successfully" };
}; 