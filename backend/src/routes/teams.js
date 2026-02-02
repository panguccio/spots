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
    const mongo = await db.connect();
    const team = { name: "New Team", organizerId: new ObjectId(req.user.id), playersIds: [] }
    const result = await mongo.collection("teams").insertOne(team)
    res.status(201).json(result);
})

// team details (id)
router.get("/:id", async (req, res) => {
    let team;
    const filter = { _id: new ObjectId(req.params.id) };
    const mongo = await db.connect();
    team = await mongo.collection("teams").findOne(filter);
    if (!team) { return res.status(404).json({ message: "Failed to get team: Id doesn't exist." }); }
    res.json(team);
});

// edit team (id) (auth)
router.put("/:id", verifyToken, async (req, res) => {
    const { name, addPlayers, remPlayers } = req.body;
    const mongo = await db.connect();

    const filter = {
        _id: new ObjectId(req.params.id),
        organizerId: new ObjectId(req.user.id)
    };

    let updateSet = {};
    if (name) updateSet.name = name;

    if (Object.keys(updateSet).length > 0) {
        await mongo.collection("teams").updateOne(filter, { $set: updateSet });
    }

    if (addPlayers && Array.isArray(addPlayers) && addPlayers.length > 0) {
        const addIds = addPlayers.map(id => new ObjectId(id));
        await mongo.collection("teams").updateOne(filter, {
            $addToSet: { playersIds: { $each: addIds } }
        });
    }

    if (remPlayers && Array.isArray(remPlayers) && remPlayers.length > 0) {
        const remIds = remPlayers.map(id => new ObjectId(id));
        await mongo.collection("teams").updateOne(filter, {
            $pull: { playersIds: { $in: remIds } }
        });
    }

    res.status(201).json({ message: "Team updated successfully" });
});


// cancel the team (id) (auth)
router.delete("/:id", verifyToken, async (req, res) => {
    const mongo = await db.connect();
    const result = await mongo.collection("teams").deleteOne({ _id: new ObjectId(req.params.id), organizerId: new ObjectId(req.user.id) });
    if (result.deletedCount === 0) { return res.status(409).json({ message: "Failed to delete the team: User is not organizer of this team (unauthorized)." }) };
    res.status(201).json(result);
});

// list of players (id)
router.get("/:id/players", async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id) };
    const mongo = await db.connect();
    const team = await mongo.collection("teams").findOne(filter);
    if (!team) return res.status(404).json({ message: "Failed to get players: Team not found" });
    const playersIds = team.playersIds || [];
    const players = await mongo.collection("players").find({ _id: { $in: playersIds } }).toArray();
    res.json(players);
});


module.exports = router;

