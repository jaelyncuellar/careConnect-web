
import express from "express"; 
import { validateSchema } from "../middleware/validateSchema.js"
import { tasksSchema } from "./tasks.schema.js";
import { getAll, getOne, create, update, remove } from "./tasksController.js"; 

const router = express.Router(); 

// CRUD routes 
router.get("/", getAll);
router.get("/:id", getOne); 
router.post("/", validateSchema(tasksSchema), create); 
router.put("/:id", update); 
router.delete("/:id", remove); 

export default router; 


