// backend/src/features/schedules/schedules.controller.js

import * as scheduleService from "./schedules.service.js"; 

export const getAll = async (req, res) => { 
    try { 
        const schedules = await scheduleService.getAllSchedules(); 
        res.json(schedules);
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to fetch schedules"}); 
    }
}; 
export const getOne = async(req, res) => {
    try { 
        const schedule = await scheduleService.getScheduleById(req.params.id); 
        if (!schedule) return res.status(404).json({ error: "schedule not found"}); 
        res.json(schedule); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to fetch schedule"}); 
    }
}; 

export const create = async(req, res) => { 
    try { 
        const newSchedule = await scheduleService.createSchedule(req.body); 
        res.status(201).json(newSchedule); 
    } catch (err) { 
        console.error(err); 
        res.status(500).json({error: err.message}); 
        res.status(500).json({error: "failed to create schedule"}); 
    }
}; 
export const update = async(req, res) => { 
  try {
    const updatedSchedule = await scheduleService.updateSchedule(req.params.id, req.body);
    if (!updatedSchedule) return res.status(404).json({ error: "Schedule not found" });
    res.json(updatedSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update schedule" });
  } 
}; 

export const remove = async(req, res) => { 
  try {
    await scheduleService.deleteSchedule(req.params.id);
    res.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete schedule" });
  }
}; 