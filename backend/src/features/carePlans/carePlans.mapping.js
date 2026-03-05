const toCarePlanDTO = (row) => { 
    if (!row) return null; 
    return { 
        id: row.id, 
        clientFullName: `${row.first_name} ${row.last_name}`, 
        focusArea: row.focus_area, 
        lastUpdated: row.updated_at
    }
}