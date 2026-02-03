// backend/src/features/staff/staff.controller.js

import * as staffService from "./staff.service.js"; 

export const getAll = async (req, res) => { 
    try { 
        const staff = await staffService.getAllStaff(); 
        res.json(staff);
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to fetch staff"}); 
    }
}; 
export const getOne = async(req, res) => {
    try { 
        const staff = await staffService.getStaffById(req.params.id); 
        if (!staff) return res.status(404).json({ error: "staff not found"}); 
        res.json(staff); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to fetch staff"}); 
    }
}; 

export const create = async(req, res) => { 
    try { 
        const newStaff = await staffService.createStaff(req.body); 
        res.status(201).json(newStaff); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({error: "failed to create staff"}); 
    }
}; 
export const update = async(req, res) => { 
  try {
    const updatedStaff = await staffService.updateStaff(req.params.id, req.body);
    if (!updatedStaff) return res.status(404).json({ error: "staff not found" });
    res.json(updatedStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update staff" });
  } 
}; 

export const remove = async(req, res) => { 
  try {
    await staffService.deleteStaff(req.params.id);
    res.status(204).send() // success
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete staff" });
  }
}; 