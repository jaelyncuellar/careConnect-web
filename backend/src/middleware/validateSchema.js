// middleware/validateSchema.js 

import Ajv from "ajv"; 
import addFormats from "ajv-formats"; 

const ajv = new Ajv({allErrors: true}); 
addFormats(ajv); // enables "date", "time", etc 

export const validateSchema = (schema) => { 
    const validate = ajv.compile(schema); 

    return (req, res,next)=> { 
        const valid = validate(req.body); 
        if (!valid) { 
            return res.status(400).json({ 
                message: "Invalid request data", 
                errors: validate.errors, 
            });
        }
        next(); 
    };
}; 