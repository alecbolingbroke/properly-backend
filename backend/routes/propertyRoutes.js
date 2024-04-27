const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');  

// Routes
router.get('/', propertyController.getAllProperties);
router.post('/sell', propertyController.createProperty);
router.get('/available', propertyController.getAllActiveProperties);
router.get('/:id', propertyController.getPropertyById);
router.put('/:id', propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);
router.put('/:id/buy', propertyController.buyProperty);

module.exports = router;