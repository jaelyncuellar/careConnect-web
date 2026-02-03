// backend/src/features/schedules/schedules.schema.js

export const createScheduleSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    staff_id: { type: "string", format: "uuid" },
    client_id: { type: "string", format: "uuid" },
    shift_date: { type: "string", format: "date" },
    start_time: { type: "string", pattern: "^([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?$" },
    end_time: { type: "string", pattern: "^([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?$" }
  },
  required: ["staff_id", "client_id","shift_date", "start_time", "end_time"]
};


export const updateScheduleSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    staff_id: { type: "string", format: "uuid" },
    client_id: { type: "string", format: "uuid" },
    shift_date: { type: "string", format: "date" },
    start_time: { type: "string", pattern: "^([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?$" },
    end_time: { type: "string", pattern: "^([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?$" }
  },
};