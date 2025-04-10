const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driver');

// Add new driver
router.post('/add-driver', driverController.validateDriver, driverController.createDriver);

// Show all drivers for a company
router.get('/drivers/:companyId', driverController.getDriversByCompany);

module.exports = router;
