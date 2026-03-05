// backend/src/features/taskCompletions/taskCompletions.schema.js 

export const createTaskCompletionSchema = {
  type: "object",
  required: ["clientTaskId", "staffId", "initials"],
  additionalProperties: false, 
  properties: {
    clientTaskId: { type: "string", format:"uuid" },
    staffId: {  type: "string", format:"uuid" },
    completedAt: { type: "string", format: "date-time" },
    initials: { type: "string" },
    notes: { type: "string" },
  }
}

export const updateTaskCompletionSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    clientTaskId: {  type: "string", format:"uuid" },
    staffId: {  type: "string", format:"uuid" },
    completedAt: { type: "string", format: "date-time" },
    initials: { type: "string" },
    notes: { type: "string" },
  }
}


