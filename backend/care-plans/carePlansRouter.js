const express = require("express"); 
const router = express.Router(); 
const products = require("./carePlansController"); 

// GET all care plans 
router.get("/", products.getAll);
// GET a single care plan 
router.get("/:id", products.getOne); 
// CREATE new care plan 
router.post("/",  products.create); 
router.put("/:id", products.update); 
// UPDATE A CARE PLAN 
router.delete("/:id", products.remove); 
// DELETE A CARE PLAN 

module.exports = router; 
