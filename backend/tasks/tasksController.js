const { readData, writeData } = require("../utils/readWrite"); 
const FILE_NAME = "leaderboard.json"; 

// GET ALL SCORES - high -> low 
exports.getAll = (req, res) => { 
    const scores = readData(FILE_NAME);
    const sorted = [...scores].sort((a,b)=>b.score-a.score); 
    res.json(sorted); 
}; 
// CREATE NEW score entry 
exports.create= (req,res)=> { 
    const scores = readData(FILE_NAME); 
    const newEntry = { 
        id: Date.now(),
        username: req.body.username, 
        score: req.body.score
    }; 
    scores.push(newEntry); 
    writeData(FILE_NAME, scores); 
    res.status(201).json(newEntry);
}; 

// UPDATE A SCORE 
exports.update = (req, res) => { 
    const scores = readData(FILE_NAME); 
    const id = Number(req.params.id); 
    const i = scores.findIndex(s=>s.id === id); 
    if (i === -1) return res.status(404).json({message: "Not found"}); 

    scores[i] = {...scores[i], ...req.body }; 
    writeData(FILE_NAME, scores); 
    res.json(scores[i]);
};

// DELETE A SCORE 
exports.remove = (req, res) => { 
    const scores = readData(FILE_NAME); 
    const id = Number(req.params.id); 

    const newScores = scores.filter(p => p.id !== id); 
    writeData(FILE_NAME, newScores); 
    res.json({message: "Deleted"}); 
}; 

// GET HIGHEST SCORE 
exports.getHighest = (req, res) => { 
    const scores = readData(FILE_NAME); 
    
    if (scores.length === 0){ 
        return res.status(404).json({message:"No scores yet"}); 
    }
    const highest = scores.reduce((max,current)=>
        current.score > max.score ? current : max 
    );
    res.json(highest); 
}; 