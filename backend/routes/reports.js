const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Trip = require('../models/Trip');

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const trips = await Trip.find();

    const monthlyIncome = transactions.reduce((acc, t) => {
      const month = new Date(t.date).toLocaleString('default', { month: 'long' });
      acc[month] = (acc[month] || 0) + t.amount;
      return acc;
    }, {});

    const routeOccupancy = trips.reduce((acc, trip) => {
      acc[trip.routeName] = (acc[trip.routeName] || 0) + trip.occupancyRate;
      return acc;
    }, {});

    res.json({ monthlyIncome, routeOccupancy });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
