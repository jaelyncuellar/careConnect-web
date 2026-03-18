import { pool } from "../../db/db.js"; 
import * as toClientsDTO from "./clients.mapping.js"

export const getAllClients = async() => { 
    const result = await pool.query("SELECT * FROM clients");
    return result.rows.map(toClientsDTO); 
}

export const getClientById = async(id) => { 
    const result = await pool.query(
        "SELECT * FROM clients WHERE id=$1", 
        [id]
    ); 
    return toClientsDTO(result.rows[0]); 
}

export const createClient = async(clientData) => { 
    const { 
        firstName, lastName, 
        levelOfCare, phone, houseId, 
        guardianFirstName, 
        guardianLastName, 
        guardianPhone, 
        startDate, endDate, 
        meds, active
    } = clientData;
    const result = await pool.query( 
        `INSERT INTO clients
        (first_name, last_name, 
        level_of_care, phone, house_id, 
        guardian_first_name, guardian_last_name, 
        guardian_phone, 
        start_date, end_date, 
        meds, active)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        RETURNING *
        `, 
        [firstName, lastName, levelOfCare, phone, houseId, guardianFirstName, guardianLastName, guardianPhone, startDate, endDate, meds, active]
    ); 
    return toClientsDTO(result.rows[0]); 
}

// dynamically build SET clause
export const updateClient = async(id, clientData) => { 
    const fieldMap = {
        levelOfCare: "level_of_care", 
        phone: "phone", 
        houseId: "house_id", 
        guardianFirstName: "guardian_first_name", 
        guardianLastName: "guardian_last_name", 
        guardianPhone: "guardian_phone", 
        endDate: "end_date", 
        meds: "meds", 
        active: "active"
    }
    const fields = Object.keys(clientData).filter(f=>fieldMap[f]); 
    if (fields.length === 0) return null; 
    const values = fields.values(f=>clientData[f]);

    const setClause = fields.map((f,i) => `"${f}" = $${i+1}`).join(", "); 
    
    const result = await pool.query( 
        `UPDATE clients SET ${setClause} WHERE id=$${fields.length+1} RETURNING *`, 
        [...values, id]
    ); 
    return toClientsDTO(result.rows[0]); 
}; 

export const deleteClient = async(id) =>  {
    await pool.query("DELETE FROM clients WHERE id = $1", [id]); 
    return { message: "Client deleted successfully" };
}; 