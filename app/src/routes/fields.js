const express = require("express");
const router = express.Router();
const db = require("./db.js");
let verifyToken = require("./modules/auth.js");
const { ObjectId } = require("mongodb");
const { getLimitTimes, getDayLimits } = require("../utils/dates");


// list of sports fields (searchable)
router.get("/api/fields", async (req, res) => {
    const query = req.query.q;
    let filter = {};
    if (query) {
        filter = {
            $or: [
                { name: { $regex: query, $options: "i" } },
                { address: { $regex: query, $options: "i" } }
            ]
        }
    };
    const mongo = await db.connect();
    const fields = await mongo.collection("fields").find(filter).toArray();
    res.json(fields);
});

// field details
router.get("/api/fields/:id", async (req, res) => {
    try {
        let filter = { _id: new ObjectId(req.params.id) };
        const mongo = await db.connect();
        const field = await mongo.collection("fields").findOne(filter);
        if (!field) { return res.status(403).send("Field not found."); }
    } catch (error) {
        return res.status(403).send("Field not found.");
    }
    res.json(field);
});

// availability for a specific date
router.get("/api/fields/:id/slots", async (req, res) => {
    const date = req.query.date;
    const { startDay, endDay } = getDayLimits(date);

    const mongo = await db.connect();
    let filter = {
        fieldId: new ObjectId(req.params.id),
        start: { $gte: startDay, $lt: endDay }
    };
    const bookings = await mongo.collection("bookings").find(filter).sort({ start: 1 }).toArray();

    let availableSlots = [];
    let left = startDay;

    for (const booking of bookings) {
        if (booking.start > left) {
            availableSlots.push({ start: left, end: booking.start });
        }
        left = booking.end > left ? booking.end : left; // in teoria se non ci sono intersezioni è sempre booking.end
    }

    if (left < endDay) {
        availableSlots.push({ start: left, end: endDay });
    }

    res.json(availableSlots);
});

// book a slot (authenticated)
router.post("/fields/:id/bookings", verifyToken, async (req, res) => {

    // suppongo fornite come: YYYY:MM:DD, HH:MM, HH:MM
    const { date, startHour, endHour } = req.body;

    const { end, start } = getLimitTimes(date, startHour, endHour);
    const { startDay, endDay } = getDayLimits(date);

    const mongo = await db.connect();

    let filter = {
        fieldId: new ObjectId(req.params.id),
        start: { $gte: startDay, $lt: endDay },
        start: { $lt: end },
        end: { $gt: start }
    };
    const conflict = await mongo.collection("bookings").findOne(filter);

    if (conflict) {
        return res.status(409).send("Slot not available.");
    }

    const booking = { userId: new ObjectId(req.user.id), fieldId: new ObjectId(req.params.id), start, end }
    await mongo.collection("bookings").insertOne(booking);

    res.sendStatus(204);
});

// cancel a booking (authenticated)
router.delete("/fields/:id/bookings/:bookingId", verifyToken, async (req, res) => {
    const mongo = await db.connect();
    const result = await mongo.collection("bookings").deleteOne({ _id: new Object(req.params.bookingId), userId: new Object(req.user.id) })
    if (result.deletedCount === 0) { return res.status(409).send("No user's booking was found.") };
    res.sendStatus(204);
});

module.exports = router;