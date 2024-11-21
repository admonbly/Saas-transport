const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['income', 'expense'], required: true }, // Type de transaction
  description: { type: String, required: true }, // Description de la transaction
  amount: { type: Number, required: true }, // Montant de la transaction
  date: { type: Date, required: true }, // Date de la transaction
  category: { type: String, enum: ['Ticket Sale', 'Fuel', 'Maintenance', 'Salaries'], required: true }, // Catégorie
  createdAt: { type: Date, default: Date.now }, // Date de création de l'entrée
});

module.exports = mongoose.model('Transaction', TransactionSchema);
