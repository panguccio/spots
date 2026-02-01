const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
let { verifyToken } = require("../modules/jwt.js");

// list of players (query)
router.get("/", async (req, res) => {
    const query = req.query.q;
    let filter = {};
    if (query) {
        filter = { $or: [{ name: { $regex: query, $options: "i" } }, { surname: { $regex: query, $options: "i" } }]  };
    }
    const mongo = await db.connect();
    const players = await mongo.collection("players").find(filter).toArray();
    res.json(players);
});

router.post("/", verifyToken, async (req, res) => {
    const { name, surname, jerseyNumber } = req.body;
    const mongo = await db.connect();
    const player = { name, surname, jerseyNumber }
    const result = await mongo.collection("players").insertOne(player)
    res.status(201).json(result);
})

module.exports = router;