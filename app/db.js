"use strict";
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db;

async function connect() {
    if (!db) {
        try {
            await client.connect();
            console.log("Success - Connected to MongoDB");
            db = client.db("spots");   
        } catch (error) {
            console.log("Error - Can't connect to MongoDB");
            console.error(error)
        }
    }
    return db;
}

module.exports = { connect };