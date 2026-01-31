import express from "express";
import * as reservationController from "../controllers/reservations.controller.js";

const router = express.Router();

// Luo varaus
router.post("/rooms/:roomId/reservations", (req, res) => {
    reservationController.createReservation(req, res);
});

// Listaa huoneen varaukset
router.get("/rooms/:roomId/reservations", (req, res) => {
    reservationController.getReservationsByRoom(req, res);
});

// Peruuta varaus
router.delete("/reservations/:id", (req, res) => {
    reservationController.deleteReservation(req, res);
});

export default router;