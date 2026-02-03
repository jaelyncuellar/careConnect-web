
import express from "express"; 
import { validateSchema } from "../../middleware/validate.schema.js"
import { createAttendanceSchema, updateAttendanceSchema } from "./attendance.schema.js";

import { getAll, getOne, create, update, remove, test
} from "./attendance.controller.js";

const router = express.Router(); 

// CRUD routes 
router.get("/", getAll); 
router.get("/:id", getOne); 
router.post("/", validateSchema(createAttendanceSchema), create); 
router.patch("/:id", validateSchema(updateAttendanceSchema), update); 
router.delete("/:id", remove); 
router.get("/test", test);

export default router; 