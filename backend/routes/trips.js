const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');

// Endpoint pour récupérer tous les trajets
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des trajets' });
  }
});

// Endpoint pour ajouter un trajet
router.post('/', async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de l\'ajout du trajet' });
  }
});

// Endpoint pour modifier un trajet
router.put('/:id', async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTrip) return res.status(404).json({ message: 'Trajet non trouvé' });
    res.json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la modification du trajet' });
  }
});

// Endpoint pour supprimer un trajet
router.delete('/:id', async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    if (!deletedTrip) return res.status(404).json({ message: 'Trajet non trouvé' });
    res.json({ message: 'Trajet supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la suppression du trajet' });
  }
});

// Endpoint pour assigner un véhicule à un trajet
router.put('/:id/assign-vehicle', async (req, res) => {
  try {
    const { vehicleId } = req.body;
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Véhicule non trouvé' });

    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trajet non trouvé' });

    trip.assignedVehicle = vehicleId;
    await trip.save();
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de l\'assignation du véhicule' });
  }
});

module.exports = router;
