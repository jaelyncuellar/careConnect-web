// backend/src/features/houses/houses.router.js

import { Router } from "express"; 
import { validateSchema } from "../../middleware/validate.schema.js"
import { createHouseSchema, updateHouseSchema }  from "./houses.schema.js";

import { getAll, getOne, create, update, remove
} from "./houses.controller.js"; 

const router = Router(); 

router.get("/", getAll);
router.get("/:id", getOne); 
router.post("/", validateSchema(createHouseSchema), create); 
router.patch("/:id", validateSchema(updateHouseSchema), update); 
router.delete("/:id", remove); 

export default router; 