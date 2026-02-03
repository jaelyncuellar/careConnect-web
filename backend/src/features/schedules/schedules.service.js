
// backend/src/features/schedules/schedules.service.js

import { pool } from "../../db/db.js"

export const getAllSchedules = async() => { 
    const result = await pool.query("SELECT * FROM schedules"); 
    return result.rows; 
}

export const getScheduleById = async(id) => { 
    const result = await pool.query(
        "SELECT * FROM schedules WHERE id=$1", 
        [id]
    ); 
    return result.rows[0]; 
}

export const createSchedule = async(data) => { 
    const { 
        staff_id, 
        client_id, 
        shift_date, 
        start_time, 
        end_time, 
    } = data;
    const result = await pool.query( 
        `INSERT INTO schedules
        (staff_id, client_id, shift_date, 
        start_time, end_time)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *
        `, 
        [staff_id, client_id, shift_date,start_time, end_time]
    ); 
    return result.rows[0]; 
}

export const updateSchedule = async(id, data) => { 
    // dynamically build SET clause
    const fields = Object.keys(data); 
    if (fields.length === 0) return null; 

    const values = Object.values(data); 
    const setClause = fields.map((f,i) => `"${f}" = $${i+1}`).join(", "); 
    
    const result = await pool.query( 
        `UPDATE schedules SET ${setClause} WHERE id=$${fields.length+1} RETURNING *`, 
        [...values, id]
    ); 
    return result.rows[0]; 
}; 

export const deleteSchedule = async(id) =>  {
    await pool.query("DELETE FROM schedules WHERE id = $1", [id]); 
    return { message: "Schedule deleted successfully" };
}; 