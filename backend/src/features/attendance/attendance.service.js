// backend/src/features/attendance/attendance.service.js

import { pool } from "../../db/db.js"; 

export const getAttendance = async() => {
  const result = await pool.query(
    "SELECT * FROM attendance ORDER BY shift_date ASC"
  );
  return result.rows;
}

export const getOne = async(id) =>{
  const result = await pool.query(
    "SELECT * FROM attendance WHERE id=$1",
    [id]
  );
  return result.rows[0];
}

// CREATE attendance (admin)
export const createAttendance = async(attendance) => {
  const { 
    staff_id, 
    client_id,
    shift_date,
    time_in,
    time_out
    } = attendance;
    
    const result = await pool.query( 
        `
        INSERT INTO attendance 
        (staff_id, client_id, shift_date, time_in, time_out)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `, 
        [staff_id, client_id, shift_date, time_in, time_out]
    ); 
    return result.rows[0]
}

// UPDATE attendance
export const updateAttendance = async(id, attendance) => {
  const { time_in, time_out, status } = attendance;

  const result = await pool.query(
    `
    UPDATE attendance 
      SET 
        time_in = COALESCE($1, time_in), 
        time_out = COALESCE($2, time_out), 
        status = COALESCE($3, status)
    WHERE id = $4
    RETURNING *
    `,
    [time_in, time_out, status, id]
  );
  return result.rows[0];
}

// DELETE attendance
export const deleteAttendance = async(id) => {
  await pool.query("DELETE FROM attendance WHERE id = $1", [id]);
  return true;
}
