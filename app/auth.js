"use strict";
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./db.js");
const router = express.Router();

const SECRET = "secretKey"

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const mongo = await db.connect();
    const user = await mongo.collection("users").findOne({ username, password });

    if (user) {
        const token = jwt.sign({ username }, SECRET);
        return res.json({ token });
    } else {
        return res.status(403).send("Credentials don't exist.");
    }
});

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    const mongo = await db.connect();
    const exists = await mongo.collection("users").findOne({ username });
    if (exists) {
        return res.status(409).send("Username not available.");
    } else {
        const user = await mongo.collection("users").insertOne({ username, password });
        const token = jwt.sign({ username }, SECRET);
        return res.json({ token });
    }
});
