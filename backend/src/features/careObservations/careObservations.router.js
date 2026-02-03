// backend/src/features/careObservations/careObservations.router.js


import { Router } from "express"; 
import { validateSchema } from "../../middleware/validate.schema.js"
import { createCareObservationSchema, updateCareObservationSchema }  from "./careObservations.schema.js";

import { getAll, getOne, create, update, remove
} from "./careObservations.controller.js"; 

const router = Router(); 

router.get("/", getAll);
router.get("/:id", getOne); 
router.post("/", validateSchema(createCareObservationSchema), create); 
router.patch("/:id", validateSchema(updateCareObservationSchema), update); 
router.delete("/:id", remove); 

export default router; 
