// backend/src/features/clientNotes/clientNotes.controller.js

import * as clientNotesService from "./clientNotes.service.js"; 

export const getAll = async (req, res) => { 
    try { 
        const clientNotes = await clientNotesService.getAllClientNotes(); 
        res.json(clientNotes);
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to fetch clientNotes"}); 
    }
}; 
export const getOne = async(req, res) => {
    try { 
        const clientNote = await clientNotesService.getClientNoteById(req.params.id); 
        if (!clientNote) return res.status(404).json({ error: "clientNote not found"}); 
        res.json(clientNote); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to fetch clientNote"}); 
    }
}; 

export const create = async(req, res) => { 
    try { 
        const newClientNote = await clientNotesService.createClientNote(req.body); 
        res.status(201).json(newClientNote); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({error: "failed to create newClientNote"}); 
    }
}; 
export const update = async(req, res) => { 
  try {
    const updatedClientNote = await clientNotesService.updateClientNote(req.params.id, req.body);
    if (!updatedClientNote) return res.status(404).json({ error: "clientNote not found" });
    res.json(updatedClientNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update clientNote" });
  } 
}; 

export const remove = async(req, res) => { 
  try {
    await clientNotesService.deleteClientNote(req.params.id);
    res.json({ message: "clientNote deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete clientNote" });
  }
}; 
