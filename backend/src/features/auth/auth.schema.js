export const registerSchema = {
  type: "object",
  required: ["firstName", "lastName", "role", "phone", "email", "password", "address"],
  properties: {
    firstName: { type: "string"}, 
    lastName: { type: "string"}, 
    role: { type: "string"}, 
    phone: { type: "string"}, 
    email: { type: "string", format: "email"}, 
    password: { type: "string", minLength: 1}, 
    address: { type: "string"},
    // startDate: { type: "string", pattern: "^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$" }
    startDate: { type: "string", format: "date" }
  },
  // additionalProperties: false
};

export const loginSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 1 }
  },
  additionalProperties: false
};