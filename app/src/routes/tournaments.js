// todo: fare un parser middleware per le richieste

const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const { ObjectId } = require("mongodb");
let { verifyToken } = require("../modules/jwt.js");
const { computePoints, points } = require("../utils/points.js");

// list of tournaments (query)
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

// create new tournament (auth)
router.post("/", verifyToken, async (req, res) => {
    const { name, sport, maxTeams, date } = req.body;
    if (!name || !sport || !maxTeams || !date) {
        return res.status(400).send("Missing fields.");
    }
    const mongo = await db.connect();
    const tournament = { name, sport, maxTeams, status: "active", date: new Date(date), organizerId: new ObjectId(req.user.id), matchesIds: [], teamsIds: [] }
    const result = await mongo.collection("tournaments").insertOne(tournament)
    res.status(201).json(result);
})

// tournament details (id)
router.get("/:id", async (req, res) => {
    let tournament;
    const filter = { _id: new ObjectId(req.params.id) };
    const mongo = await db.connect();
    tournament = await mongo.collection("tournaments").findOne(filter);
    if (!tournament) { return res.status(404).send("Tournament not found."); }
    res.json(tournament);
});

// edit tournament data (id) (auth) (body)
router.put("/:id", verifyToken, async (req, res) => {
    // assuming date comes as: YYYY-MM-DD
    const { name, sport, maxTeams, date, addTeams, remTeams } = req.body;

    let result;
    const mongo = await db.connect();

    const filter = { _id: new ObjectId(req.params.id), organizerId: new ObjectId(req.user.id) };
    let updateDocument = {};

    if (name || sport || maxTeams || date) {
        updateDocument.$set = {};
        if (name) updateDocument.$set.name = name;
        if (sport) updateDocument.$set.sport = sport;
        if (maxTeams) updateDocument.$set.maxTeams = Number(maxTeams);
        if (date) updateDocument.$set.date = new Date(date);
    }

    if (addTeams && Array.isArray(addTeams)) {
        let teamsIds = addTeams.map(id => new ObjectId(id));
        updateDocument.$addToSet = { teamsIds: { $each: teamsIds } };
    }

    if (remTeams && Array.isArray(remTeams)) {
        let teamsIds = remTeams.map(id => new ObjectId(id));
        updateDocument.$pull = { teamsIds: { $in: teamsIds } };
    }

    if (Object.keys(updateDocument).length === 0) {
        return res.status(400).send("Empty fields.");
    }

    result = await mongo.collection("tournaments").updateOne(filter, updateDocument);
    if (result.matchedCount === 0) {
        return res.status(404).send("User is not organizer of this tournament (unauthorized).");
    }

    res.status(201).json(result);
});

// cancel the tournament (id) (auth)
router.delete("/:id", verifyToken, async (req, res) => {
    const mongo = await db.connect();
    const result = await mongo.collection("tournaments").deleteOne({ _id: new ObjectId(req.params.id), organizerId: new ObjectId(req.user.id) });
    if (result.deletedCount === 0) { return res.status(409).send("User is not organizer of this tournament (unauthorized).") };
    await mongo.collection("matches").deleteMany({ tournamentId: new ObjectId(req.params.id) });
    res.status(201).json(result);
});

// generate match schedule (id) (auth)
router.post("/:id/matches/generate", verifyToken, async (req, res) => {
    const mongo = await db.connect();
    const filter = { _id: new ObjectId(req.params.id), organizerId: new ObjectId(req.user.id) };
    const tournament = await mongo.collection("tournaments").findOne(filter);
    if (!tournament) return res.status(404).send("User is not organizer of this tournament (unauthorized).");
    const matchesIds = tournament.matchesIds || [];
    
    
    const started = await mongo.collection("matches").findOne({ _id: { $in: matchesIds }, status: "played" });
    if (started) {
        return res.status(404).send("Schedule generation failed because some matches are already played.");
    } else {
        await mongo.collection("matches").deleteMany({ tournamentId: new ObjectId(req.params.id) });
    }

    const teamIds = tournament.teamsIds;

    let matches = [];

    for (let i = 0; i < teamIds.length; i++) {
        for (let j = i + 1; j < teamIds.length; j++) {
            matches.push({ team1Id: teamIds[i], team2Id: teamIds[j], date: tournament.date, tournamentId: tournament._id, status: "upcoming", result: null });
        }
    }

    const result = await mongo.collection("matches").insertMany(matches);
    await mongo.collection("tournaments").updateOne(filter, { $push: { matchesIds: { $each: Object.values(result.insertedIds) } } });
    res.status(201).json(matches);
});

// list matches (id)
router.get("/:id/matches", async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id) };
    const mongo = await db.connect();
    const tournament = await mongo.collection("tournaments").findOne(filter);
    if (!tournament) return res.status(404).send("Tournament not found");
    const matchesIds = tournament.matchesIds || [];
    const matches = await mongo.collection("matches").find({ _id: { $in: matchesIds } }).toArray();
    res.json(matches);
});

// tournaments standings (id)
router.get("/:id/standings", async (req, res) => {
    try {
        const mongo = await db.connect();
        const tournament = await mongo.collection("tournaments").findOne({ _id: new ObjectId(req.params.id) });
        if (!tournament) return res.status(404).send("Tournament not found");
        const matchesIds = tournament.matchesIds || [];
        const matches = await mongo.collection("matches").find({ _id: { $in: matchesIds } }).toArray();

        const teams = computePoints(matches, ...points[tournament.sport]);
        let standings = [];
        for (const team in teams) standings.push(team);
        standings.sort((a,b) => (teams[b].points - teams[a].points || teams[b].diff - teams[a].diff || teams[b].scored - teams[a].scored));
        res.json({teams, standings});

    } catch (error) {
        console.error(err);
        res.status(500).send("Error in computing the standings.");
    }
});

module.exports = router;
