const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company");

// Serve homepage directly (GET request)
router.get("/homepage", (req, res) => {
  res.render("listings/homepage");
});

// Serve signup form
router.get("/companySignup", (req, res) => {
  res.render("listings/companySignup"); 
});


// Create company (signup)
router.post("/signup", companyController.validateCompany, companyController.createCompany);

// (Optional) API routes
router.get("/api/companies", companyController.getAllCompanies);
router.get("/api/companies/:id", companyController.getCompanyById);

// Add more CRUD routes as needed...

module.exports = router;
