const Joi = require('joi');

// ----------------- Company Schema -----------------
const companySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  contact: Joi.string().required(),
  address: Joi.string().required(),
  password: Joi.string().required()
});

// ----------------- Driver Schema -----------------
const driverSchema = Joi.object({
  name: Joi.string().required(),
  licenseNumber: Joi.string().required(),
  phone: Joi.string().required(),
  experience: Joi.number().min(0).required()
});

// ----------------- Vehicle Schema -----------------
const vehicleSchema = Joi.object({
  model: Joi.string().required(),
  type: Joi.string().valid('truck', 'van', 'bike', 'car').required(),
  numberPlate: Joi.string().required(),
  capacity: Joi.number().min(0).required(), // in kg or tons
  fuelType: Joi.string().valid('diesel', 'petrol', 'electric', 'CNG').required()
});

module.exports = {
  companySchema,
  driverSchema,
  vehicleSchema
};
