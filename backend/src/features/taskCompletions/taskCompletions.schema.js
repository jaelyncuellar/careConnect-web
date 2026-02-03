// backend/src/features/taskCompletions/taskCompletions.schema.js 

export const createTaskCompletionSchema = {
  type: "object",
  required: ["client_task_id", "staff_id", "initials"],
  additionalProperties: false, 
  properties: {
    client_task_id: { type: "string", format:"uuid" },
    staff_id: {  type: "string", format:"uuid" },
    completed_at: { type: "string", format: "date-time" },
    initials: { type: "string" },
    notes: { type: "string" },
  }
}

export const updateTaskCompletionSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    client_task_id: {  type: "string", format:"uuid" },
    staff_id: {  type: "string", format:"uuid" },
    completed_at: { type: "string", format: "date-time" },
    initials: { type: "string" },
    notes: { type: "string" },
  }
}


