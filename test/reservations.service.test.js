import test, { beforeEach, describe } from "node:test";
import assert from "node:assert/strict";
import * as reservationService from "../src/services/reservations.service.js";
import { MAX_START_TIME_IN_PAST_MIN } from "../src/constants/constants.js"

function futureDate(minutesFromNow) {
    return new Date(Date.now() + minutesFromNow * 60 * 1000).toISOString();
}

function pastDate(minutesInPast) {
    return new Date(Date.now() - minutesInPast * 60 * 1000).toISOString();
}

beforeEach(() => {
    reservationService.reset();
});

describe("testing reservation creation", () => {
    test("creates a valid reservation", () => {
        const reservation = reservationService.createReservation({
            roomId: 1,
            username: "test.user",
            startTime: futureDate(60),
            endTime: futureDate(120)
        });

        assert.equal(reservation.roomId, 1);
        assert.equal(reservation.username, "test.user");
        assert.ok(reservation.id);
    });

    test("fails if start time is after end time", () => {
        assert.throws(() => {
            reservationService.createReservation({
                roomId: 1,
                username: "test.user",
                startTime: futureDate(120),
                endTime: futureDate(60)
            });
        });
    });

    test("fails if reservation is in the past", () => {
        assert.throws(() => {
            reservationService.createReservation({
                roomId: 1,
                username: "test.user",
                startTime: pastDate(60),
                endTime: pastDate(50)
            });
        });
    });

    test("fails if reservation overlaps with existing one in same room", () => {
        reservationService.createReservation({
            roomId: 2,
            username: "first.user",
            startTime: futureDate(180),
            endTime: futureDate(240)
        });

        assert.throws(() => {
            reservationService.createReservation({
                roomId: 2,
                username: "second.user",
                startTime: futureDate(210),
                endTime: futureDate(270)
            });
        });
    });

    test("allows overlapping times in different rooms", () => {
        reservationService.createReservation({
            roomId: 2,
            username: "first.user",
            startTime: futureDate(180),
            endTime: futureDate(240)
        });

        assert.doesNotThrow(() => {
            reservationService.createReservation({
                roomId: 3,
                username: "other.room",
                startTime: futureDate(210),
                endTime: futureDate(270)
            });
        });
    });

    describe("testing reservation start time", () => {
        test("start time cannot be too far in the past", () => {
            assert.throws(() => {
                reservationService.createReservation({
                    roomId: 1,
                    username: "first.user",
                    startTime: pastDate(MAX_START_TIME_IN_PAST_MIN + 5),
                    endTime: futureDate(10)
                });
            });
        });

        test("start time can be barely in the past if end time is in the future", () => {
            assert.doesNotThrow(() => {
                reservationService.createReservation({
                    roomId: 1,
                    username: "first.user",
                    startTime: pastDate(MAX_START_TIME_IN_PAST_MIN - 1),
                    endTime: futureDate(10)
                });
            });

            assert.throws(() => {
                reservationService.createReservation({
                    roomId: 1,
                    username: "first.user",
                    startTime: pastDate(MAX_START_TIME_IN_PAST_MIN - 1),
                    endTime: pastDate(1)
                });
            });
        });
    });
});