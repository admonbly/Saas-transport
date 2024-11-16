// backend/models/TripManagement.js
const mongoose = require('mongoose');

const tripManagementSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], required: true },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true }
});

module.exports = mongoose.model('TripManagement', tripManagementSchema);
