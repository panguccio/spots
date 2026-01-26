"use strict";
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db.js");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { SECRET } = require("../modules/awt.js")

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const mongo = await db.connect();
    const user = await mongo.collection("users").findOne({ username });

    if (!user) {
        return res.status(403).send("This username doesn't exist.");
    }

    const match = await bcrypt.compare(password, user.hash);

    if (!match) {
        return res.status(403).send("Wrong password.");
    }

    const token = jwt.sign({ username, id: user._id }, SECRET, { expiresIn: "2h" });
    res.json({ token });
});

router.post("/signup", async (req, res) => {
    const { name, surname, username, password } = req.body;

    const mongo = await db.connect();
    const exists = await mongo.collection("users").findOne({ username });

    if (exists) {
        return res.status(409).send("Username not available.");
    } else {
        const hash = await bcrypt.hash(password, saltRounds);
        const user = { name, surname, username, hash }
        await mongo.collection("users").insertOne(user);
        const token = jwt.sign({ username, id: user._id }, SECRET, { expiresIn: "2h" });
        res.json({ token });
    }
});

module.exports = router;
