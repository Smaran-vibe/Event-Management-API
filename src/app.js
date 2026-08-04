const express = require("express");
const path = require("path");

const eventRoutes = require("./routes/event.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const registrationRoutes = require("./routes/registration.routes");

const app = express();

app.use(express.json());

app.use(
    "/uploads",
    express.static(path.join(__dirname, "..", "uploads"))
);

app.use("/api/events", eventRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/registrations", registrationRoutes);

module.exports = app;
