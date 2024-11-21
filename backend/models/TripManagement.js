const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  routeName: { type: String, required: true }, // Nom de l'itinéraire (ex : Paris - Lyon)
  departure: { type: Date, required: true }, // Date et heure de départ
  arrival: { type: Date, required: true }, // Date et heure d'arrivée
  assignedVehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }, // Référence au modèle Vehicle
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Référence au modèle User (chauffeur)
  occupancyRate: { type: Number, default: 0 }, // Taux d'occupation (% des places réservées)
  status: { type: String, enum: ['Planned', 'In Progress', 'Completed'], default: 'Planned' }, // Statut du trajet
  pricePerSeat: { type: Number, required: true }, // Prix par siège pour ce trajet
  createdAt: { type: Date, default: Date.now }, // Date de création de l'entrée
});

module.exports = mongoose.model('Trip', TripSchema);
