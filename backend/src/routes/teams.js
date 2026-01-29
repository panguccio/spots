const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const { ObjectId } = require("mongodb");
let { verifyToken } = require("../modules/jwt.js");

// list of teams (query)
router.get("/", async (req, res) => {
    const query = req.query.q;
    let filter = {};
    if (query) {
        filter = { name: { $regex: query, $options: "i" } };
    }
    const mongo = await db.connect();
    const teams = await mongo.collection("teams").find(filter).toArray();
    res.json(teams);
});

// create new team (body)
router.post("/", verifyToken, async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Missing fields."});
    }
    const mongo = await db.connect();
    const team = { name, organizerId: new ObjectId(req.user.id), playersIds: [] }
    const result = await mongo.collection("teams").insertOne(team)
    res.status(201).json(result);
})

// team details (id)
router.get("/:id", async (req, res) => {
    let team;
    try {
        const filter = { _id: new ObjectId(req.params.id) };
        const mongo = await db.connect();
        team = await mongo.collection("teams").findOne(filter);
        if (!team) { return res.status(404).json({ message: "Team not found."}); }
    } catch (error) {
        return res.status(400).json({ message: "Team not found or malformed ID."});
    }
    res.json(team);
});

// edit team (id) (auth)
router.put("/:id", verifyToken, async (req, res) => {
    // assuming date comes as: YYYY-MM-DD
    const { name, addPlayers, remPlayers } = req.body;

    let result;
    const mongo = await db.connect();

    const filter = { _id: new ObjectId(req.params.id), organizerId: new ObjectId(req.user.id)};
    let updateDocument = {};

    if (name) {
        updateDocument.$set = {};
        updateDocument.$set.name = name;
    }

    if (addPlayers && Array.isArray(addPlayers)) {
        let playersIds = addPlayers.map(id => new ObjectId(id));
        updateDocument.$addToSet = { playersIds: { $each: playersIds } };
    }

    if (remPlayers && Array.isArray(remPlayers)) {
        let playersIds = remPlayers.map(id => new ObjectId(id));
        updateDocument.$pull = { playersIds: { $in: playersIds } };
    }

    if (Object.keys(updateDocument).length === 0) {
        return res.status(400).json({ message: "Empty fields."});
    }

    result = await mongo.collection("teams").updateOne(filter, updateDocument);
    if (result.matchedCount === 0) {
        return res.status(404).json({ message: "User not authorized (or invalid teams id)."});
    }

    res.status(204).json(result);
});

// cancel the team (id) (auth)
router.delete("/:id", verifyToken, async (req, res) => {
    const mongo = await db.connect();
    const result = await mongo.collection("teams").deleteOne({ _id: new ObjectId(req.params.id), organizerId: new ObjectId(req.user.id) });
    if (result.deletedCount === 0) { return res.status(409).json({ message: "User is not organizer of this team (unauthorized)."}) };
    res.status(201).json(result);
});

// list of players (id)
router.get("/:id/players", async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id) };
    const mongo = await db.connect();
    const team = await mongo.collection("teams").findOne(filter);
    if (!team) return res.status(404).json({ message: "Team not found"});
    const playersIds = team.playersIds || [];
    const players = await mongo.collection("players").find({ _id: { $in: playersIds } }).toArray();
    res.json(players);
});


module.exports = router;

