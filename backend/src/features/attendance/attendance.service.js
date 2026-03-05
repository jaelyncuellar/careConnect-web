
import { pool } from "../../db/db.js"; 
import * as attendanceDTO from "./attendance.mapping.js"; 

export const getAllAttendance = async() => {
  const result = await pool.query(
    "SELECT * FROM attendance ORDER BY shift_date ASC"
  ); 
  return result.rows.map(attendanceDTO);// JS object 
}

export const getAttendanceById = async(id) =>{
  const result = await pool.query(
    "SELECT * FROM attendance WHERE id=$1",
    [id]
  );
  return attendanceDTO(result.rows[0]);
}

// CREATE attendance (admin)
export const createAttendance = async(attendance) => {
  const { 
    staffId, 
    clientId,
    shiftDate,
    timeIn,
    timeOut
    } = attendance;
    
    const result = await pool.query( 
        `
        INSERT INTO attendance 
        (staff_id, client_id, shift_date, time_in, time_out)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `, 
        [staffId, clientId, shiftDate, timeIn, timeOut]
    ); 
    return attendanceDTO(result.rows[0]);
}

export const updateAttendance = async(id, attendance) => {
  const { timeIn, timeOut, status } = attendance;

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
    [timeIn, timeOut, status, id]
  );
  return attendanceDTO(result.rows[0]);
}

export const deleteAttendance = async(id) => {
  await pool.query("DELETE FROM attendance WHERE id = $1",[id]);
  return { success: true };
}
