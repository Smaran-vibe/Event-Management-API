const Event = require("../models/event.model");

const createEvent = async (eventData) => {
    const event = await Event.create(eventData);

    return event;
};

const getAllEvents = async () => {
    const events = await Event.find();

    return events;
};

const getEventById = async (eventId) => {
    const events = await Event.find().populate("createdBy", "name email");

    return event;
};
const updateEvent = async (eventId, eventData) => {
    const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        eventData,
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    return updatedEvent;
};

const deleteEvent = async (eventId) => {
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    return deletedEvent;
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};