const express = require("express");

const eventRoutes = require("./routes/event.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const registrationRoutes = require("./routes/registration.routes");

const app = express();

app.use(express.json());

app.use("/api/events", eventRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/registrations", registrationRoutes);

module.exports = app;
