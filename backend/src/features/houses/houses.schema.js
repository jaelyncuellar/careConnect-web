// backend/src/features/houses/houses.schema.js

export const createHouseSchema = { 
  type: "object",
  required: [ "address", "nickname","start_date", "active"],
  additionalProperties: false, 
  properties: {
    address: { type: "string" },
    nickname: { type: "string" },
    start_date: { type: "string", format: "date" },
    active: { type: "boolean" },
  }
};

export const updateHouseSchema = { 
  type: "object",
  additionalProperties: false, 
  properties: {
    address: { type: "string" },
    nickname: { type: "string" },
    start_date: { type: "string", format: "date" },
    active: { type: "boolean" },
  }
}