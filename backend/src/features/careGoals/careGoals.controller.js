// backend/src/features/careGoals/careGoals.controller.js

import * as careGoalsService from "./careGoals.service.js"; 
export const getAll = async(req, res) => { 
    try {
    const careGoals = await careGoalsService.getAllCareGoals(); 
    res.json(careGoals); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to fetch caregoals"}); 
    }
}

export const getOne = async(req,res) => { 
    try { 
        const careGoal = await careGoalsService.getCareGoalById(
        req.params.id); 
        if (!careGoal) { 
            return res.status(404).json({error: "Care goal not found" });
        }
        res.json(careGoal);
    }  catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to fetch caregoal"}); 
    }
}


export const create = async(req, res) => { 
    try { 
        const careGoal = await careGoalsService.createCareGoal(req.body); 
        res.status(201).json(careGoal); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to create caregoal"}); 
    }
} 

export const update = async(req,res) => { 
    try {
        const updated = await careGoalsService.updateCareGoal(
            req.params.id, req.body); 
        if (!updated) { 
            return res.status(404).json({error: "Care goal not found"}); 
        }
        res.json(updated); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update care goal" });
    } 
}

export const remove = async(req, res) => { 
    try { 
        await careGoalsService.deleteCareGoal(req.params.id); 
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete care goal" });
    } 
}
