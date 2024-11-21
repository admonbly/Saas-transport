// backend/models/Reports.js
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true }, // Stocke les données du rapport
  generatedAt: { type: Date, default: Date.now },
  summary: { type: String, required: true }
});

module.exports = mongoose.model('Report', ReportSchema);
