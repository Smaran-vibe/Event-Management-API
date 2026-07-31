const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is required"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!process.env.JWT_ACCESS_SECRET) {
            return res.status(500).json({
                success: false,
                message: "Access token secret is not configured"
            });
        }

        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: "Invalid or expired access token"
            });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User not found or token no longer valid"
            });
        }

        req.user = user.toObject();
        req.auth = decoded;

        return next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = authMiddleware;
