// backend/src/features/clients/clients.controller.js

import * as clientService from "./clients.service.js"; 

const getAll = async (req, res) => { 
    try { 
        const clients = await clientService.getAllClients(); 
        res.json(clients);
    } catch (err) { 
        console.error(err); 
        res.status(500).json({ error: "failed to fetch clients"}); 
    }
}; 
const getOne = async(req, res) => {
    try { 
        const client = await clientService.getClientById(req.params.id); 
        if (!client) return res.status(404).json({ error: "Client not found"}); 
        res.json(client); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ error: "failed to fetch client"}); 
    }
}; 

const create = async(req, res) => { 
    try { 
        const newClient = await clientService.createClient(req.body); 
        res.status(201).json(newClient); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({error: "failed to create client"}); 
    }
}; 
const update = async(req, res) => { 
  try {
    const updatedClient = await clientService.updateClient(req.params.id, req.body);
    if (!updatedClient) return res.status(404).json({ error: "Client not found" });
    res.json(updatedClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update client" });
  } 
}; 

const remove = async(req, res) => { 
  try {
    await clientService.deleteClient(req.params.id);
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete client" });
  }
}; 

export default { 
    getAll,
    getOne, 
    create, 
    update, 
    remove,
};