const express = require("express");
const router = express.Router();

const eventController = require("../controllers/event.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);

// Protected
router.post("/", authMiddleware, eventController.createEvent);
router.put("/:id", authMiddleware, eventController.updateEvent);
router.delete("/:id", authMiddleware, eventController.deleteEvent);

module.exports = router;