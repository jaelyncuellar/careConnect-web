export const createTaskDefinitionSchema = {
  type: "object",
  required: ["name", "description"],
  additionalProperties: false, 
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    carePlanId: { type: "string", format:"uuid" }
  }
}

export const updateTaskDefinitionSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    carePlanId: { type: "string", format:"uuid" }
  }
}


