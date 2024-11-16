// backend/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  passengerName: { type: String, required: true },
  tripId: { type: Number, required: true },
  status: { type: String, enum: ['Confirmed', 'Pending', 'Cancelled'], default: 'Pending' }
});

module.exports = mongoose.model('Booking', bookingSchema);
