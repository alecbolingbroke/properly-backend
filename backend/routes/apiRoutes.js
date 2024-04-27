const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Api routes
router.post('/', apiController.calculateMortgage);

module.exports = router;