const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  registrationNumber: String,
  model: String,
  capacity: Number,
  status: { type: String, default: 'active' },
  maintenanceHistory: [
    {
      description: String,
      date: Date,
      cost: Number
    }
  ],
  lastMaintenanceDate: Date,
});

module.exports = mongoose.model('Bus', BusSchema);
