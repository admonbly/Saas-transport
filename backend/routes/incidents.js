const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');
const authenticateJWT = require('../middlewares/authenticateJWT');
const verifyRole = require('../middlewares/verifyRole');

// Signaler un incident (utilisateur connecté)
router.post('/', authenticateJWT, incidentController.createIncident);
// Récupérer les incidents de l'utilisateur connecté
router.get('/me', authenticateJWT, incidentController.getUserIncidents);
// Récupérer tous les incidents (admin)
router.get('/', authenticateJWT, verifyRole(['Admin']), incidentController.getAllIncidents);
// Mettre à jour le statut d'un incident (admin)
router.put('/:id/status', authenticateJWT, verifyRole(['Admin']), incidentController.updateIncidentStatus);

module.exports = router;
