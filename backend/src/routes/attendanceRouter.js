import express from "express"; 
import { validateSchema } from "../middleware/validateSchema.js"
import { attendanceSchema } from "../models/attendance.schema.js";

import { getAll, getOne, create, update, remove, test
} from "../controllers/attendanceController.js"

const router = express.Router(); 

// CRUD routes 
router.get("/", getAll); 
router.get("/:id", getOne); 
router.post("/", validateSchema(attendanceSchema), create); 
router.put("/:id", validateSchema(attendanceSchema), update); 
router.delete("/:id", remove); 
router.get("/test", test);

export default router; 