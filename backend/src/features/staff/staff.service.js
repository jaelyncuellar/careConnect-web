import { pool } from "../../db/db.js"; 
import * as toStaffDTO from "./staff.mapping.js";

export const getAllStaff = async() => {
  const result = await pool.query(
    "SELECT * FROM staff ORDER BY last_name ASC"
  );
  return result.rows.map(toStaffDTO);
}

export const getStaffById= async(id) => {
  const result = await pool.query(
    "SELECT * FROM staff WHERE id = $1",
    [id]
  );
  return toStaffDTO(result.rows[0]);
}

export const createStaff = async(staff)=> {
  const { 
    firstName, 
    lastName, 
    role, phone, 
    email, password, address, 
    startDate, endDate, active, 
   } = staff;

  const result = await pool.query(
    `INSERT INTO staff 
    (first_name, last_name, role, phone, email, 
    password, address, 
    start_date, end_date, active)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *`,
    [firstName, lastName, role, phone, 
      email, password, address, startDate, endDate, active]
  );
  return toStaffDTO(result.rows[0]);
}

export const updateStaff = async(id, data) => {
  const fieldMap = {
      phone: "phone",
      email: "email",
      address: "address",
      endDate: "end_date",
      active: "active"
  };

  const fields = Object.keys(data).filter(f=>fieldMap[f]);
  if (fields.length === 0) return null;
  const values = fields.map(f=>data[f]);

  const setClause = fields
    .map((f, i) => `"${f}" = $${i + 1}`)
    .join(", ");

  const result = await pool.query(
    `
    UPDATE staff SET ${setClause}
    WHERE id = $${fields.length + 1}
    RETURNING *
    `,
    [...values, id]
  );
  return toStaffDTO(result.rows[0]);
};

export const deleteStaff = async(id) => {
  await pool.query("DELETE FROM staff WHERE id = $1", [id]);
  return {message: "staff deleted successfully"};
}
