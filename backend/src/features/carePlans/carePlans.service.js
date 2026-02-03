// backend/src/features/carePlans/carePlans.service.js
import { pool } from "../../db/db.js"

export const getAllCarePlans = async() => { 
    const result = await pool.query( 
        "SELECT * FROM care_plans ORDER BY created_at DESC"
    ); 
    return result.rows; 
}
export const getCarePlanById = async(id) => { 
    const result = await pool.query(
        "SELECT * FROM care_plans WHERE id=$1", 
        [id]
    ); 
    return result.rows[0]; 
}
export const createCarePlan = async(data) => { 
    const { 
        client_id, 
        created_by, 
        focus_area, 
        start_date, 
        end_date, 
        notes
    } = data; 

    const result = await pool.query( 
        `
        INSERT INTO care_plans 
            (client_id, created_by, focus_area, start_date, end_date, notes) 
        VALUES 
            ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `, 
        [client_id, created_by, focus_area, start_date, end_date, notes]
    );
    return result.rows[0]; 
}

export const updateCarePlan = async(id, data) => { 
    const { focus_area, start_date, end_date, notes } = data; 
     
    const result = await pool.query( 
        `
        UPDATE care_plans
        SET 
            focus_area = COALESCE($1, focus_area), 
            start_date = COALESCE($2, start_date), 
            end_date = COALESCE($3, end_date), 
            notes = COALESCE($4, notes)
        WHERE id=$5
        RETURNING * 
        `,
        [focus_area, start_date, end_date, notes, id]
    ); 
    return result.rows[0]; 
}

export const deleteCarePlan = async(id) => { 
    await pool.query( 
        "DELETE FROM care_plans WHERE id=$1", 
        [id]
    ); 
}