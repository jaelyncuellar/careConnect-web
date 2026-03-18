export const createCareGoalSchema = {
  type: "object",
  required: ["carePlanId", "focusArea"],
  additionalProperties: false, 
  properties: {
    carePlanId: { type: "string", format:"uuid" },
    focusArea: { type: "string" },
    description: { type: "string" },
    targetFrequency: { type: "integer" },
    targetPeriod: { type: "string" },
  }
}
export const updateCareGoalSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    focusArea: { type: "string" },
    description: { type: "string" },
    targetFrequency: { type: "integer" },
    targetPeriod: { type: "string" },
  }
}


