const express = require("express");
const app = express();
app.use(express.json());
const db = require('./db.js');
// Cosa fa questo? Importa un costruttore?
const { ObjectId } = require("mongodb")
const auth = require('./auth.js');


// list of sports fields (searchable)
app.get("/api/fields", async (req, res) => {
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
app.get("/api/fields/:id", async (req, res) => {
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
app.get("/api/fields/:id/slots", async (req, res) => {
    const date = new Date(req.query.date);
    const startDay = new Date(req.query.date);
    const endDay = new Date(req.query.date);
    startDay.setUTCHours(0, 0, 0, 0);
    endDay.setUTCHours(23, 59, 59, 999);

    const mongo = await db.connect();
    let filter = {
        fieldId: req.params.id, // new ObjectId(req.params.id), forse sarebbe quando si salva nel db, invece di una stringa salvare un object id! in questo caso
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
app.post("/fields/:id/bookings", async (req, res) => {

});

// cancel a booking (authenticated)
app.delete("/fields/:id/bookings/:bookingId", async (req, res) => {

});

app.listen(3000, () => {

});

