export const createCareObservationSchema = {
  type: "object",
  required: ["careGoalId", "staffId"],
  additionalProperties: false, 
  properties: {
    careGoalId: { type: "string", format:"uuid" },
    staffId: { type: "string", format:"uuid" },
    observedAt: { type: "string", format: "date-time" },
    success: { type: "boolean" },
    notes: { type: "string" },
  }
}
export const updateCareObservationSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    staffId: {type: "string", format:"uuid" },
    success: { type: "boolean" },
    notes: { type: "string" },
  }
}


