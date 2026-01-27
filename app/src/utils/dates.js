function getLimitTimes(date, startHour, endHour) {
    const start = new Date(date);
    const end = new Date(date);

    const [sh, sm] = startHour.split(":");
    const [eh, em] = endHour.split(":");

    start.setUTCHours(sh, sm, 0, 0);
    end.setUTCHours(eh, em, 0, 0);
    return { end, start };
}

module.exports = getLimitTimes;