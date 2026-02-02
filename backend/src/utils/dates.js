function getLimitTimes(date, startHour, endHour) {
    const [year, month, day] = date.split('-').map(Number);

    const [sh, sm] = startHour.split(":").map(Number);
    const [eh, em] = endHour.split(":").map(Number);

    const start = new Date(year, month - 1, day, sh, sm, 0, 0);
    const end = new Date(year, month - 1, day, eh, em, 0, 0);
    
    return { end, start };
}

module.exports = getLimitTimes;