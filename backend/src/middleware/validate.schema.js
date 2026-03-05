// customized middleware to validate schema before moving on 

import Ajv from "ajv"; 
import addFormats from "ajv-formats"; 

const ajv = new Ajv({allErrors: true}); // creates validator 
// dont stop at 1st mistake, tell me all the errors 

addFormats(ajv); // validates formats like "date", "time", etc 

export const validateSchema = (schema) => { 
    const validate = ajv.compile(schema); 
    // happens once when server starts - not on every req so performance good 

    return (req, res, next)=> { // return middleware fn 
        // fn runs when a request hits the route 
        const valid = validate(req.body); 
        if (!valid) { 
            return res.status(400).json({ 
                message: "Invalid request data", 
                errors: validate.errors, 
            });
        }
        next(); // data looks good, continue to controller 
    };
}; 