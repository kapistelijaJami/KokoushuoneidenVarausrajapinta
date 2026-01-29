import express from "express";
import reservationsRoutes from "./routes/reservations.routes.js";

const app = express();

// Middlewaret
app.use(express.json());

// Reitit
app.use("/api", reservationsRoutes);

// Perus health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

export default app;