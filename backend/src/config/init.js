// TODO sistema questo file, dev'essere fatto partire una volta sola all'avvio del db.
const db = require("./db");

async function init() {
    try {
        const mongo = await db.connect();
        const fieldCount = await mongo.collection("fields").countDocuments();
        
        await mongo.collection("users").createIndex({ username: 1 }, { unique: true });
        console.log("  * Unique index on username ensured.");
        console.log(fieldCount)
        
        if (fieldCount > 0) {
            console.log("  * DB already initialized. Skipping seeding.");
            return;
        }
        console.log("  * Seeding database...");

        await mongo.collection("fields").insertMany([
            {name: "Campo Sant'Andrea", address: "Via Locchi 25", sport: "football"},
            {name: "Palestra Divisione Julia", address: "Viale XX Settembre", sport: "volleyball"},
            {name: "Campetto Borgo San Sergio", address: "Via Eugenio Curiel", sport: "basketball"}
        ]);
        const user1 = await mongo.collection("users").insertOne({
            name: "Fragolino", surname: "Pane", username: "paninoalsalame", hash: "$2b$10$iSk1StKqmaQrQ2uW7xT1q.2.Awuf5V8HBx5s/84omCmaLzKYeQfYa", // salame
        });
        const user2 = await mongo.collection("users").insertOne({
            name: "Mongo", surname: "Vuejs", username: "admin", hash: "$2b$10$Fah0l.VKrWormfyKzFJ9Kex7.euquVvmsqXlOBo24tHWzjCubASbK", // admin
        });
        const players1 = await mongo.collection("players").insertMany([
            {name: "Samantha", surname: "Cristoforetti", jerseyNumber: 13},
            {name: "Riccardo", surname: "Guccione", jerseyNumber: 6},
            {name: "Alan", surname: "Turing", jerseyNumber: 2},
        ]);
        const players2 = await mongo.collection("players").insertMany([
            {name: "Leila", surname: "Cane Pazzo", jerseyNumber: 12},
            {name: "Gabriele", surname: "Salamuccio", jerseyNumber: 1},
            {name: "Luca", surname: "La Carbonarin", jerseyNumber: 7},
        ]);
        const players3 = await mongo.collection("players").insertMany([
            {name: "Toph", surname: "Beifong", jerseyNumber: 5},
            {name: "Luz", surname: "Noceda", jerseyNumber: 4},
            {name: "Monkey", surname: "D. Lufy", jerseyNumber: 10},
        ]);
        const team1 = await mongo.collection("teams").insertOne({name: "Inter-net", playersIds: Object.values(players1.insertedIds), organizerId: user1.insertedId});
        const team2 = await mongo.collection("teams").insertOne({name: "Salamucci", playersIds: Object.values(players2.insertedIds), organizerId: user1.insertedId});
        const team3 = await mongo.collection("teams").insertOne({name: "Tune Squad", playersIds: Object.values(players3.insertedIds), organizerId: user2.insertedId});
        await mongo.collection("tournaments").insertMany([
            {name: "L'ultimo scontro", sport: "football", maxTeams: 10, status: "active", date: new Date("2026-02-05"), organizerId: user2.insertedId, teamsIds: [team1.insertedId, team2.insertedId, team3.insertedId]},
            {name: "Torneo dei bambini", sport: "volleyball", maxTeams: 6, status: "active", date: new Date("2026-02-08"), organizerId: user1.insertedId, teamsIds: [team2.insertedId, team3.insertedId]}
        ]);

        console.log("  * DB init completed");
    } catch (err) {
        console.error("  * DB init failed");
        console.error(err);
    }
}

module.exports = init;