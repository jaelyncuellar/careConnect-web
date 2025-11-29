const express = require("express"); 
const router = express.Router(); 
const notes_controller = require("./attendanceController"); 

router.get("/test", (req, res) => { 
  res.json({ message: "notes works!" });
});

//CRUD 
router.get("/", notes_controller.getAll); 
router.get("/:id", notes_controller.getOne); 
router.post("/", notes_controller.create); 
router.put("/:id", notes_controller.update); 
router.delete("/:id", notes_controller.remove); 


module.exports=router; 