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
  const { frequency, active } = data; 

  const result = await pool.query( 
      `
      UPDATE client_tasks 
      SET
          frequency = COALESCE($1, frequency), 
          active = COALESCE($2, active) 
      WHERE id=$3
      RETURNING *
      `, 
      [frequency, active, id]
  );
  return toClientTasksDTO(result.rows[0]); 
};

export const deleteClientTask = async(id) => {
  await pool.query("DELETE FROM client_tasks WHERE id = $1", [id]);
  return {message: "client task deleted successfully"};
}
