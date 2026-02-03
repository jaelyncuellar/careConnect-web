// backend/src/features/careObservations/careObservations.schema.js


export const createCareObservationSchema = {
  type: "object",
  required: ["care_goal_id", "staff_id"],
  additionalProperties: false, 
  properties: {
    care_goal_id: { type: "string", format:"uuid" },
    staff_id: { type: "string", format:"uuid" },
    observed_at: { type: "string", format: "date-time" },
    success: { type: "boolean" },
    notes: { type: "string" },
  }
}
export const updateCareObservationSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    care_goal_id: { type: "string", format:"uuid" },
    staff_id: {type: "string", format:"uuid" },
    observed_at: { type: "string", format: "date-time" },
    success: { type: "boolean" },
    notes: { type: "string" },
  }
}


