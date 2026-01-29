const express = require("express");

const reservationsRoutes = require("./routes/reservations.routes");

const app = express();

// Middlewaret
app.use(express.json());

// Reitit
app.use("/api", reservationsRoutes);

// Perus health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

module.exports = app;