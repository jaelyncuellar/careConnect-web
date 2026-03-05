import { pool } from "../../db/db.js";
import * as toClientTasksDTO from "./clientTasks.mapping.js";

export const getAllClientTasks = async() => {
  const result = await pool.query(
    "SELECT * FROM client_tasks ORDER BY created_at DESC"
  );
  return result.rows.map(toClientTasksDTO);
}

export const getClientTaskById= async(id) => {
  const result = await pool.query(
    "SELECT * FROM client_tasks WHERE id = $1",
    [id]
  );
  return toClientTasksDTO(result.rows[0]);
}

export const createClientTask = async(task)=> {
  const { 
    clientId, 
    frequency, 
    active,
    carePlanId, 
    taskDefinitionId
   } = task;
  const result = await pool.query(
    `INSERT INTO client_tasks 
    (client_id, frequency, active, care_plan_id, task_definition_id)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *`,
    [clientId, frequency, active, carePlanId, taskDefinitionId]
  );
  return toClientTasksDTO(result.rows[0]);
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
  return toClientTasksDTO(result.rows[0]);
};

export const deleteClientTask = async(id) => {
  await pool.query("DELETE FROM client_tasks WHERE id = $1", [id]);
  return {message: "client task deleted successfully"};
}
