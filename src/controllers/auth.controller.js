const authService = require("../services/auth.service");

const register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.body.refreshToken || req.body.token;
        const result = await authService.refreshAccessToken(token);

        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            data: result
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

const logout = async (req, res) => {
    try {
        const result = await authService.logoutUser(req.body.refreshToken);

        return res.status(200).json({
            success: true,
            message: result.message,
            data: {
                loggedOut: true,
                strategy: "stateless-jwt"
            }
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const profile = await authService.getProfile(req.user.id);

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: profile
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    register,
    login,
    refreshToken,
    logout,
    getProfile
};
