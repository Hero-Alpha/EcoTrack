const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle');

// Add new vehicle
router.post('/add-vehicle', vehicleController.validateVehicle, vehicleController.createVehicle);

// Show all vehicles for a company
router.get('/vehicles/:companyId', vehicleController.getVehiclesByCompany);

module.exports = router;
