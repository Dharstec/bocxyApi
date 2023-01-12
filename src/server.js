const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./config/db");

app.use(cors());
app.use(bodyParser.json({ limit: "500mb" }));

require("./baseRouter")(app);

module.exports = app;