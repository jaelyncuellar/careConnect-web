import { pool } from "../../db/db.js"
import * as toCarePlanDTO from "./carePlans.mapping.js"

export const getAllCarePlans = async() => { 
    const result = await pool.query(
        `SELECT 
            cp.id, 
            cp.focus_area, 
            cp.created_by, 
            cp.start_date,
            c.first_name, 
            c.last_name
        FROM care_plans cp 
        JOIN clients c ON cp.client_id = c.id 
        ORDER BY cp.start_date DESC
        `); 
    return result.rows.map(toCarePlanDTO(row))
}

export const getCarePlanById = async(id) => { 
    const result = await pool.query(
        `SELECT 
            cp.id, 
            cp.focus_area, 
            cp.created_by, 
            cp.start_date,
            c.first_name, 
            c.last_name
        FROM care_plans cp 
        JOIN clients c ON cp.client_id = c.id 
        WHERE cp.id=$1 
        `,
        [id]
    );
    if (result.rows.length === 0) return null; 
    return toCarePlanDTO(result.rows[0]); 
}

export const createCarePlan = async(data) => { 
    const { 
        clientId, createdBy, focusArea, 
        startDate, endDate, notes
    } = data; 

    const result = await pool.query( 
        `
        INSERT INTO care_plans 
            (client_id, created_by, focus_area, start_date, end_date, notes) 
        VALUES 
            ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `, 
        [clientId, createdBy, focusArea, startDate, endDate, notes]
    );

    const row = result.rows[0];
    return { 
        carePlanId: row.id,// return ID so can redirect when nec. , attach more info 
        focusArea: row.focus_area, 
        lastUpdated: row.updated_at 
    };
}

export const updateCarePlan = async(id, data) => { 
    const { focusArea, startDate, endDate, notes } = data; 
     
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
        [focusArea, startDate, endDate, notes, id]
    ); 
    return toCarePlanDTO(result.rows[0]);  // do i want to return the entire row? 
}

export const deleteCarePlan = async(id) => { 
    await pool.query( "DELETE FROM care_plans WHERE id=$1 ", [id]); 
    return { success: true };
}