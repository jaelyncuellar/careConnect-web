// backend/src/features/careGoals/careGoals.service.js

import { pool } from "../../db/db.js"

export const getAllCareGoals = async() => { 
    const result = await pool.query( 
        "SELECT * FROM care_goals ORDER BY created_at DESC"
    ); 
    return result.rows; 
}
export const getCareGoalById = async(id) => { 
    const result = await pool.query(
        "SELECT * FROM care_goals WHERE id=$1", 
        [id]
    ); 
    return result.rows[0]; 
}
export const createCareGoal = async(data) => { 
    const { 
        care_plan_id,
        skill_name,
        description,
        target_frequency,
        target_period,
    } = data; 

    const result = await pool.query( 
        `
        INSERT INTO care_goals 
            (care_plan_id, skill_name, description, target_frequency, target_period) 
        VALUES 
            ($1, $2, $3, $4, $5)
        RETURNING *
        `, 
        [care_plan_id, skill_name, description, target_frequency, target_period]
    );
    return result.rows[0]; 
}

export const updateCareGoal = async(id, data) => { 
    const fields = Object.keys(data); 
    if (fields.length === 0) return null; 

    const values = Object.values(data); 
    const setClause = fields.map((f,i) => `"${f}" = $${i+1}`).join(", "); 
    
    const result = await pool.query( 
        `UPDATE care_goals SET ${setClause} WHERE id=$${fields.length+1} RETURNING *`, 
        [...values, id]
    ); 
    
    return result.rows[0]; 
}; 

export const deleteCareGoal = async(id) => { 
    await pool.query( 
        "DELETE FROM care_goals WHERE id=$1", 
        [id]
    ); 
}