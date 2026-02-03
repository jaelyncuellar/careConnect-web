// backend/src/features/taskDefinitions/taskDefinitions.schema.js 

export const createTaskDefinitionSchema = {
  type: "object",
  required: ["name", "description"],
  additionalProperties: false, 
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    care_plan_id: { type: "string", format:"uuid" }
  }
}

export const updateTaskDefinitionSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    care_plan_id: { type: "string", format:"uuid" }
  }
}


