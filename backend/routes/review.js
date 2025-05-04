const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authenticateJWT = require('../middlewares/authenticateJWT');

// Créer un avis (authentifié)
router.post('/', authenticateJWT, reviewController.createReview);
// Récupérer les avis d'un trajet
router.get('/trip/:tripId', reviewController.getReviewsByTrip);
// Répondre à un avis (admin)
router.patch('/:reviewId/response', authenticateJWT, reviewController.respondToReview);

module.exports = router;
