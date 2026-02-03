// backend/src/features/clientTasks/clientTasks.controller.js

import * as clientTaskService from "./clientTasks.service.js"; 

export const getAll = async (req, res) => { 
    try { 
        const clientTask = await clientTaskService.getAllClientTasks(); 
        res.json(clientTask);
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to fetch clientTask"}); 
    }
}; 
export const getOne = async(req, res) => {
    try { 
        const clientTask = await clientTaskService.getClientTaskById(req.params.id); 
        if (!clientTask) return res.status(404).json({ error: "clientTask not found"}); 
        res.json(clientTask); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to fetch clientTask"}); 
    }
}; 

export const create = async(req, res) => { 
    try { 
        const newClientTask = await clientTaskService.createClientTask(req.body); 
        res.status(201).json(newClientTask); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({error: "failed to create newClientTask"}); 
    }
}; 
export const update = async(req, res) => { 
  try {
    const updatedClientTask = await clientTaskService.updateClientTask(req.params.id, req.body);
    if (!updatedClientTask) return res.status(404).json({ error: "clientTask not found" });
    res.json(updatedClientTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update clientTask" });
  } 
}; 

export const remove = async(req, res) => { 
  try {
    await clientTaskService.deleteClientTask(req.params.id);
    res.json({ message: "clientTask deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete clientTask" });
  }
}; 