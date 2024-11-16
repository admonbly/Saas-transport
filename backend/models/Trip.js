const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true }
});

module.exports = mongoose.model('Trip', tripSchema);
