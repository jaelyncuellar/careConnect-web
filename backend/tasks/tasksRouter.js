
import express from "express"; 
import { validateSchema } from "../middleware/validateSchema.js"
import { taskSchema } from "./task.schema.js";
import { 
    getAll, create, update, remove
} from "../controllers/taskController.js"; 

const router = express.Router(); 

// CRUD routes 
router.get("/", getAll);
router.get("/:id", getOne); 
router.post("/", validateSchema(taskSchema), create); 
router.put("/:id", update); 
router.delete("/:id", remove); 

export default router; 


