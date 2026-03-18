export const createClientSchema = {
  type: "object",
  required: ["firstName", "lastName", "levelOfCare", "phone", "guardianFirstName", "guardianLastName", "guardianPhone", "startDate"],
  additionalProperties: false, 
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    levelOfCare: { type: "string" },
    phone: { type: "string" },
    houseId: { type: "string" },
    guardianFirstName: { type: "string" },
    guardianLastName: { type: "string" },
    guardianPhone: { type: "string" },
    startDate: { type: "string", format: "date" },
    endDate: { type: "string",format: "date" },
    meds: { type: "string" },
    active: { type: "boolean" }
  }
}
export const updateClientSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    levelOfCare: { type: "string" },
    phone: { type: "string" },
    houseId: { type: "string" },
    guardianFirstName: { type: "string" },
    guardianLastName: { type: "string" },
    guardianPhone: { type: "string" },
    startDate: { type: "string", format: "date" },
    endDate: { type: "string",format: "date" },
    meds: { type: "string" },
    active: { type: "boolean" }
  }
}


