const express = require('express');
const router = express.Router();

// Exemple de route pour créer une réservation
router.post('/create', (req, res) => {
  // Logique pour créer une réservation
  res.send('Réservation créée');
});

// Exemple de route pour récupérer toutes les réservations
router.get('/', (req, res) => {
  // Logique pour récupérer toutes les réservations
  res.send('Toutes les réservations');
});

module.exports = router;
