let reservations = [];
let nextId = 1;

/**
 * Palauttaa kaikki tietyn huoneen varaukset
 */
export const getReservationsByRoom = (roomId) => {
    return reservations.filter(r => r.roomId === roomId);
}

/**
 * Luo uuden varauksen
 */
export const createReservation = ({ roomId, username, startTime, endTime }) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();

    // Aloitus ennen lopetusta
    if (start >= end) {
        throw new Error("Start time must be before end time");
    }

    // Ei menneisyyteen
    if (start < now) {
        throw new Error("Reservation cannot be in the past");
    }

    // Päällekkäisyystarkistus
    const overlapping = reservations.some(r => {
        if (r.roomId !== roomId) return false;

        const existingStart = new Date(r.startTime);
        const existingEnd = new Date(r.endTime);

        return start < existingEnd && end > existingStart;
    });

    if (overlapping) {
        throw new Error("Reservation overlaps with an existing reservation");
    }

    const reservation = {
        id: nextId++,
        roomId,
        username,
        startTime,
        endTime
    };

    reservations.push(reservation);
    return reservation;
}

/**
 * Poistaa varauksen id:n perusteella
 */
export const deleteReservation = (id) => {
    const index = reservations.findIndex(r => r.id === id);
    if (index === -1) {
        return false;
    }

    reservations.splice(index, 1);
    return true;
}