// backend/src/features/staff/staff.service.js

import { pool } from "../../db/db.js"

export const getAllStaff = async() => {
  const result = await pool.query(
    "SELECT * FROM staff ORDER BY last_name ASC"
  );
  return result.rows;
}

export const getStaffById= async(id) => {
  const result = await pool.query(
    "SELECT * FROM staff WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// CREATE staff
export const createStaff = async(staff)=> {
  const { 
    first_name, 
    last_name, 
    role,
    phone, 
    email, address, start_date, end_date, active
   } = staff;

  const result = await pool.query(
    `INSERT INTO staff 
    (first_name, last_name, role, phone, email, address, 
    start_date, end_date, active)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *`,
    [first_name, last_name, role, phone, email, address, start_date, end_date, active]
  );

  return result.rows[0];
}

export const updateStaff = async(id, data) => {
 // delete data.id; // prevent updating primary key (id)
  const fields = Object.keys(data); 
  if (fields.length === 0) return null;
  
  const values = Object.values(data);
  const setClause = fields
    .map((f, i) => `"${f}" = $${i + 1}`)
    .join(", ");

  const result = await pool.query(
    `
    UPDATE staff
    SET ${setClause}
    WHERE id = $${fields.length + 1}
    RETURNING *
    `,
    [...values, id]
  );
  return result.rows[0] || null; // in case no update
};

// DELETE staff
export const deleteStaff = async(id) => {
  await pool.query("DELETE FROM staff WHERE id = $1", [id]);
  return {message: "staff deleted successfully"};
}
