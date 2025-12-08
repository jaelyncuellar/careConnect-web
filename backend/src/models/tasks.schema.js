export const tasksSchema = { 
    type: "object", 
    properties: { 
        id: { type: "string" }, 
        title: { type: "string"}, 
        clientId: { type: "string"}, 
        description: {type: "string"}, 
        status: { 
            type: "string", 
            enum: ["pending", "in-progress", "completed"]
        }, 
        dueDate: { type: "string", format: "date"}, 
        assignedTo: { type: "string" }
    }, 
    required: ["title", "status"]
}