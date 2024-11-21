const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['income', 'expense'], required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
