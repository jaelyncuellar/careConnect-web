const toTaskCompletionsDTO = (row) => { 
    if (!row) return null; 
    return { 
        id: row.id, 
        clientTaskId: row.client_task_id, 
        staffId: row.staff_id, 
        completedAt: row.completed_at, 
        initials: row.initials,
        notes: row.notes
    }
}