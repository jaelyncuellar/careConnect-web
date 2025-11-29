import express from "express"; 
import { 
  getAll, getOne, create, update, remove, test
} from "./attendanceController.js"

import { validateSchema } from "../middleware/validateSchema.js"
import { attendanceSchema } from "./attendance.schema.js";

const router = express.Router(); 

// test
router.get("/test", test);

// CRUD routes 
router.get("/", getAll); 
router.get("/:id", getOne); 

// only 1 POST route with validation 
router.post("/", validateSchema(attendanceSchema), create); 

router.put("/:id", update); 
router.delete("/:id", remove); 

export default router; 