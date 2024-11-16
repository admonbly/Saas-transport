const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['income', 'expense'] },
  description: String,
  amount: Number,
  date: { type: Date, default: Date.now },
  category: String,
});

module.exports = mongoose.model('Transaction', TransactionSchema);
