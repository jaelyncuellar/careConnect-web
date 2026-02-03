// backend/src/features/staff/staff.router.js

import express from "express"; 
import { validateSchema } from "../../middleware/validate.schema.js"
import { createStaffSchema, updateStaffSchema }  from "./staff.schema.js";

import { getAll, getOne, create, update, remove
} from "./staff.controller.js"; 

const router = express.Router(); 

router.get("/", getAll);
router.get("/:id", getOne); 
router.post("/", validateSchema(createStaffSchema), create); 
router.patch("/:id", validateSchema(updateStaffSchema), update); 
router.delete("/:id", remove); 

export default router; 