// todo: fare un parser middleware per le richieste

const express = require("express");
const router = express.Router();
const db = require("../db.js");
const { ObjectId } = require("mongodb");
let { verifyToken } = require("../modules/awt.js");

// list of tournaments
router.get("/", async (req, res) => {
    const query = req.query.q;
    let filter = {};
    if (query) {
        filter = { name: { $regex: query, $options: "i" } };
    }
    const mongo = await db.connect();
    const tournaments = await mongo.collection("tournaments").find(filter).toArray();
    res.json(tournaments);
});

// create new tournament
router.post("/", verifyToken, async (req, res) => {
    const { name, sport, maxTeams, date } = req.body;
    if (!name || !sport || !maxTeams || !date) {
        return res.status(400).send("Missing fields.");
    }
    const mongo = await db.connect();
    const tournament = { name, sport, maxTeams, status: "Active", startDate: new Date(date), creatorUserId: new ObjectId(req.user.id), matchesIds: [], teamsIds: [] }
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

// edit tournament data
router.put("/:id", verifyToken, async (req, res) => {
    // assuming date comes as: YYYY-MM-DD
    // todo: if (!req.body) {}
    const { name, sport, maxTeams, date, team: teams } = req.body;

    let result;
    const mongo = await db.connect();

    const filter = { _id: new ObjectId(req.params.id) };
    let updateDocument = {};

    if (name || sport || maxTeams || date) {
        updateDocument = { $set: {} };
    }
    if (name) updateDocument.$set.name = name;
    if (sport) updateDocument.$set.sport = sport;
    if (maxTeams) updateDocument.$set.maxTeams = Number(maxTeams);
    if (date) updateDocument.$set.startDate = new Date(date);
    if (teams && Array.isArray(teams)) {
        // todo: check if team already exists
        let teamsIds = teams.map(id => new ObjectId(id));
        updateDocument.$push = { teamsIds: { $each: teamsIds } };
    }
    try {
        result = await mongo.collection("tournaments").updateOne(filter, updateDocument);
        if (result.matchedCount === 0) {
            return res.status(404).send("Tournament not found.");
        }
    } catch (error) {
        return res.status(403).send("Something went wrong.");
    }

    // TODO: metodo per aggiornare i match (che vengono fatti in automatico)
    res.json(result);
});

// cancel a booking 
router.delete("/:id", verifyToken, async (req, res) => {
    const mongo = await db.connect();
    const result = await mongo.collection("tournaments").deleteOne({_id: new ObjectId(req.params.id), creatorUserId: new ObjectId(req.user.id)})
    if (result.deletedCount === 0) { return res.status(409).send("User not authorized or tournament not found.") };
    res.status(201).json(result);
});



module.exports = router;