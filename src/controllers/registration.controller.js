const registrationService = require("../services/registration.service");

const createRegistration = async (req, res) => {
    try {
        const registration =
            await registrationService.createRegistration(req.body);

        res.status(201).json({
            success: true,
            message: "Registration created successfully",
            data: registration
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllRegistrations = async (req, res) => {
    try {
        const registrations =
            await registrationService.getAllRegistrations();

        res.status(200).json({
            success: true,
            data: registrations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getRegistrationById = async (req, res) => {
    try {
        const registration =
            await registrationService.getRegistrationById(
                req.params.id
            );

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found"
            });
        }

        res.status(200).json({
            success: true,
            data: registration
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateRegistration = async (req, res) => {
    try {
        const registration =
            await registrationService.updateRegistration(
                req.params.id,
                req.body
            );

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Registration updated successfully",
            data: registration
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteRegistration = async (req, res) => {
    try {
        const registration =
            await registrationService.deleteRegistration(
                req.params.id
            );

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Registration deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createRegistration,
    getAllRegistrations,
    getRegistrationById,
    updateRegistration,
    deleteRegistration
};