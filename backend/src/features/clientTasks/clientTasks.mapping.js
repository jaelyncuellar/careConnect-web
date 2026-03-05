const toClientTasksDTO = (row) => { 
  if (!row) return null; 
  return {
    id: row.id, 
    clientId: row.client_id,
    carePlanId: row.care_plan_id, 
    taskDefinitionId: row.task_definition_id, 
    frequency: row.frequency,
    active: row.active, 
    createdAt: row.createdAt 
  }
}