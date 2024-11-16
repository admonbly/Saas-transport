const Bus = require('../models/Bus');

// controllers/fleetController.js

exports.addBus = async (req, res, next) => {
    try {
      const newBus = new Bus(req.body);
      await newBus.save();
      res.status(201).send(newBus);
    } catch (error) {
      next(error); // Passe l'erreur au middleware de gestion des erreurs
    }
  };

exports.getBuses = async (req, res) => {
  const buses = await Bus.find();
  res.status(200).send(buses);
};
