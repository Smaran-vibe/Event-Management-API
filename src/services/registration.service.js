const Registration = require("../models/registration.model");

const createRegistration = async (registrationData) => {
    const registration = await Registration.create(registrationData);

    return registration;
};

const getAllRegistrations = async () => {
    const registrations = await Registration.find()
        .populate("user")
        .populate("event");

    return registrations;
};

const getRegistrationById = async (registrationId) => {
    const registration = await Registration.findById(registrationId)
        .populate("user")
        .populate("event");

    return registration;
};

const updateRegistration = async (registrationId, registrationData) => {
    const updatedRegistration = await Registration.findByIdAndUpdate(
        registrationId,
        registrationData,
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    return updatedRegistration;
};

const deleteRegistration = async (registrationId) => {
    const deletedRegistration = await Registration.findByIdAndDelete(
        registrationId
    );

    return deletedRegistration;
};

module.exports = {
    createRegistration,
    getAllRegistrations,
    getRegistrationById,
    updateRegistration,
    deleteRegistration
};