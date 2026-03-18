import { pool } from "../../db/db.js"; 
import * as toTaskCompletionDTO from "./taskCompletions.mapping.js"

export const getAllTaskCompletion = async() => { 
    const result = await pool.query( 
        "SELECT * FROM task_completions ORDER BY created_at DESC"
    ); 
    return result.rows.map(toTaskCompletionDTO); 
}
export const getTaskCompletionById = async(id) => { 
    const result = await pool.query(
        "SELECT * FROM task_completions WHERE id=$1", 
        [id]
    ); 
    return toTaskCompletionDTO(result.rows[0]); 
}
export const createTaskCompletion = async(data) => { 
    const { 
    clientTaskId, staffId, completedAt, initials, notes
    } = data; 

    const result = await pool.query( 
        `
        INSERT INTO task_completions 
            (client_task_id, staff_id, completed_at, initials, notes) 
        VALUES 
            ($1, $2, $3, $4, $5)
        RETURNING *
        `, 
        [clientTaskId, staffId, completedAt, initials, notes]
    );
    return toTaskCompletionDTO(result.rows[0]); 
}

export const updateTaskCompletion = async(id, data) => { 
    const fieldMap = {
        staffId: "staff_id",
        completedAt: "completed_at",
        initials: "initials",
        notes: "notes"
    };
    const fields = Object.keys(data).filter(f=>fieldMap[f]);
  
    if (fields.length === 0) return null; 

    const values = fields.map(f=>data[f]); 
    const setClause = fields.map((f,i) => `"${f}" = $${i+1}`).join(", "); 
    
    const result = await pool.query( 
        `UPDATE task_completions SET ${setClause} WHERE id=$${fields.length+1} RETURNING *`, 
        [...values, id]
    ); 
    
    return toTaskCompletionDTO(result.rows[0]); 
}; 

export const deleteTaskCompletion = async(id) => { 
    await pool.query( 
        "DELETE FROM task_completions WHERE id=$1", 
        [id]
    ); 
}