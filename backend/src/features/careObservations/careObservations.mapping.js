const toCareObservationsDTO = (row) => { 
    if (!row) return null; 
    return { 
        id: row.id,
        careGoalId: row.care_goal_id, 
        staffId: row.staff_id,
        observedAt: row.observed_at, 
        success: row.success, 
        notes: row.notes, 
        createdAt: row.created_at
    }
}