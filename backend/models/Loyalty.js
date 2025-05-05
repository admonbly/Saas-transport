const mongoose = require('mongoose');

const LoyaltySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, default: 0 },
  history: [
    {
      date: { type: Date, default: Date.now },
      action: String, // ex: 'Réservation', 'Annulation', 'Utilisation', etc.
      points: Number
    }
  ]
});

module.exports = mongoose.model('Loyalty', LoyaltySchema);
