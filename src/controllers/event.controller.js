const eventService = require("../services/event.service");

const createEvent = async (req, res) => {
    try {
        const eventData = {
            ...req.body,
            createdBy: req.user.id
        };

        const event = await eventService.createEvent(eventData);

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await eventService.getAllEvents();

        res.status(200).json({
            success: true,
            data: events
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await eventService.getEventById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.status(200).json({
            success: true,
            data: event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateEvent = async (req, res) => {
    try {

        const existingEvent = await eventService.getEventById(req.params.id);

        if (!existingEvent) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        if (existingEvent.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this event."
            });
        }

        const event = await eventService.updateEvent(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: event
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deleteEvent = async (req, res) => {
    try {

        const existingEvent = await eventService.getEventById(req.params.id);

        if (!existingEvent) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        if (existingEvent.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this event."
            });
        }

        await eventService.deleteEvent(req.params.id);

        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};