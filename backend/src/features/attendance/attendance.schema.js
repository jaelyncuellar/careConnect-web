export const createAttendanceSchema = { 
    type: "object", 
    required: ["staffId","clientId", "shiftDate"],
    additionalProperties: true, 
    properties: { 
        staffId: { type: "string", format: "uuid"}, 
        clientId: {type: "string", format: "uuid"},
        shiftDate: { type: "string", format: "date" }, 
        timeIn: { type: "string", pattern: "^\\d{2}:\\d{2}(:\\d{2})?$" },
        timeOut: { type: "string", pattern: "^\\d{2}:\\d{2}(:\\d{2})?$" }, 
        status: { type: "string", enum: ["on-time", "late", "absent"]
        },
    },
};

export const updateAttendanceSchema = { 
    type: "object", 
    additionalProperties: true, 
    properties: { 
        timeIn: { type: "string", pattern: "^\\d{2}:\\d{2}(:\\d{2})?$" },
        timeOut: { type: "string", pattern: "^\\d{2}:\\d{2}(:\\d{2})?$" }, 
        status: { type: "string", enum: ["on-time", "late", "absent"]
        },
    }, 
};