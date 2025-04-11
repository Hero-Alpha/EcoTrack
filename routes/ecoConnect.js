// routes/ecoConnect.js

const express = require("express");
const router = express.Router();
const { matchPartners } = require("../services/ecoMatchService");

// Render the B2B form page
router.get("/b2b", (req, res) => {
    res.render("listings/b2b"); // ✅ This should match the correct EJS path
});

// Handle the B2B partner matching logic
router.post("/match", (req, res) => {
    const { location, services } = req.body;
    const requiredServices = Array.isArray(services) ? services : [services];

    const matched = matchPartners({ location, requiredServices });

    res.render("listings/b2bResults", { matched, location });
});

module.exports = router;
