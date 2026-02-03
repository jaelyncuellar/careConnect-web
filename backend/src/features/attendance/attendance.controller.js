// backend/src/features/attendance/attendance.controller.js

import * as attendanceService from "./attendance.service.js"; 

export const getAll = async(req,res) => { 
    try { 
        const attendances = await attendanceService.getAttendance();
        res.json(attendances);
    } catch (err) { 
        res.status(500).json({ error: "failed to fetch attendance"}); 
    }
}; 

export const getOne = async(req, res)=> { 
    try { 
        console.log("params:", req.params);
        const attendance = await attendanceService.getOne(req.params.id); 
        if (!attendance) { 
            return res.status(404).json({message: "Attendance not found" }); 
        }
        res.json(attendance); 
    } catch (err) { 
        res.status(500).json({ error: err.message}); 

        // res.status(500).json({ error: "Failed to fetch attendance"}); 
    }
}; 

export const create = async(req,res) => {
    try {
        const attendance = await attendanceService.createAttendance(req.body); 
        res.status(201).json(attendance);
    } catch (err) { 
        console.log(err)
        res.status(500).json({ error: err.message });
        // res.status(500).json({ error: "failed to create attendance"}); 
    }
}; 


export const update = async(req, res) => { 
    try {
        const updated = await attendanceService.updateAttendance(
            req.params.id, 
            req.body); 
        if (!updated) { 
            return res.status(404).json({message: "attendance not found" }); 
        }
        res.json(updated); 
    } catch (err) { 
        console.log(err);
        res.status(500).json({ error: "failed to update attendance"}); 
    }
}; 

export const remove = async(req, res) => { 
    try {
        await attendanceService.deleteAttendance(req.params.id);
        res.status(204).send(); 
    } catch (err) {
        res.status(500).json({ error: "failed to delete attendance"}); 
    }
} 

export const test = async(req, res) => {
  res.json({ message: "attendance api works!" });
}

