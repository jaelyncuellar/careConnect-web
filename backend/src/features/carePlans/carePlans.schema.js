// backend/src/features/carePlans/carePlans.schema.js 

export const createCarePlanSchema = {
  type: "object",
  required: ["clientId", "createdBy", "focusArea", "startDate"],
  additionalProperties: false, // strict backend validation 
  properties: {
    clientId: { type: "string", format: "uuid" },
    createdBy: { type: "string", format: "uuid" },
    focusArea: { type: "string" },
    startDate: { type: "string", format:"date" },
    endDate: { type: "string" , format: "date"},
    notes: { type: "string" },
  }
}
export const updateCarePlanSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    focusArea: { type: "string" },
    startDate: { type: "string", format:"date" },
    endDate: { type: "string" , format: "date"},
    notes: { type: "string" },
  }
}


