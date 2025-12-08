

import { readData, writeData } from "../utils/readWrite.js"; 
const FILE_NAME = "carePlans.json"; 

export const getAll = (req, res) => { 
    const plans = readData(FILE_NAME) || []; 
    res.json(plans); 
}; 

export const getOne = (req, res) => { 
    const plans = readData(FILE_NAME); 
    const plan = plans.find(p=> p.id === Number(req.params.id)); 
    if (!plan) { 
        return res.status(404).json({error: "Care plan not found" });
    }
  res.json(plan);
};

export const create = (req, res) => { 
    const plans = readData(FILE_NAME);
    const { clientName, clientId, planType, goals, tasks } = req.body; //aligns w schema 
    const newPlan = { 
        id: Date.now(), 
        clientName, 
        clientId: clientId || null, 
        planType, 
        goals, 
        tasks: tasks || [], 
        lastUpdated: new Date().toISOString()
    }; 
    plans.push(newPlan); 
    writeData(FILE_NAME, plans);
    res.status(201).json(newPlan); 
}; 

export const update = (req, res) => { 
    const plans = readData(FILE_NAME);
    const id = Number(req.params.id); 
    const idx = plans.findIndex(p=>p.id === id); 
    if (idx === -1) return res.status(404).json({ message: "Not found"}); 

    plans[idx] = { ...products[idx], ...req.body, lastUpdated: new Date().toISOString() }; 
    writeData(FILE_NAME, plans);
    res.json(plans[idx]); 
}; 

export const remove = (req, res) => { 
    const plans = readData(FILE_NAME); 
    const id = Number(req.params.id); 
    const newPlans = plans.filter(p => p.id !== id); 
    writeData(FILE_NAME, newPlans);
    res.status(204).send();
}; 
