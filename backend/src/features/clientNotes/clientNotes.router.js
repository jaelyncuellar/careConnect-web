// backend/src/features/clientNotes/clientNotes.router.js

import express from "express"; 
const router = express.Router(); 
import { validateSchema } from "../../middleware/validate.schema.js"
import { createClientNoteSchema, updateClientNoteSchema }  from "./clientNotes.schema.js";

import { getAll, getOne, create, update, remove
} from "./clientNotes.controller.js"; 

router.get("/", getAll);
router.get("/:id", getOne); 
router.post("/", validateSchema(createClientNoteSchema), create); 
router.patch("/:id", validateSchema(updateClientNoteSchema), update); 
router.delete("/:id", remove); 

export default router; 