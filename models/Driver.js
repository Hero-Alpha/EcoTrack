const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  phone: { type: String, required: true },
  experience: { type: Number, required: true }, // in years
  assignedCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  createdAt: { type: Date, default: Date.now }
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
