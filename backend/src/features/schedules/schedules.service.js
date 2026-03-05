import { pool } from "../../db/db.js"; 
import * as toSchedulesDTO from "./schedules.mapping.js"

export const getAllSchedules = async() => { 
    const result = await pool.query("SELECT * FROM schedules"); 
    return result.rows.map(toSchedulesDTO);
}

export const getScheduleById = async(id) => { 
    const result = await pool.query(
        "SELECT * FROM schedules WHERE id=$1", 
        [id]
    ); 
    return toSchedulesDTO(result.rows[0]); 
}

export const createSchedule = async(data) => { 
    const { 
        staffId, 
        clientId, 
        shiftDate, 
        startTime, 
        endTime, 
    } = data;
    const result = await pool.query( 
        `INSERT INTO schedules
        (staff_id, client_id, shift_date, 
        start_time, end_time)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *
        `, 
        [staffId, clientId, shiftDate, startTime, endTime]
    ); 
    return toSchedulesDTO(result.rows[0]); 
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
    return toSchedulesDTO(result.rows[0]); 
}; 

export const deleteSchedule = async(id) =>  {
    await pool.query("DELETE FROM schedules WHERE id = $1", [id]); 
    return { message: "Schedule deleted successfully" };
}; 