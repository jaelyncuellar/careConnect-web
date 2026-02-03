// backend/src/features/careObservations/careObservations.service.js

import { pool } from "../../db/db.js"

export const getAllCareObservations = async() => { 
    const result = await pool.query( 
        "SELECT * FROM care_observations ORDER BY created_at DESC"
    ); 
    return result.rows; 
}
export const getCareObservationById = async(id) => { 
    const result = await pool.query(
        "SELECT * FROM care_observations WHERE id=$1", 
        [id]
    ); 
    return result.rows[0]; 
}
export const createCareObservation = async(data) => { 
    const { 
        care_goal_id,
        staff_id,
        observed_at,
        success,
        notes,
    } = data; 

    const result = await pool.query( 
        `
        INSERT INTO care_observations 
            (care_goal_id, staff_id, observed_at, success, notes) 
        VALUES 
            ($1, $2, $3, $4, $5)
        RETURNING *
        `, 
        [care_goal_id, staff_id, observed_at, success, notes]
    );
    return result.rows[0]; 
}

export const updateCareObservation = async(id, data) => { 
    const fields = Object.keys(data); 
    if (fields.length === 0) return null; 

    const values = Object.values(data); 
    const setClause = fields.map((f,i) => `"${f}" = $${i+1}`).join(", "); 
    
    const result = await pool.query( 
        `UPDATE care_observations SET ${setClause} WHERE id=$${fields.length+1} RETURNING *`, 
        [...values, id]
    ); 
    
    return result.rows[0]; 
}; 

export const deleteCareObservation = async(id) => { 
    await pool.query( 
        "DELETE FROM care_observations WHERE id=$1", 
        [id]
    ); 
}