// convert vars before sending to FE 
const toAttendanceDTO = (row) => { 
    if (!row) return null;
    return { 
      id: row.id, 
      staffId: row.staff_id, 
      clientId: row.client_id, 
      shiftDate: row.shift_date, 
      timeIn: row.time_in, 
      timeOut: row.time_out, 
      status: row.status, 
      createdAt: row.created_at
    }
}