// backend/src/features/clientTasks/clientTasks.router.js


import express from "express"; 
const router = express.Router(); 
import { validateSchema } from "../../middleware/validate.schema.js"
import { createClientTaskSchema, updateClientTaskSchema }  from "./clientTasks.schema.js";

import { getAll, getOne, create, update, remove
} from "./clientTasks.controller.js"; 

router.get("/", getAll);
router.get("/:id", getOne); 
router.post("/", validateSchema(createClientTaskSchema), create); 
router.patch("/:id", validateSchema(updateClientTaskSchema), update); 
router.delete("/:id", remove); 

export default router; 