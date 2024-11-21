const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const json2csv = require('json2csv').parse;

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/report', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const csv = json2csv(transactions, { fields: ['type', 'description', 'amount', 'date'] });
    res.header('Content-Type', 'text/csv');
    res.attachment('financial_report.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
