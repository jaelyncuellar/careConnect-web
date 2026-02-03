// backend/src/features/attendance/attendance.schema.js

export const createAttendanceSchema = { 
    type: "object", 
    required: ["staff_id","client_id", "shift_date"],
    additionalProperties: true, 
    properties: { 
        staff_id: { type: "string", format: "uuid"}, 
        client_id: {type: "string", format: "uuid"},
        shift_date: { type: "string", format: "date" }, 
        time_in: { type: "string", pattern: "^\\d{2}:\\d{2}(:\\d{2})?$" },
        time_out: { type: "string", pattern: "^\\d{2}:\\d{2}(:\\d{2})?$" }, 
        status: { type: "string", enum: ["on-time", "late", "absent"]
        },
    },
};

export const updateAttendanceSchema = { 
    type: "object", 
    additionalProperties: true, 
    properties: { 
        staff_id: { type: "string", format: "uuid"}, 
        client_id: {type: "string", format: "uuid" },
        shift_date: { type: "string", format: "date" }, 
        time_in: { type: "string", pattern: "^\\d{2}:\\d{2}(:\\d{2})?$" },
        time_out: { type: "string", pattern: "^\\d{2}:\\d{2}(:\\d{2})?$" }, 
        status: { type: "string", enum: ["on-time", "late", "absent"]
        },
    }, 
};