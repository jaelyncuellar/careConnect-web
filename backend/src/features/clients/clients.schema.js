// backend/src/features/clients/clients.schema.js

export const createClientSchema = {
  type: "object",
  required: ["first_name", "last_name", "level_of_care", "phone", "guardian_first_name", "guardian_last_name", "guardian_phone", "start_date"],
  additionalProperties: false, 
  properties: {
    first_name: { type: "string" },
    last_name: { type: "string" },
    level_of_care: { type: "string" },
    phone: { type: "string" },
    house_id: { type: "string" },
    guardian_first_name: { type: "string" },
    guardian_last_name: { type: "string" },
    guardian_phone: { type: "string" },
    start_date: { type: "string", format: "date" },
    end_date: { type: "string",format: "date" },
    meds: { type: "string" },
    active: { type: "boolean" }
  }
}
export const updateClientSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    first_name: { type: "string" },
    last_name: { type: "string" },
    level_of_care: { type: "string" },
    phone: { type: "string" },
    house_id: { type: "string" },
    guardian_first_name: { type: "string" },
    guardian_last_name: { type: "string" },
    guardian_phone: { type: "string" },
    start_date: { type: "string", format: "date" },
    end_date: { type: "string",format: "date" },
    meds: { type: "string" },
    active: { type: "boolean" }
  }
}


