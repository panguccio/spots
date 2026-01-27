// todo: fare un parser middleware per le richieste

const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const { ObjectId } = require("mongodb");
let { verifyToken } = require("../modules/awt.js");

const points = {
            football: [3, 0, 1],
            volleyball: [2, 0, 0],
            basketball: [2, 0, 0]
        }

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

// create new tournament
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

// tournament details
router.get("/:id", async (req, res) => {
    let tournament;
    try {
        const filter = { _id: new ObjectId(req.params.id) };
        const mongo = await db.connect();
        tournament = await mongo.collection("tournaments").findOne(filter);
        if (!tournament) { return res.status(404).send("Tournament not found."); }
    } catch (error) {
        return res.status(400).send("Tournament not found or malformed ID.");
    }
    res.json(tournament);
});

// edit tournament data (auth)
router.put("/:id", verifyToken, async (req, res) => {
    // assuming date comes as: YYYY-MM-DD
    // todo: if (!req.body) {}
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
        return res.status(404).send("User not authorized (or invalid tournament id).");
    }

    res.status(201).json(result);
});

// cancel the tournament (creator only)
// should it delete all the matches too?
router.delete("/:id", verifyToken, async (req, res) => {
    const mongo = await db.connect();
    const result = await mongo.collection("tournaments").deleteOne({ _id: new ObjectId(req.params.id), organizerId: new ObjectId(req.user.id) })
    if (result.deletedCount === 0) { return res.status(409).send("User not authorized or tournament not found.") };
    res.status(201).json(result);
});

// generate match schedule
router.post("/:id/matches/generate", async (req, res) => {
    const mongo = await db.connect();
    const filter = { _id: new ObjectId(req.params.id) };
    const tournament = await mongo.collection("tournaments").findOne(filter);
    if (!tournament) return res.status(404).send("Tournament not found.");
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

// list matches
router.get("/:id/matches", async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id) };
    const mongo = await db.connect();
    const tournament = await mongo.collection("tournaments").findOne(filter);
    if (!tournament) return res.status(404).send("Tournament not found");
    const matchesIds = tournament.matchesIds || [];
    const matches = await mongo.collection("matches").find({ _id: { $in: matchesIds } }).toArray();
    res.json(matches);
});

// tournaments standings
router.get("/:id/standings", async (req, res) => {
    try {
        const mongo = await db.connect();
        const tournament = await mongo.collection("tournaments").findOne({ _id: new ObjectId(req.params.id) });
        if (!tournament) return res.status(404).send("Tournament not found");
        const matchesIds = tournament.matchesIds || [];
        const matches = await mongo.collection("matches").find({ _id: { $in: matchesIds } }).toArray();

        const teams = computePoints(matches, ...points[tournament.sport]);
        let standings = []
        for (const team in teams) standings.push(team);
        standings.sort((a, b) => teams[b] - teams[a]);
        res.json(standings);

    } catch (error) {
        console.error(err);
        res.status(500).send("Something went wrong in computing the standings.");
    }
});

let computePoints = function(matches, win, lose, draw) {
    let teams = {};
    for (const { team1Id, team2Id, points1, points2 } of matches) {
        if (points1 === undefined || points2 === undefined) continue;
        let [p1, p2] = points1 > points2 ? [win, lose] : points1 < points2 ? [lose, win] : [draw, draw];
        teams[team1Id] = (teams[team1Id] || 0) + p1;
        teams[team2Id] = (teams[team2Id] || 0) + p2;
    }
    return teams;
}

module.exports = router;
