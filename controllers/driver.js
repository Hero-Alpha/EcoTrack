const Driver = require('../models/Driver');
const ExpressError = require("../utils/ExpressError.js");
const { driverSchema } = require("../schema.js");

// Middleware for validation
exports.validateDriver = (req, res, next) => {
  const { error } = driverSchema.validate(req.body);
  if (error) {
    console.log(error);
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Create a new driver
exports.createDriver = async (req, res) => {
  try {
    console.log("📩 Incoming driver registration:", req.body);
    const newDriver = new Driver(req.body);
    await newDriver.save();
    console.log("✅ Driver saved!");
    res.status(201).json({ message: "Driver added successfully" });
  } catch (error) {
    console.error("❌ Failed to save driver:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all drivers for a company
exports.getDriversByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const drivers = await Driver.find({ company: companyId });
    res.status(200).json(drivers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
