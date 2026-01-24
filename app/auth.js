const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./db.js");
const router = express.Router();

const SECRET = "secretKey"

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const mongo = await db.connect();
    const u = { username, password };
    const user = await mongo.collection("users").findOne(u);
    // console.log(user);

    if (user) {
        const token = jwt.sign({username}, SECRET)
        return res.json({token})
    } else {
        res.status(403).send("Errore");
    }
})

