// backend/src/features/taskCompletions/taskCompletions.router.js

import { Router } from "express"; 
import { validateSchema } from "../../middleware/validate.schema.js"
import { createTaskCompletionSchema, updateTaskCompletionSchema}  from "./taskCompletions.schema.js";

import { getAll, getOne, create, update, remove
} from "./taskCompletions.controller.js"; 

const router = Router(); 

router.get("/", getAll);
router.get("/:id", getOne); 
router.post("/", validateSchema(createTaskCompletionSchema), create); 
router.patch("/:id", validateSchema(updateTaskCompletionSchema), update); 
router.delete("/:id", remove); 

export default router; 
