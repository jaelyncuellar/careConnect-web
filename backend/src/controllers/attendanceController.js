import { readData, writeData } from "../utils/readWrite.js"
const FILE_NAME = "attendance.json"; 

export const getAll = (req,res) => { 
    const records = readData(FILE_NAME) || []; 
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
    const { employeeId, date, timeIn, timeOut, status } = req.body; 

    const newRecord = { 
        id: Date.now(), 
        employeeId, 
        date, 
        timeIn,
        timeOut: timeOut || null, 
        status 
    }; 
    records.push(newRecord); 
    writeData(FILE_NAME, records); 
    res.status(201).json(newRecord); 
}; 

export const update = (req, res) => { 
    const records = readData(FILE_NAME);
    const id = Number(req.params.id); 
    const idx = records.findIndex(r=>r.id === id); 
    if (idx === -1) return res.status(404).json({message: "Not found" }); 

    records[idx] = {...records[idx], ...req.body }; 
    writeData(FILE_NAME, records); 

    res.json(records[idx]); 
}; 

export const remove = (req, res) => { 
    const records = readData(FILE_NAME);
    const id = Number(req.params.id); 
    const newRecords = records.filter(r=>r.id != id); 
    writeData(FILE_NAME, newRecords); 
    res.json({ message: "Deleted"});
    return res.status(204).send();
} 

export const test = (req, res) => {
  res.json({ message: "attendance api works!" });
}

