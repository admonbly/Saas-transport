const express = require('express');
const router = express.Router();
const loyaltyController = require('../controllers/loyaltyController');
const authenticateJWT = require('../middlewares/authenticateJWT');

// Obtenir les points de fidélité de l'utilisateur connecté
router.get('/', authenticateJWT, loyaltyController.getLoyalty);
// Ajouter des points
router.post('/add', authenticateJWT, loyaltyController.addPoints);
// Utiliser des points
router.post('/use', authenticateJWT, loyaltyController.usePoints);

module.exports = router;
