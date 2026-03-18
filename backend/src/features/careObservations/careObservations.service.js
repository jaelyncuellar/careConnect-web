import { pool } from "../../db/db.js";
import * as toCareObservationsDTO from "./careObservations.mapping.js";

export const getAllCareObservations = async() => { 
    const result = await pool.query( 
        "SELECT * FROM care_observations ORDER BY created_at DESC"
    ); 
    return result.rows.map(toCareObservationsDTO); 
}

export const getCareObservationById = async(id) => { 
    const result = await pool.query(
        "SELECT * FROM care_observations WHERE id=$1", 
        [id]
    ); 
    return toCareObservationsDTO(result.rows[0]); 
}

export const createCareObservation = async(data) => { 
    const { 
        careGoalId,
        staffId,
        observedAt,
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
        [careGoalId, staffId, observedAt, success, notes]
    );
    return toCareObservationsDTO(result.rows[0]);
}

export const updateCareObservation = async(id, data) => { 
    const fieldMap = {
        staffId: "staff_id",
        success: "success",
        notes: "notes"
    };
    const fields = Object.keys(data).filter(f => fieldMap[f]);
    if (fields.length === 0) return null;
    const values = fields.map(f => data[f]);

    const setClause = fields.map((f,i) => `"${f}" = $${i+1}`).join(", "); 
    
    const result = await pool.query( 
        `UPDATE care_observations SET ${setClause} WHERE id=$${fields.length+1} RETURNING *`, 
        [...values, id]
    ); 
    
    return toCareObservationsDTO(result.rows[0]);
}; 

export const deleteCareObservation = async(id) => { 
    await pool.query("DELETE FROM care_observations WHERE id=$1", [id]); 
    return { success: true };
}