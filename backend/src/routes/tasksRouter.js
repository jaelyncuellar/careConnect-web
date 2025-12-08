
import express from "express"; 
import { validateSchema } from "../middleware/validateSchema.js"
import { tasksSchema } from "../models/tasks.schema.js";
import { getAll, getOne, create, update, remove } from "../controllers/tasksController.js"; 

const router = express.Router(); 

// CRUD routes 
router.get("/", getAll);
router.get("/:id", getOne); 
router.post("/", validateSchema(tasksSchema), create); 
router.put("/:id", validateSchema(tasksSchema),update); 
router.delete("/:id", remove); 

export default router; 


