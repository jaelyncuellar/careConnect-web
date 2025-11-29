import {readData, writeData } from ("../utils/readWrite"); 
const FILE = "../data/care-plans.json"; 

export const getAll = (req, res) => { 
    const plans = readData(FILE); 
    res.json(plans); 
}; 

export const getOne = (req, res) => { 
    const plans = readData(FILE); 
    const plan = plans.find(p=> p.id === req.params.id); 

    if (!plan) { 
        return res.status(404).json({error: "Care plan not found" });
    }
  res.json(plan);
};

export const create = (req, res) => { 
    const plans = readData(FILE);
    const { clientId, goals, tasks } = req.body; //aligns w schema 
    const newPlan = { 
        id: Date.now(), 
        clientId, 
        goals, 
        tasks
    }; 
    plans.push(newPlan); 
    writeData(FILE, plans);
    res.status(201).json(newPlan); 
}; 

export const update = (req, res) => { 
    const plans = readData(FILE);
    const id = Number(req.params.id); 
    const index = plans.findIndex(p=>p.id === id); 
    if (i===-1) return res.status(404).json({ message: "Not found"}); 

    plans[index] = { ...products[index], ...req.body }; 
    writeData(FILE, plans);
    res.json(plans[index]); 
}; 

export const remove = (req, res) => { 
    const plans = readData(FILE); 
    const id = Number(req.params.id); 
    
    const newPlans = products.filter(p => p.id !== id); 
    writeData(FILE, newPlans);
    
    res.json({ message: "Deleted"}); 
}; 
