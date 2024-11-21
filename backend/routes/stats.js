const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');
const Transaction = require('../models/Transaction');
const data = require('../data.json'); // Fichier JSON de test (facultatif)

router.get('/stats', async (req, res) => {
  try {
    // Vérifiez si vous utilisez MongoDB ou un fichier de test
    let tripCount, vehicleCount, pendingBookings, totalRevenue, totalExpenses, topRoutes;

    if (process.env.USE_DB === 'true') {
      // Utilisation des modèles MongoDB
      tripCount = await Trip.countDocuments();
      vehicleCount = await Vehicle.countDocuments();
      pendingBookings = await Booking.countDocuments({ status: 'Pending' });

      const revenueAggregation = await Transaction.aggregate([
        { $match: { type: 'income' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]);
      totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].total : 0;

      const expenseAggregation = await Transaction.aggregate([
        { $match: { type: 'expense' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]);
      totalExpenses = expenseAggregation.length > 0 ? expenseAggregation[0].total : 0;

      const trips = await Trip.find();
      topRoutes = trips.map((trip) => ({
        name: trip.routeName,
        occupancy: Math.floor(Math.random() * 100), // Exemple d'occupation aléatoire
      }));
    } else {
      // Utilisation des données de test (data.json)
      tripCount = data.trips.length;
      vehicleCount = data.fleet.length;
      pendingBookings = data.bookings.filter((b) => b.status === 'Pending').length;

      totalRevenue = data.transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      totalExpenses = data.transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      topRoutes = data.trips.map((trip) => ({
        name: trip.routeName,
        occupancy: Math.floor(Math.random() * 100), // Exemple d'occupation aléatoire
      }));
    }

    const stats = {
      tripCount,
      vehicleCount,
      totalRevenue,
      totalExpenses,
      pendingBookings,
      topRoutes,
    };

    res.json(stats);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
