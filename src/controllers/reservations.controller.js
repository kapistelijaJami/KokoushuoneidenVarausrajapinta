import * as reservationService from "../services/reservations.service.js";

export const createReservation = (req, res) => {
    const roomId = Number(req.params.roomId);
    const { username, startTime, endTime } = req.body;

    if (!username || !startTime || !endTime) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const reservation = reservationService.createReservation({
            roomId,
            username,
            startTime,
            endTime
        });

        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getReservationsByRoom = (req, res) => {
    const roomId = Number(req.params.roomId);

    const reservations = reservationService.getReservationsByRoom(roomId);

    res.json(reservations);
}

export const deleteReservation = (req, res) => {
    const id = Number(req.params.id);

    const deleted = reservationService.deleteReservation(id);
    if (!deleted) {
        return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(204).send();
}