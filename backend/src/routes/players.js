const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

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

module.exports = router;