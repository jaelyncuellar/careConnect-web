

import { readDate, writeData } from "../utils/readWrite"
const FILE_NAME = "../data/attendance.json"; 

export const getAll = (req,res) => { 
    const records = readData(FILE_NAME); 
    res.json(records);
}; 

export const getOne = (req, res) => { 
    const records = readData(FILE_NAME); 
    const record = records.find(r => r.id === Number(req.params.id)); 
    if (!record) return res.status(404).json({message: "Not found" }); 
    res.json(record); 
}; 

export const create = (req,res) => { 
    const records = readData(FILE_NAME);
    const newRecord = { 
        id: Date.now(), 
        ...req.body
    }; 
    records.push(newRecord); 
    writeData(FILE_NAME, records); 
    res.status(201).json(newNote); 
}; 

export const update = (req, res) => { 
    const records = readData(FILE_NAME);
    const id = Number(req.params.id); 

    const index = records.findIndex(r=>r.id === id); 
    if (index === -1) return res.status(404).json({message: "Not found" }); 

    records[index] = {...records[index], ...req.body }; 
    writeData(FILE_NAME, records); 

    res.json(records[index]); 
}; 

export const remove = (req, res) => { 
    const records = readData(FILE_NAME);
    const id = Number(req.params.id); 

    const newRecords = records.filter(r=>r.id != id); 
    writeData(FILE_NAME, newRecords); 
    
    res.json({ message: "Deleted"});
}; 

export const test = (req, res) => {
  res.json({ message: "attendance api works!" });
};

