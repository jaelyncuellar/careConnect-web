const toCareGoalsDTO = (row) => { 
    if (!row) return null; 
    return { 
        id: row.id, 
        carePlanId: row.care_plan_id,
        focusArea: row.focus_area, 
        description: row.description, 
        targetFrequency: row.target_frequency, 
        targetPeriod: row.target_period, 
        createdAt: row.created_at
    }
}