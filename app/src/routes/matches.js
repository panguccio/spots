const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const { ObjectId } = require("mongodb");

// match details (id)
router.get("/:id", async (req, res) => {
    let match;
    const filter = { _id: new ObjectId(req.params.id) };
    const mongo = await db.connect();
    match = await mongo.collection("matches").findOne(filter);
    if (!match) { return res.status(404).send("Match not found."); }
    res.json(match);
});

// enter match result (id) (body)
router.put("/:id/result", async (req, res) => {
    const { points1, points2 } = req.body;

    if (points1 == undefined || points2 == undefined) {
        return res.status(400).send("Missing points.");
    }
    const filter = { _id: new ObjectId(req.params.id) };
    const mongo = await db.connect();
    const updateDocument = {$set: {points1, points2, status: "played"}}
    const result = await mongo.collection("matches").updateOne(filter, updateDocument);
    res.status(200).json(result);
});

module.exports = router;