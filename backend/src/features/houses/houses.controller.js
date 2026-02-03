// backend/src/features/houses/houses.controller.js

import * as housesService from "./houses.service.js"; 

export const getAll = async(req, res) => { 
    const houses = await housesService.getAllHouses(); 
    res.json(houses); 
}

export const getOne = async(req,res) => { 
    const house = await housesService.getHouseById(
        req.params.id
    ); 
    if (!house) { 
        return res.status(404).json({error: "house not found" });
    }
  res.json(house);
}

export const create = async(req, res) => { 
    try { 
        const newHouse = await housesService.createHouse(req.body); 
        res.status(201).json(newHouse); 
    } catch (err){ 
        console.error(err); 
        res.status(500).json({error:err.message});
        res.status(500).json({error:"failed to create client"});
    }
} 

export const update = async(req,res) => { 
    const updated = await housesService.updateHouse(
        req.params.id, 
        req.body
    ); 
    if (!updated) { 
        return res.status(404).json({error: "Care plan not found"}); 
    }
    res.json(updated); 
}

export const remove = async(req, res) => { 
  try {
    await housesService.deleteHouse(req.params.id);
    res.json({ message: "house deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete house" });
  }
}