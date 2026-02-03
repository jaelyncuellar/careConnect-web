// backend/src/features/taskCompletions/taskCompletions.controller.js

import * as taskCompletionsService from "./taskCompletions.service.js"; 

export const getAll = async(req, res) => { 
    try {
        const taskCompletions = await taskCompletionsService.getAllTaskCompletion(); 
        res.json(taskCompletions); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to fetch task completions"}); 
    }
}

export const getOne = async(req,res) => { 
    try {
        const taskCompletion = await taskCompletionsService.getTaskCompletionById(
            req.params.id); 
        if (!taskCompletion) { 
            return res.status(404).json({error: "taskCompletion not found" });
        }
    res.json(taskCompletion);
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to fetch task completion"}); 
    }
}

export const create = async(req, res) => { 
    try {
        const taskCompletion = await taskCompletionsService.createTaskCompletion(req.body); 
        res.status(201).json(taskCompletion); 
    } catch (err) { 
        console.error(err); 
        res.status(500).json({ err: err.message}); 
        res.status(500).json({ err: "failed to create task completion"}); 
    }
} 

export const update = async(req,res) => { 
    try { 
        const updated = await taskCompletionsService.updateTaskCompletion(
        req.params.id, req.body); 
        if (!updated) { 
            return res.status(404).json({error: "taskCompletion not found"}); 
        }
        res.json(updated); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({error: "failed to create update task completion"}); 
    }
}

export const remove = async(req, res) => { 
    try { 
        await taskCompletionsService.deleteTaskCompletion(req.params.id); 
        res.status(204).send();
    } catch (error) { 
        console.error(error);
        res.status(500).json({ error: "Failed to delete task completion" });
    }
}
