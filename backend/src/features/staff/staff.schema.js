export const createStaffSchema = { 
    type:"object", 
    required: [ "firstName", "lastName", "role", "phone", "email","password", "address", "startDate"],
    additionalProperties: false, 
    properties: { 
        firstName: { type: "string"}, 
        lastName: { type: "string"}, 
        role: { 
            type: "string", 
            enum: ["caregiver", "nurse", "admin"]
        },
        phone: { type: "string", minLength:10 }, 
        email: { type: "string", format: "email"}, 
        address: { type: "string"}, 
        startDate: { type: "string", format: "date"}, 
        endDate: { type: "string", format: "date"}, 
        active: { type: "boolean"}, 
        password: { type: "string", minLength: 4},
    },
};

export const updateStaffSchema = { 
    type:"object", 
    additionalProperties: false, 
    properties: { 
        firstName: { type: "string"}, 
        lastName: { type: "string"}, 
        role: { 
            type: "string", 
            enum: ["caregiver", "nurse", "admin"]
        },
        email: { type: "string"}, 
        phone: { type: "string", minLength:10}, 
        address: { type: "string"}, 
        startDate: { type: "string", format: "date"}, 
        endDate: { type: "string", format: "date"}, 
        active: { type: "boolean"}, 
        password: { type: "string", minLength: 4},
    },
};