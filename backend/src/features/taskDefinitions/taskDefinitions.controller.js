// backend/src/features/taskDefinitions/taskDefinitions.controller.js 

import * as taskDefinitionsService from "./taskDefinitions.service.js"; 

export const getAll = async(req, res) => { 
    try {
        const taskDefinitions = await taskDefinitionsService.getAllTaskDefinitions(); 
        res.json(taskDefinitions); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to fetch all task defintions"}); 
    }
}

export const getOne = async(req,res) => { 
    try {
        const taskDefinition = await taskDefinitionsService.getTaskDefinitionById(
            req.params.id); 
        if (!taskDefinition) { 
            return res.status(404).json({error: "taskCompletion not found" });
        }
    res.json(taskDefinition);
    } catch (err) { 
        console.error(err); 
        res.status(500).json({ err: err.message })
        res.status(500).json({ err: "failed to fetch specified task defintion"}); 
    }
}

export const create = async(req, res) => { 
    try {
        const taskDefinition = await taskDefinitionsService.createTaskDefinition(req.body); 
        res.status(201).json(taskDefinition); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({error: "failed to create task defintion"}); 
    }
} 

export const update = async(req,res) => { 
    try {
        const updated = await taskDefinitionsService.updateTaskDefinition(
            req.params.id, req.body); 
        if (!updated) { 
            return res.status(404).json({error: "TaskDefinition not found"}); 
        }
        res.json(updated); 
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task defintion" });
  } 
}

export const remove = async(req, res) => { 
    try { 
        await taskDefinitionsService.deleteTaskDefinition(req.params.id); 
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete task defintion" });
    }
}
