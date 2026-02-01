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
        return res.status(400).json({ message: "Missing fields."});
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
    if (!tournament) { return res.status(404).json({ message: "Faild to get tournament: Id doesn't exist."}); }
    res.json(tournament);
});

// edit tournament data (id) (auth) (body)
router.put("/:id", verifyToken, async (req, res) => {
    const { name, sport, maxTeams, date, addTeams, remTeams } = req.body;
    const mongo = await db.connect();
    const filter = { _id: new ObjectId(req.params.id), organizerId: new ObjectId(req.user.id) };

    let updateSet = {};
    if (name) updateSet.name = name;
    if (sport) updateSet.sport = sport;
    if (maxTeams) updateSet.maxTeams = Number(maxTeams);
    if (date) updateSet.date = new Date(date);

    if (Object.keys(updateSet).length > 0) {
        await mongo.collection("tournaments").updateOne(filter, { $set: updateSet });
    }

    if (addTeams && Array.isArray(addTeams) && addTeams.length > 0) {
        const addIds = addTeams.map(id => new ObjectId(id));
        await mongo.collection("tournaments").updateOne(filter, { $addToSet: { teamsIds: { $each: addIds } } });
    }

    if (remTeams && Array.isArray(remTeams) && remTeams.length > 0) {
        const remIds = remTeams.map(id => new ObjectId(id));
        await mongo.collection("tournaments").updateOne(filter, { $pull: { teamsIds: { $in: remIds } } });
    }

    res.status(201).json({ message: "Tournament updated successfully" });
});


// cancel the tournament (id) (auth)
router.delete("/:id", verifyToken, async (req, res) => {
    const mongo = await db.connect();
    const result = await mongo.collection("tournaments").deleteOne({ _id: new ObjectId(req.params.id), organizerId: new ObjectId(req.user.id) });
    if (result.deletedCount === 0) { return res.status(409).json({ message: "Failed to delete tournament: User is not organizer of this tournament (unauthorized)."}) };
    await mongo.collection("matches").deleteMany({ tournamentId: new ObjectId(req.params.id) });
    res.status(201).json(result);
});

// generate match schedule (id) (auth)
router.post("/:id/matches/generate", verifyToken, async (req, res) => {
    const mongo = await db.connect();
    const filter = { _id: new ObjectId(req.params.id), organizerId: new ObjectId(req.user.id) };
    const tournament = await mongo.collection("tournaments").findOne(filter);
    if (!tournament) return res.status(404).json({ message: "Failed to generate tournament schedule: User is not organizer of this tournament (unauthorized)."});
    const matchesIds = tournament.matchesIds || [];
    
    await mongo.collection("matches").deleteMany({ tournamentId: new ObjectId(req.params.id) });

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
    if (!tournament) return res.status(404).json({ message: "Tournament not found"});
    const matchesIds = tournament.matchesIds || [];
    const matches = await mongo.collection("matches").find({ _id: { $in: matchesIds } }).toArray();
    res.json(matches);
});

// tournaments standings (id)
router.get("/:id/standings", async (req, res) => {
    const mongo = await db.connect();
    const tournament = await mongo.collection("tournaments").findOne({ _id: new ObjectId(req.params.id) });
    if (!tournament) return res.status(404).json({ message: "Tournament not found"});
    const matchesIds = tournament.matchesIds || [];
    const matches = await mongo.collection("matches").find({ _id: { $in: matchesIds } }).toArray();

    const teamsStats = computePoints(matches, ...points[tournament.sport]);
    const standings = Object.entries(teamsStats).map(([id, stats]) => ({id, ...stats}));
    standings.sort((a,b) => (b.points - a.points || b.diff - a.diff || b.scored - a.scored));
    
    res.json( standings );
});

module.exports = router;
