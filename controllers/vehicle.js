const Vehicle = require('../models/Vehicle');
const ExpressError = require("../utils/ExpressError.js");
const { vehicleSchema } = require("../schema.js");

// Middleware for validation
exports.validateVehicle = (req, res, next) => {
  const { error } = vehicleSchema.validate(req.body);
  if (error) {
    console.log(error);
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Create a new vehicle
exports.createVehicle = async (req, res) => {
  try {
    console.log("📩 Incoming vehicle registration:", req.body);
    const newVehicle = new Vehicle(req.body);
    await newVehicle.save();
    console.log("✅ Vehicle saved!");
    res.redirect("/userHome");
  } catch (error) {
    console.error("❌ Failed to save vehicle:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all vehicles for a company
exports.getVehiclesByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const vehicles = await Vehicle.find({ company: companyId });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
