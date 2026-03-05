export const createClientTaskSchema = { 
    type:"object", 
    required: [ "clientId", "carePlanId"],
    additionalProperties: false, 
    properties: { 
        clientId: { type: "string", format: "uuid"}, 
        frequency: { type: "string"}, 
        active: { type: "boolean"}, 
        carePlanId: { type: "string", format: "uuid"}, 
        taskDefinitionId: { type: "string", format: "uuid"}, 
    },
};

export const updateClientTaskSchema = { 
    type:"object", 
    additionalProperties: false, 
    properties: { 
        clientId: { type: "string", format: "uuid"}, 
        frequency: { type: "string"}, 
        active: { type: "boolean"}, 
        carePlanId: { type: "string", format: "uuid"}, 
        taskDefinitionId: { type: "string", format: "uuid"}, 
    },
};