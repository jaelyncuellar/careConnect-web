export const registerSchema = {
  type: "object",
  required: ["firstName", "lastLame", "role", "phone", "email", "password", "address"],
  properties: {
    firstName: { type: "string"}, 
    lastName: { type: "string"}, 
    role: { type: "string"}, 
    phone: { type: "string"}, 
    email: { type: "string", format: "email"}, 
    password: { type: "string", minLength: 8}, 
    address: { type: "string"}
  },
  additionalProperties: false
};

export const loginSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8 }
  },
  additionalProperties: false
};