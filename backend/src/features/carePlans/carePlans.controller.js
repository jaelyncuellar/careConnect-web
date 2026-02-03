// backend/src/features/carePlans/carePlans.controller.js

import * as carePlanService from "./carePlans.service.js"; 
export const getAll = async(req, res) => { 
    const plans = await carePlanService.getAllCarePlans(); 
    res.json(plans); 
}

export const getOne = async(req,res) => { 
    const plan = await carePlanService.getCarePlanById(
        req.params.id
    ); 
    if (!plan) { 
        return res.status(404).json({error: "Care plan not found" });
    }
  res.json(plan);
}

export const create = async(req,res) => {
    try {
        const carePlan = await carePlanService.createCarePlan(req.body); 
        res.status(201).json(carePlan);
    } catch (err) { 
        console.log(err)
        res.status(500).json({ error: err.message });
        // res.status(500).json({ error: "failed to create attendance"}); 
    }
}; 

export const update = async(req,res) => { 
    const updated = await carePlanService.updateCarePlan(
        req.params.id, 
        req.body
    ); 
    if (!updated) { 
        return res.status(404).json({error: "Care plan not found"}); 
    }
    res.json(updated); 
}

export const remove = async(req, res) => { 
    try {
        await carePlanService.deleteCarePlan(req.params.id);
        res.status(204).send(); 
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
        res.status(500).json({ error: "failed to delete careplan"}); 
    }
} 

