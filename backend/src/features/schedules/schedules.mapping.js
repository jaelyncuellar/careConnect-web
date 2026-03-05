const toSchedulesDTO = (row) => { 
    if (!row) return null; 
    return { 
        id: row.id, 
        staffId: row.staff_id, 
        clientId: row.client_id, 
        shiftDate: row.shift_date, 
        startTime: row.start_time, 
        endTime: row.end_time, 
        createdAt: row.created_at
    }
}