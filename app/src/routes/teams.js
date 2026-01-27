const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const { ObjectId } = require("mongodb");
let { verifyToken } = require("../modules/awt.js");

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

// create new team
router.post("/", verifyToken, async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send("Missing fields.");
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
        if (!team) { return res.status(404).send("Team not found."); }
    } catch (error) {
        return res.status(400).send("Team not found or malformed ID.");
    }
    res.json(team);
});

// edit team (auth)
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
        return res.status(400).send("Empty fields.");
    }

    result = await mongo.collection("teams").updateOne(filter, updateDocument);
    if (result.matchedCount === 0) {
        return res.status(404).send("User not authorized (or invalid teams id).");
    }

    res.status(204).json(result);
});

// list of players
router.get("/:id/players", async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id) };
    const mongo = await db.connect();
    const team = await mongo.collection("teams").findOne(filter);
    if (!team) return res.status(404).send("Team not found");
    const playersIds = team.playersIds || [];
    const players = await mongo.collection("players").find({ _id: { $in: playersIds } }).toArray();
    res.json(players);
});


module.exports = router;

