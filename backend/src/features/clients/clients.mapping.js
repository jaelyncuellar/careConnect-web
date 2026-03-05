const toClientsDTO = (row) => { 
    if (!row) return null; 
    return {
        id: row.id, 
        name: `${row.first_name} ${row.last_name}`,
        levelOfCare: row.level_of_care, 
        phone: row.phone, 
        houseId: row.house_id, 
        guardianName: `${row.guardian_first_name} ${row.guardian_last_name}`,
        updatedAt: row.updated_at, 
        endDate: row.end_date, 
        meds: row.meds, 
        active: row.active
    }
}; 
