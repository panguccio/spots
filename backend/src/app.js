const express = require("express");
let init = require("./config/init.js")
const app = express();
app.use(express.json());


app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/fields", require("./routes/fields.js"));
app.use("/api/tournaments", require("./routes/tournaments.js"));
app.use("/api/matches", require("./routes/matches.js"));
app.use("/api/users", require("./routes/users.js"));
app.use("/api/teams", require("./routes/teams.js"));

init().then(() => {
    app.listen(3000, () => {
        console.log("Server listening...");
    });
});


