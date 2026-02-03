// backend/src/features/clientTasks/clientTasks.schema.js

export const createClientTaskSchema = { 
    type:"object", 
    required: [ "client_id", "care_plan_id"],
    additionalProperties: false, 
    properties: { 
        client_id: { type: "string", format: "uuid"}, 
        frequency: { type: "string"}, 
        active: { type: "boolean"}, 
        care_plan_id: { type: "string", format: "uuid"}, 
        task_definition_id: { type: "string", format: "uuid"}, 
    },
};

export const updateClientTaskSchema = { 
    type:"object", 
    additionalProperties: false, 
    properties: { 
        client_id: { type: "string", format: "uuid"}, 
        frequency: { type: "string"}, 
        active: { type: "boolean"}, 
        care_plan_id: { type: "string", format: "uuid"}, 
        task_definition_id: { type: "string", format: "uuid"}, 
    },
};