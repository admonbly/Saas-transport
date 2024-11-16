const express = require('express');
const router = express.Router();
const fleetController = require('../controllers/fleetController');
const verifyRole = require('../middlewares/verifyRole');


// Route d'ajout de bus, accessible uniquement aux admins
router.post('/add-bus', verifyRole(['admin']), fleetController.addBus);
router.get('/', fleetController.getBuses);


module.exports = router;
