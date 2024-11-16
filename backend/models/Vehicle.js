const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String, required: true }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
