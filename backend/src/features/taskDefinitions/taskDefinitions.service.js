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
    title, description
    } = data; 

    const result = await pool.query( 
        `
        INSERT INTO task_definitions 
            (title, description) 
        VALUES 
            ($1, $2, $3)
        RETURNING *
        `, 
        [title, description]
    );
    return toTaskDefinitionsDTO(result.rows[0]); 
}

export const updateTaskDefinition = async(id, data) => { 

    const { title, description } = data; 

    const result = await pool.query( 
        `
        UPDATE task_definitions 
        SET
            title = COALESCE($1, title), 
            description = COALESCE($2, description) 
        WHERE id=$3
        RETURNING *
        `, 
        [title, description, id]
    );
    return toTaskDefinitionsDTO(result.rows[0]); 
}; 

export const deleteTaskDefinition = async(id) => { 
    await pool.query( 
        "DELETE FROM task_definitions WHERE id=$1", 
        [id]
    ); 
}