// backend/src/features/taskDefinitions/taskDefinitions.router.js 

import { Router } from "express"; 
import { validateSchema } from "../../middleware/validate.schema.js"
import { createTaskDefinitionSchema, updateTaskDefinitionSchema }  from "./taskDefinitions.schema.js";

import { getAll, getOne, create, update, remove
} from "./taskDefinitions.controller.js"; 

const router = Router(); 

router.get("/", getAll);
router.get("/:id", getOne); 
router.post("/", validateSchema(createTaskDefinitionSchema), create); 
router.patch("/:id", validateSchema(updateTaskDefinitionSchema), update); 
router.delete("/:id", remove); 

export default router; 
