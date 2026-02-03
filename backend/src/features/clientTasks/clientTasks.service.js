// backend/src/features/clientTasks/clientTasks.service.js

import { pool } from "../../db/db.js"

export const getAllClientTasks = async() => {
  const result = await pool.query(
    "SELECT * FROM client_tasks ORDER BY created_at DESC"
  );
  return result.rows;
}

export const getClientTaskById= async(id) => {
  const result = await pool.query(
    "SELECT * FROM client_tasks WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

export const createClientTask = async(task)=> {
  const { 
    client_id, 
    frequency, 
    active,
    care_plan_id, 
    task_definition_id
   } = task;
  const result = await pool.query(
    `INSERT INTO client_tasks 
    (client_id, frequency, active, care_plan_id, task_definition_id)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *`,
    [client_id, frequency, active, care_plan_id, task_definition_id]
  );
  return result.rows[0];
}

export const updateClientTask = async(id, data) => {
  const fields = Object.keys(data); 
  if (fields.length === 0) return null;
  
  const values = Object.values(data);
  const setClause = fields
    .map((f, i) => `"${f}" = $${i + 1}`)
    .join(", ");

  const result = await pool.query(
    `
    UPDATE client_tasks
    SET ${setClause}
    WHERE id = $${fields.length + 1}
    RETURNING *
    `,
    [...values, id]
  );
  return result.rows[0]
};

// DELETE staff
export const deleteClientTask = async(id) => {
  await pool.query("DELETE FROM client_tasks WHERE id = $1", [id]);
  return {message: "client_task deleted successfully"};
}
