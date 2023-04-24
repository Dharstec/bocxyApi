const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./config/db");
const path = require('path')
app.use(cors());
app.use(bodyParser.json({ limit: "500mb" }));

app.use(express.static(path.join(__dirname, '../public/files')));

require("./baseRouter")(app);

module.exports = app;
