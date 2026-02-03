// backend/src/features/careGoals/careGoals.schema.js

export const createCareGoalSchema = {
  type: "object",
  required: ["care_plan_id", "skill_name"],
  additionalProperties: false, 
  properties: {
    care_plan_id: { type: "string", format:"uuid" },
    skill_name: { type: "string" },
    description: { type: "string" },
    target_frequency: { type: "integer" },
    target_period: { type: "string" },
  }
}
export const updateCareGoalSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    care_plan_id: { type: "string", format:"uuid" },
    skill_name: { type: "string" },
    description: { type: "string" },
    target_frequency: { type: "integer" },
    target_period: { type: "string" },
  }
}


