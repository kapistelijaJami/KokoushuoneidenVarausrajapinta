import { MAX_START_TIME_IN_PAST_MIN } from "../constants/constants.js"
import * as reservationUtil from "../util/reservations.util.js";

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
    let start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();

    // Aloitus ennen lopetusta
    if (start >= end) {
        throw new Error("Start time must be before end time");
    }

    // Ei menneisyyteen
    if (start < now) {
        // Varauksen alku- ja loppuaika ovat menneisyydessä
        if (end <= now) {
            throw new Error("Reservation cannot be in the past");
        }

        // Jos aloitusaika on vain vähän menneisyydessä (max 5min), mutta lopetusaika on vielä voimassa,
        // voidaan silti luoda varaus. Aloitetaan varaus kuitenkin vain tästä hetkestä.
        if (now.getTime() - start.getTime() > MAX_START_TIME_IN_PAST_MIN * 60 * 1000) {
            throw new Error(`Start time cannot be in the past by more than ${MAX_START_TIME_IN_PAST_MIN} minutes`);
        }

        start = now;
    }

    // Päällekkäisyystarkistus
    if (reservationUtil.hasOverlappingReservations(start, end, roomId, reservations)) {
        throw new Error("Reservation overlaps with an existing reservation");
    }

    const reservation = {
        id: nextId++,
        roomId,
        username,
        startTime: start.toISOString(),
        endTime: end.toISOString()
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

/**
 * Tyhjentää varauksien muistin ja aloittaa id:n laskemisen alusta.
 * Käytetään esim. testauksessa.
 */
export const reset = () => {
    reservations = [];
    nextId = 1;
}