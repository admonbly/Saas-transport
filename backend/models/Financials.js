// backend/models/Financials.js
const mongoose = require('mongoose');

const financialSchema = new mongoose.Schema({
  category: { type: String, enum: ['Revenue', 'Expenses'], required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Financial', financialSchema);
