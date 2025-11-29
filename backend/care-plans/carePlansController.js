const {readData, writeData } = require("../utils/readWrite"); 
const FILE = "care-plans.json"; 

// GET ALL 
exports.getAll = (req, res) => { 
    const plans = readData(FILE); 
    res.json(plans); 
}; 

// GET ONE 
exports.getOne = (req, res) => { 
    const plans = readData(FILE); 
    const plan = plans.find(p=> p.id === req.params.id); 

    if (!plan) { 
        return res.status(404).json({error: "Care plan not found" });
  }

  res.json(plan);
}


// CREATE 
exports.create = (req, res) => { 
    const body = req.body; 

    // simple validation 
    if (!body.clientName) { 
        return res.status(400).json({error: "clientName is required"}); 
    }
    con
    const products = readData(FILE_NAME);
    const { name, price, stock } = req.body; 
    const newProduct = { 
        name,
        price, 
        stock
    }; 
    products.push(newProduct); 
    writeData(FILE_NAME, products);
    res.status(201).json(newProduct); 
}; 

// UPDATE 
exports.update = (req, res) => { 
    const products = readData(FILE_NAME);
    const id = Number(req.params.id); 
    const i = products.findIndex(p=>p.id === id); 
    if (i===-1) return res.status(404).json({ message: "Not found"}); 

    products[i] = { ...products[i], ...req.body }; 
    writeData(FILE_NAME,notes);
    res.json(products[i]); 
}; 
// DELETE
exports.remove = (req, res) => { 
    const products = readData(FILE_NAME); 
    const id = Number(req.params.id); 
    
    const newProducts = products.filter(p => p.id !== id); 
    writeData(FILE_NAME, newProducts);
    
    res.json({ message: "Deleted"}); 
}; 
