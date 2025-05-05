const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');
const authenticateJWT = require('../middlewares/authenticateJWT');
const verifyRole = require('../middlewares/verifyRole');

// Lister tous les partenaires (public)
router.get('/', partnerController.getAllPartners);
// Ajouter un partenaire (admin)
router.post('/', authenticateJWT, verifyRole(['Admin']), partnerController.createPartner);
// Supprimer un partenaire (admin)
router.delete('/:id', authenticateJWT, verifyRole(['Admin']), partnerController.deletePartner);

module.exports = router;
