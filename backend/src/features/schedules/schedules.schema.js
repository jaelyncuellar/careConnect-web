export const createScheduleSchema = {
  type: "object",
  additionalProperties: false, 
  properties: {
    staffId: { type: "string", format: "uuid" },
    clientId: { type: "string", format: "uuid" },
    shiftDate: { type: "string", format: "date" },
    startTime: { type: "string", pattern: "^([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?$" }, // HH:MM:(opt)SS
    endTime: { type: "string", pattern: "^([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?$" }
  },
  required: ["staffId", "clientId","shiftDate", "startTime", "endTime"]
};


export const updateScheduleSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    staffId: { type: "string", format: "uuid" },
    clientId: { type: "string", format: "uuid" },
    shiftDate: { type: "string", format: "date" },
    startTime: { type: "string", pattern: "^([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?$" },
    endTime: { type: "string", pattern: "^([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?$" }
  },
};