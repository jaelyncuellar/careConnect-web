export const toStaffDTO = (row) => { 
    if (!row) return null; 
    return {
        id: row.id, 
        name: `${row.first_name} ${row.last_name}`,
        role: row.role, 
        phone: row.phone, 
        email: row.email, 
        startDate: row.start_date, 
        active: row.active, 
    }
}; 
