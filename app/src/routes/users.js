const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const { ObjectId } = require("mongodb");
let { verifyToken } = require("../modules/awt.js");

let pipeline = match => [
    { $match: match },
    { $lookup: { from: "tournaments", localField: "_id", foreignField: "creatorUserId", as: "tournaments" } },
    { $addFields: { tournaments: { $map: { input: "$tournaments", as: "t", in: "$$t._id" } } } },
    { $project: { hash: 0 } }
]

// list of users (searchable)
router.get("/", async (req, res) => {
    const query = req.query.q;
    let match = {};
    if (query) {
        match = { $or: [{ name: { $regex: query, $options: "i" } }, { surname: { $regex: query, $options: "i" } }, { username: { $regex: query, $options: "i" } }] };
    }
    const mongo = await db.connect();
    const users = await mongo.collection("users").aggregate(pipeline(match)).toArray();
    res.json(users);
});

// if authenticated, returns information about the current user
router.get("/whoami", verifyToken, async (req, res) => {
    let user;
    const match = { _id: new ObjectId(req.user.id) };
    const mongo = await db.connect();
    user = (await mongo.collection("users").aggregate(pipeline(match)).toArray())[0];
    if (!user) { return res.status(404).send("User not found."); }
    res.json(user);
})

// details about a user with the specific id
router.get("/:id", async (req, res) => {
    let user;
    const match = { _id: new ObjectId(req.params.id) };
    const mongo = await db.connect();
    user = (await mongo.collection("users").aggregate(pipeline(match)).toArray())[0];
    if (!user) { return res.status(404).send("User not found."); }
    res.json(user);
});

module.exports = router;