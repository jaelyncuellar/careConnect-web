

export const attendanceSchema = { 
    type: "object", 
    properties: { 
        id: { type: "string" }, 
        employeeId: { type: "string"}, 
        date: { type: "string", format: "date" }, 
        timeIn: { type: "string", pattern: "^\\d{2}:\\d{2}$" },
        timeOut: { type: "string", pattern: "^\\d{2}:\\d{2}$" }, 
        status: { 
            type: "string", 
            enum: ["on-time", "late", "absent"]
        }
    }, 
    required: ["employeeId", "date", "timeIn", "status" ]
}