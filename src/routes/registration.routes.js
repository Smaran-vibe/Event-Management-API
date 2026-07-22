const express = require("express");

const router = express.Router();

const registrationController = require(
    "../controllers/registration.controller"
);

// Create registration
router.post("/", registrationController.createRegistration);

// Get all registrations
router.get("/", registrationController.getAllRegistrations);

// Get one registration
router.get("/:id", registrationController.getRegistrationById);

// Update registration
router.put("/:id", registrationController.updateRegistration);

// Delete registration
router.delete("/:id", registrationController.deleteRegistration);

module.exports = router;