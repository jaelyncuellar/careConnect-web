// backend/src/features/carePlans/carePlans.schema.js 

export const createCarePlanSchema = {
  type: "object",
  required: ["client_id", "created_by", "focus_area", "start_date"],
  additionalProperties: false, 
  properties: {
    client_id: { type: "string", format: "uuid" },
    created_by: { type: "string", format: "uuid" },
    focus_area: { type: "string" },
    start_date: { type: "string", format:"date" },
    end_date: { type: "string" , format: "date"},
    notes: { type: "string" },
  }
}
export const updateCarePlanSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    focus_area: { type: "string" },
    start_date: { type: "string", format:"date" },
    end_date: { type: "string" , format: "date"},
    notes: { type: "string" },
  }
}


