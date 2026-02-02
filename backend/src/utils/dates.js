function getLimitTimes(date, startHour, endHour) {
    const [year, month, day] = date.split('-').map(Number);

    let [sh, sm] = startHour.split(":").map(Number);
    let [eh, em] = endHour.split(":").map(Number);

    if (sm != 0) sm = 30;
    if (em != 0) em = 30;

    const start = new Date(year, month - 1, day, sh, sm, 0, 0);
    const end = new Date(year, month - 1, day, eh, em, 0, 0);
    
    return { end, start };
}

module.exports = getLimitTimes;