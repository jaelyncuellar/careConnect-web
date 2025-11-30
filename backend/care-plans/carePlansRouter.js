
import express from "express"; 
import { validateSchema } from "../middleware/validateSchema.js"
import { carePlanSchema }  from "./carePlans.schema.js";

import { getAll, getOne, create, update, remove
} from "./carePlansController.js"; 

const router = express.Router(); 

// CRUD routes 
router.get("/", getAll);
router.get("/:id", getOne); 
router.post("/", validateSchema(carePlanSchema), create); 
router.put("/:id", update); 
router.delete("/:id", remove); 

export default router; 
