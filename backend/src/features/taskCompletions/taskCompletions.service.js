// backend/src/features/taskCompletions/taskCompletions.service.js

import { pool } from "../../db/db.js"

export const getAllTaskCompletion = async() => { 
    const result = await pool.query( 
        "SELECT * FROM task_completions ORDER BY created_at DESC"
    ); 
    return result.rows; 
}
export const getTaskCompletionById = async(id) => { 
    const result = await pool.query(
        "SELECT * FROM task_completions WHERE id=$1", 
        [id]
    ); 
    return result.rows[0]; 
}
export const createTaskCompletion = async(data) => { 
    const { 
    client_task_id, staff_id, completed_at, initials, 
    notes
    } = data; 

    const result = await pool.query( 
        `
        INSERT INTO task_completions 
            (client_task_id, staff_id, completed_at, initials, notes) 
        VALUES 
            ($1, $2, $3, $4, $5)
        RETURNING *
        `, 
        [client_task_id, staff_id, completed_at, initials, notes]
    );
    return result.rows[0]; 
}

export const updateTaskCompletion = async(id, data) => { 
    const fields = Object.keys(data); 
    if (fields.length === 0) return null; 

    const values = Object.values(data); 
    const setClause = fields.map((f,i) => `"${f}" = $${i+1}`).join(", "); 
    
    const result = await pool.query( 
        `UPDATE task_completions SET ${setClause} WHERE id=$${fields.length+1} RETURNING *`, 
        [...values, id]
    ); 
    
    return result.rows[0]; 
}; 

export const deleteTaskCompletion = async(id) => { 
    await pool.query( 
        "DELETE FROM task_completions WHERE id=$1", 
        [id]
    ); 
}