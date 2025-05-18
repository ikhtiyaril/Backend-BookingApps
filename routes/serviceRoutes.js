const express = require('express');
const router = express.Router();
const { Service } = require('../models');  



console.log(Service)

router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    console.log("Data received:", JSON.stringify(req.body, null, 2));

    const { name, duration, price,features,description } = req.body;

    

    const newService = await Service.create({ name, duration, price,features,description });
    res.status(201).json(newService);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error adding service', error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duration, price, features,description } = req.body;

    
    const service = await Service.findByPk(id);
    if (service) {
      service.name = name;
      service.duration = duration;
      service.price = price;
      service.features = features;
      service.description = description
      await service.save();
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (service) {
      await service.destroy();
      res.json({ message: 'Service deleted' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
});

module.exports = router;
