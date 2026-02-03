// backend/src/features/schedules/schedules.router.js

import express from "express"; 
import { validateSchema } from "../../middleware/validate.schema.js"
import { createScheduleSchema, updateScheduleSchema } from "./schedules.schema.js";

import { getAll, getOne, create, update, remove
} from "./schedules.controller.js"; 

const router = express.Router(); 

// CRUD routes 
router.get("/", getAll);
router.get("/:id", getOne); 
router.post("/", validateSchema(createScheduleSchema), create); 
router.patch("/:id", validateSchema(updateScheduleSchema), update); 
router.delete("/:id", remove); 

export default router; 