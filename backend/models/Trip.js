const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true },
  assignedVehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  occupancyRate: { type: Number, default: 0 }, // Pourcentage de places réservées
  status: { type: String, enum: ['Planned', 'In Progress', 'Completed'], default: 'Planned' },
});

module.exports = mongoose.model('Trip', TripSchema);
