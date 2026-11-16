"use strict";
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb://mongo-guccione:27017";
const client = new MongoClient(uri);

let db;

async function connect(retries = 5, delay = 2000) {
    if (!db) {
        for (let i = 0; i < retries; i++) {
            try {
                await client.connect();
                console.log("Success - Connected to MongoDB");
                db = client.db("spots");
                break;
            } catch (error) {
                console.log(`Waiting for MongoDB... (attempt ${i + 1}/${retries}). Retrying in ${delay / 1000}s`);
                if (i === retries - 1) {
                    console.error("Fatal - Can't connect to MongoDB:", error);
                    throw error;
                }
                await new Promise((res) => setTimeout(res, delay));
            }
        }
    }
    return db;
}

module.exports = { connect };
