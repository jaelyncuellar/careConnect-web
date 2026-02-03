// backend/src/features/clientNotes/clientNotes.schema.js

export const createClientNoteSchema = { 
    type:"object", 
    required: [ "client_id", "staff_id", "note"],
    additionalProperties: false, 
    properties: { 
        client_id: { type: "string", format: "uuid"}, 
        staff_id: { type: "string", format: "uuid"}, 
        note: { type: "string"}, 
    },
};

export const updateClientNoteSchema = { 
    type:"object", 
    additionalProperties: false, 
    properties: { 
        client_id: { type: "string", format: "uuid"}, 
        staff_id: { type: "string", format: "uuid"}, 
        note: { type: "string"}, 
    },
};