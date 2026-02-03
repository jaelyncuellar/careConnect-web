// backend/src/features/clients/clients.router.js

import { Router } from "express"; 
import { validateSchema } from "../../middleware/validate.schema.js"; 
import { createClientSchema, updateClientSchema} from "./clients.schema.js"; 
import clientsController from "./clients.controller.js"; 

const router = Router();

router.get("/", clientsController.getAll); 
router.get("/:id", clientsController.getOne); 
router.post("/", validateSchema(createClientSchema), clientsController.create); 
router.patch("/:id", validateSchema(updateClientSchema), clientsController.update); 
router.delete("/:id", clientsController.remove); 

export default router; 





