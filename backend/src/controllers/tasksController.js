
import { readData, writeData } from "../utils/readWrite.js"; 
const FILE_NAME = "tasks.json"; 

export const getAll = (req, res) => { 
    const tasks = readData(FILE_NAME) || [];
    res.json(tasks); 
}; 

export const getOne = (req, res) => { 
    const tasks = readData(FILE_NAME);
    const task = tasks.find((t) => t.id === Number(req.params.id)); 
    if (!task) return res.status(404).json({ message: "Task not foud"}); 
    res.json(tasks); 
}; 

export const create = (req,res)=> { 
    const tasks = readData(FILE_NAME); 
    const { title, description, assignedTo, dueDate, completed } = req.body;  
    const newTask = { 
        id: Date.now(),
        title, 
        description: description || "", 
        assignedTo: assignedTo || null, 
        dueDate: dueDate || null, 
        completed: completed || false 
    }; 
    tasks.push(newTask); 
    writeData(FILE_NAME, tasks); 
    res.status(201).json(newTask);
}; 

export const update = (req, res) => { 
    const tasks = readData(FILE_NAME); 
    const id = Number(req.params.id); 
    const i = tasks.findIndex((t) => t.id === id); 
    if (i === -1) return res.status(404).json({message: "Not found"}); 

    tasks[i] = {...tasks[i], ...req.body }; 
    writeData(FILE_NAME, tasks); 
    res.json(tasks[i]);
};

export const remove = (req, res) => { 
    const tasks = readData(FILE_NAME); 
    const id = Number(req.params.id); 

    const newTasks = tasks.filter((t) => t.id !== id); 
    writeData(FILE_NAME, newTasks); 
    res.status(204).send();
}

