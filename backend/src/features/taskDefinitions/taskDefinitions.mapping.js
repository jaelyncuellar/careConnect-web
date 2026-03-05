const toTaskDefinitionsDTO = (row) => { 
    if (!row) return null; 
    return { 
        id: row.id,
        title: row.title, 
        description: row.description,
        createdAt: row.created_at, 
        carePlanId: row.care_plan_id
    }
}