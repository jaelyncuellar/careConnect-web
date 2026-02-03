// backend/src/features/clientNotes/clientNotes.service.js

import { pool } from "../../db/db.js"

export const getAllClientNotes = async() => {
  const result = await pool.query(
    "SELECT * FROM client_notes ORDER BY created_at DESC"
  );
  return result.rows;
}

export const getClientNoteById= async(id) => {
  const result = await pool.query(
    "SELECT * FROM client_notes WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

export const createClientNote = async(data)=> {
  const { 
    client_id, 
    staff_id, 
    note
   } = data;
  const result = await pool.query(
    `INSERT INTO client_notes 
    (client_id, staff_id, note)
    VALUES ($1,$2,$3)
    RETURNING *`,
    [client_id, staff_id, note]
  );
  return result.rows[0];
}

export const updateClientNote = async(id, data) => {
  const fields = Object.keys(data); 
  if (fields.length === 0) return null;
  
  const values = Object.values(data);
  const setClause = fields
    .map((f, i) => `"${f}" = $${i + 1}`)
    .join(", ");

  const result = await pool.query(
    `
    UPDATE client_notes
    SET ${setClause}
    WHERE id = $${fields.length + 1}
    RETURNING *
    `,
    [...values, id]
  );
  return result.rows[0]
};

// DELETE staff
export const deleteClientNote = async(id) => {
  await pool.query("DELETE FROM client_notes WHERE id = $1", [id]);
  return {message: "client_notes item deleted successfully"};
}
