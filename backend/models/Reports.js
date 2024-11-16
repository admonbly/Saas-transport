// backend/models/Reports.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  summary: { type: String, required: true }
});

module.exports = mongoose.model('Report', reportSchema);
