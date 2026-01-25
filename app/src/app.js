const express = require("express");
const app = express();
app.use(express.json());


app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/fields", require("./routes/fields.js"));

app.listen(3000, () => {

});

