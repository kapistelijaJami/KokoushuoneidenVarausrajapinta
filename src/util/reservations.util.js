
export const hasOverlappingReservations = (start, end, roomId, reservations) => {
    return reservations.some(r => {
        if (r.roomId !== roomId) return false;

        const existingStart = new Date(r.startTime);
        const existingEnd = new Date(r.endTime);

        return start < existingEnd && end > existingStart;
    });
}