// backend/src/features/staff/staff.schema.js

export const createStaffSchema = { 
    type:"object", 
    required: [ "first_name", "last_name", "role", "phone", "email", "address", "start_date"],
    additionalProperties: false, 
    properties: { 
        first_name: { type: "string"}, 
        last_name: { type: "string"}, 
        role: { 
            type: "string", 
            enum: ["caregiver", "nurse", "admin"]
        },
        phone: { type: "string", minLength:10 }, 
        email: { type: "string", format: "email"}, 
        address: { type: "string"}, 
        start_date: { type: "string", format: "date"}, 
        end_date: { type: "string", format: "date"}, 
        active: { type: "boolean"}, 
    },
};

export const updateStaffSchema = { 
    type:"object", 
    additionalProperties: false, 
    properties: { 
        first_name: { type: "string"}, 
        last_name: { type: "string"}, 
        role: { 
            type: "string", 
            enum: ["caregiver", "nurse", "admin"]
        },
        email: { type: "string"}, 
        phone: { type: "string", minLength:10}, 
        address: { type: "string"}, 
        start_date: { type: "string", format: "date"}, 
        end_date: { type: "string", format: "date"}, 
        active: { type: "boolean"}, 
    },
};