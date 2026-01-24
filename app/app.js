const express = require("express");

const app = express();

app.use(express.json());
app.use("/auth", require("./auth"));


app.listen(3000, () => {
  
})