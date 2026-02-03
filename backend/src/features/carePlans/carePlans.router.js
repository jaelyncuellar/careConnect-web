// backend/src/features/carePlans/carePlans.router.js

import { Router } from "express"; 
import { validateSchema } from "../../middleware/validate.schema.js"
import { createCarePlanSchema, updateCarePlanSchema }  from "./carePlans.schema.js";

import { getAll, getOne, create, update, remove
} from "./carePlans.controller.js"; 

const router = Router(); 

router.get("/", getAll);
router.get("/:id", getOne); 
router.post("/", validateSchema(createCarePlanSchema), create); 
router.patch("/:id", validateSchema(updateCarePlanSchema), update); 
router.delete("/:id", remove); 

export default router; 
