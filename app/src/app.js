const express = require("express");
const app = express();
app.use(express.json());


app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/fields", require("./routes/fields.js"));
app.use("/api/tournaments", require("./routes/tournaments.js"));
app.use("/api/matches", require("./routes/matches.js"));
app.use("/api/users", require("./routes/users.js"));

app.listen(3000, () => {

});

