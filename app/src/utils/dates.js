function getLimitTimes(date, startHour, endHour) {
    const start = new Date(date);
    const end = new Date(date);

    const [sh, sm] = startHour.split(":");
    const [eh, em] = endHour.split(":");

    start.setUTCHours(sh, 0, 0, 0);
    end.setUTCHours(eh, 0, 0, 0);
    return { end, start };
}

module.exports = getLimitTimes;