const express = require("express");
const router = express.Router();

const reservationService = require("../services/reservations.service");

// Luo varaus
router.post("/rooms/:roomId/reservations", (req, res) => {
    const roomId = Number(req.params.roomId);
    const { username, startTime, endTime } = req.body;

    if (!username || !startTime || !endTime) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const reservation = reservationService.createReservation({
        roomId,
        username,
        startTime,
        endTime
    });

    res.status(201).json(reservation);
});

// Peruuta varaus
router.delete("/reservations/:id", (req, res) => {
    const id = Number(req.params.id);

    const deleted = reservationService.deleteReservation(id);
    if (!deleted) {
        return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(204).send();
});

// Listaa huoneen varaukset
router.get("/rooms/:roomId/reservations", (req, res) => {
    const roomId = Number(req.params.roomId);

    const reservations =
        reservationService.getReservationsByRoom(roomId);

    res.json(reservations);
});

module.exports = router;