const express = require("express");
const app = express();
app.use(express.json());
const db = require('./db.js');
// Cosa fa questo? Importa un costruttore?
const { ObjectId } = require("mongodb")
const auth = require('./auth.js');


// list of sports fields (searchable)
app.get("/api/fields", async (req, res) => {
    const mongo = await db.connect();
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
    const fields = await mongo.collection("fields").find(filter).toArray();
    res.json(fields);
});

// field details
app.get("/api/fields/:id", async (req, res) => {
    try {
        let filter = { _id: new ObjectId(req.params.id) };
        const mongo = await db.connect();
        const field = await mongo.collection("fields").findOne(filter);
        if (!field) {return res.status(403).send("Field not found.");}
    } catch (error) {
        return res.status(403).send("Field not found.");
    }
    res.json(field);
});

// availability for a specific date
app.get("/fields/:id/slot", async (req, res) => {
});

// book a slot (authenticated)
app.post("/fields/:id/bookings", async (req, res) => {

});

// cancel a booking (authenticated)
app.delete("/fields/:id/bookings/:bookingId", async (req, res) => {

});

app.listen(3000, () => {

});

