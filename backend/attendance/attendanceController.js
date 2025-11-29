

const { readData, writeData } = require("../utils/readWrite"); 
const FILE_NAME = "notes.json"; 

// GET ALL 
exports.getAll = (req,res) => { 
    const notes = readData(FILE_NAME); 
    res.json(notes);
}; 

// GET ONE 
exports.getOne = (req, res) => { 
    const notes = readData(FILE_NAME); 
    const note = notes.find(n => n.id === Number(req.params.id)); 
    if (!note) return res.status(404).json({message: "Not found" }); 
    res.json(note); 
}; 

// CREATE 
exports.create = (req,res) => { 
    const notes = readData(FILE_NAME);
    const { title, content } = req.body; 
    const newNote = {
        id:Date.now(), 
        title, 
        content
    }; 
    notes.push(newNote); 
    writeData(FILE_NAME, notes); 
    res.status(201).json(newNote); 
}; 

// UPDATE 
exports.update = (req, res) => { 
    const notes = readData(FILE_NAME);
    const id = Number(req.params.id); 

    const index = notes.findIndex(n=>n.id === id); 
    if (index === -1) return res.status(404).json({message: "Not found" }); 

    notes[index] = {...notes[index], ...req.body }; 
    writeData(FILE_NAME, notes); 

    res.json(notes[index]); 
}; 

// DELETE
exports.remove = (req, res) => { 
    const notes = readData(FILE_NAME);
    const id = Number(req.params.id); 

    const newNotes = notes.filter(n=>n.id != id); 
    writeData(FILE_NAME, newNotes); 
    
    res.json({ message: "Deleted"});
}; 

exports.test = (req, res) => {
  res.json({ message: "api notes works!" });
};

