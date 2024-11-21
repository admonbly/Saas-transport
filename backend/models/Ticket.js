// backend/models/Ticket.js
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  passengerName: {
    type: String,
    required: true,
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qrCode: {
    type: String, // Stockera le contenu du QR code généré
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Ticket', TicketSchema);
