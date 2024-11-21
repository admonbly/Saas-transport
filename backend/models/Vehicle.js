const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  type: { type: String, enum: ['Bus', 'Van', 'Minibus'], required: true },
  status: { type: String, enum: ['Available', 'In Use', 'Under Maintenance'], default: 'Available' },
  mileage: { type: Number, default: 0 },
  lastMaintenance: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
