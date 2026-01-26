const express = require("express");
const router = express.Router();
const db = require("../db.js");
const { ObjectId } = require("mongodb");
let { verifyToken } = require("../modules/awt.js");

// match details
router.get("/:id", async (req, res) => {
    let match;
    try {
        const filter = { _id: new ObjectId(req.params.id) };
        const mongo = await db.connect();
        match = await mongo.collection("matches").findOne(filter);
        if (!match) { return res.status(403).send("Match not found."); }
    } catch (error) {
        return res.status(404).send("Match not found or malformed ID.");
    }
    res.json(match);
});

// enter match result
router.get("/:id/result", async (req, res) => {
    const { points1, points2 } = req.body;
    const filter = { _id: new ObjectId(req.params.id) };
    const mongo = await db.connect();
    const updateDocument = {$set: {points1, points2}}
    const result = await mongo.collection("matches").updateOne(filter, updateDocument);
    if (!match) { return res.status(403).send("Match not found."); }
    res.status(201).json(result);
});

