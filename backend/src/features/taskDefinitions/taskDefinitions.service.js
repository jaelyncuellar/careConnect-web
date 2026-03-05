import { pool } from "../../db/db.js"
import * as toTaskDefinitionsDTO from "./taskDefinitions.mapping.js";

export const getAllTaskDefinitions = async() => { 
    const result = await pool.query( 
        "SELECT * FROM task_definitions ORDER BY created_at DESC"
    ); 
    return result.rows.map(toTaskDefinitionsDTO); 
}
export const getTaskDefinitionById = async(id) => { 
    const result = await pool.query(
        "SELECT * FROM task_definitions WHERE id=$1", 
        [id]
    ); 
    return toTaskDefinitionsDTO(result.rows[0]); 
}
export const createTaskDefinition = async(data) => { 
    const { 
    name, description, carePlanId
    } = data; 

    const result = await pool.query( 
        `
        INSERT INTO task_definitions 
            (name, description, care_plan_id) 
        VALUES 
            ($1, $2, $3)
        RETURNING *
        `, 
        [name, description, carePlanId]
    );
    return toTaskDefinitionsDTO(result.rows[0]); 
}

export const updateTaskDefinition = async(id, data) => { 
    const fields = Object.keys(data); 
    if (fields.length === 0) return null; 

    const values = Object.values(data); 
    const setClause = fields.map((f,i) => `"${f}" = $${i+1}`).join(", "); 
    
    const result = await pool.query( 
        `UPDATE task_definitions SET ${setClause} WHERE id=$${fields.length+1} RETURNING *`, 
        [...values, id]
    ); 
    
    return toTaskDefinitionsDTO(result.rows[0]); 
}; 

export const deleteTaskDefinition = async(id) => { 
    await pool.query( 
        "DELETE FROM task_definitions WHERE id=$1", 
        [id]
    ); 
}