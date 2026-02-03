// backend/src/features/careGoals/careGoals.router.js



import { Router } from "express"; 
import { validateSchema } from "../../middleware/validate.schema.js"
import { createCareGoalSchema, updateCareGoalSchema }  from "./careGoals.schema.js";

import { getAll, getOne, create, update, remove
} from "./careGoals.controller.js"; 

const router = Router(); 

router.get("/", getAll);
router.get("/:id", getOne); 
router.post("/", validateSchema(createCareGoalSchema), create); 
router.patch("/:id", validateSchema(updateCareGoalSchema), update); 
router.delete("/:id", remove); 

export default router; 
