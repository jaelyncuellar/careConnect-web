// schemas/carePlan.schema.js 
export const carePlanSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    clientName: { type: "string" },
    clientId: { type: "string" },
    planType: { type: "string", enum: ["long-term", "rehab", "short-term"] },
    goals: { type: "array", items: { type: "string" } },
    tasks: { type: "array", items: { type: "string" } },
    lastUpdated: { type: "string", format: "date-time" }
  },
  required: ["clientName", "planType", "goals"]
};