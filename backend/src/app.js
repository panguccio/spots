const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');
const init = require("./config/init.js");

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || true;

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}));

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/fields", require("./routes/fields.js"));
app.use("/api/tournaments", require("./routes/tournaments.js"));
app.use("/api/matches", require("./routes/matches.js"));
app.use("/api/users", require("./routes/users.js"));
app.use("/api/teams", require("./routes/teams.js"));
app.use("/api/players", require("./routes/players.js"));

app.use((err, req, res, next) => {
    console.error(err);
    return res.status(err.status || 500).json({ message: err.message });
});

(async () => {
    await init();

    app.listen(PORT, () => {
        console.log(`Backend listening on port ${PORT}...`);
    });
})();
