const express = require("express");
const router = express.Router();
const db = require("../db.js");
const { ObjectId } = require("mongodb");
let { verifyToken } = require("../modules/awt.js");

// list of sports tournaments
router.get("/", async (req, res) => {
    const query = req.query.q;
    let filter = {};
    if (query) {
        filter = {name: { $regex: query, $options: "i" }};
    }
    const mongo = await db.connect();
    const tournaments = await mongo.collection("tournaments").find(filter).toArray();
    res.json(tournaments);
});


router.post("/", verifyToken, async (req, res) => {
    const { name, sport, maxTeams, date } = req.body;
    if (!name || !sport || !maxTeams || !date) {
        return res.status(400).send("Missing fields.");
    }
    const mongo = await db.connect();
    const tournament = { name, sport, maxTeams, status: "Active", startDate: new Date(date), matchesIds: [], teamsIds: []}
    const result = await mongo.collection("tournaments").insertOne(tournament)
    res.status(201).json(result);
})

// tournament details
router.get("/:id", async (req, res) => {
    let tournament;
    try {
        const filter = { _id: new ObjectId(req.params.id) };
        const mongo = await db.connect();
        tournament = await mongo.collection("tournaments").findOne(filter);
        if (!tournament) { return res.status(403).send("Tournament not found."); }
    } catch (error) {
        return res.status(403).send("Tournament not found (malformed ID).");
    }
    res.json(tournament);
});


module.exports = router;