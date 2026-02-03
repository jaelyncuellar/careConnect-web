// backend/src/features/houses/houses.service.js

import { pool } from "../../db/db.js"; 


export const getAllHouses = async() => { 
    const result = await pool.query( 
        "SELECT * FROM houses ORDER BY created_at DESC"
    ); 
    return result.rows; 
}
export const getHouseById = async(id) => { 
    const result = await pool.query(
        "SELECT * FROM houses WHERE id=$1", 
        [id]
    ); 
    return result.rows[0]; 
}
export const createHouse = async(data) => { 
    const { 
        address, 
        nickname, 
        start_date, 
        active
    } = data; 

    const result = await pool.query( 
        `
        INSERT INTO houses 
            (address, nickname, start_date, active) 
        VALUES 
            ($1, $2, $3, $4)
        RETURNING *
        `, 
        [address, nickname, start_date, active ?? true]
    );
    return result.rows[0]; 
}

export const updateHouse = async(id, data) => { 
    const fields = Object.keys(data);
    if (fields.length ===0) return null;

    const values = Object.values(data);
    const setClause=fields
        .map((f,i) => `"${f}" = $${i+1}`)
        .join(", ");
     
    const result = await pool.query( 
        `
        UPDATE houses
        SET ${setClause}
        WHERE id = $${fields.length+1}
        RETURNING * 
        `,
        [...values, id]
    ); 
    return result.rows[0]; 
}

export const deleteHouse = async(id) => { 
    await pool.query( 
        "DELETE FROM houses WHERE id=$1", 
        [id]
    ); 
}