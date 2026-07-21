const express = require("express");

const router = express.Router();

const eventController = require("../controllers/event.controller");

// Create event
router.post("/", eventController.createEvent);

// Get all events
router.get("/", eventController.getAllEvents);

// Get one event
router.get("/:id", eventController.getEventById);

// Update event
router.put("/:id", eventController.updateEvent);

// Delete event
router.delete("/:id", eventController.deleteEvent);

module.exports = router;