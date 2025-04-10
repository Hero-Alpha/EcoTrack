const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  model: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['truck', 'van', 'bike', 'car'], 
    required: true 
  },
  numberPlate: { type: String, required: true },
  capacity: { type: Number, required: true }, 
  fuelType: { 
    type: String, 
    enum: ['diesel', 'petrol', 'electric', 'CNG'], 
    required: true 
  },
  assignedCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  createdAt: { type: Date, default: Date.now }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
