const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');

router.post('/add', financeController.addTransaction);
router.get('/', financeController.getTransactions);

module.exports = router;
