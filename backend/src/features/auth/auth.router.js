import express from "express"; 
import { validateSchema } from "../../middleware/validate.schema.js"
import { registerSchema, loginSchema } from "./auth.schema.js";
import { register, login } from "./auth.controller.js";

const router = express.Router(); 

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);

export default router;