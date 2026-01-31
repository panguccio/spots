// TODO sistema questo file, dev'essere fatto partire una volta sola all'avvio del db.
const db = require("./db")

async function init() {
    try {
        const mongo = await db.connect();
        console.log("  * DB init completed");
    } catch (err) {
        console.error("  * DB init failed");
        console.error(err);
    }
}

module.exports = init;