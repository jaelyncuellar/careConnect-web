export const createTaskDefinitionSchema = {
  type: "object",
  required: ["title", "description"],
  additionalProperties: false, 
  properties: {
    title: { type: "string" },
    description: { type: "string" }
  }
}

export const updateTaskDefinitionSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    title: { type: "string" },
    description: { type: "string" },
  }
}


