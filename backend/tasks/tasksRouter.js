const express = require("express"); 
const router = express.Router(); 
const lb = require ("./leaderboardController"); 

router.get("/highest", lb.getHighest);
router.get("/", lb.getAll); 
router.post("/", lb.create); 
router.put("/:id", lb.update); 
router.delete("/:id", lb.remove); 

module.exports = router; 