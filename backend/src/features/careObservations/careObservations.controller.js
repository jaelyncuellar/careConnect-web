// backend/src/features/careObservations/careObservations.controller.js

import * as careObservationsService from "./careObservations.service.js"; 
export const getAll = async(req, res) => { 
    try {
        const careObservations = await careObservationsService.getAllCareObservations(); 
        res.json(careObservations); 
    } catch (err) { 
        res.status(500).json({err: "failed to fetch careObservations"}); 
    }
}

export const getOne = async(req,res) => { 
    try {    
        const careObservation = await careObservationsService.getCareObservationById(
            req.params.id); 
        if (!careObservation) { 
            return res.status(404).json({error: "Care observation not found" });
        }
    res.json(careObservation); 
    } catch (err) { 
        console.error(err); 
        res.status(500).json({err: "failed to fetch careObservation"}); 
    }
};


export const create = async(req, res) => { 
    try {    
        const careObservation = await careObservationsService.createCareObservation(req.body); 
        res.status(201).json(careObservation); 
    } catch (err) { 
        console.error(err); 
        res.status(500).json({error: "failed to fetch careObservation"}); 
    }
} 

export const update = async(req,res) => { 
    try {    
        const updated = await careObservationsService.updateCareObservation(
        req.params.id, 
        req.body
    ); 
    if (!updated) { 
        return res.status(404).json({error: "Care observation not found"}); 
    }
    res.json(updated); 
    } catch (error) { 
        console.error(error);
        res.status(500).json({ error: "Failed to update care observation" });
    }
}

export const remove = async(req, res) => { 
    try { 
        await careObservationsService.deleteCareObservation(req.params.id); 
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete care observation" });
    }
    
}
