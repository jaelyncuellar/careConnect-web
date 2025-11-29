// middleware/validateSchema.js 

import Ajv from "ajv"; 

const ajv = new Ajv({allErrors: true}); 

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