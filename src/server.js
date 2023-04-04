const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./config/db");
const path = require('path')
// const img = require('./public/files/admin-myFile-1679649851321.mp4')
app.use(cors());
app.use(bodyParser.json({ limit: "500mb" }));

// app.use(express.static('public/files'));
app.use(express.static(path.join(__dirname, '../public/files')));
// app.use(express.static(`${__dirname} /public/files`));


// app.use(express.static(path.join(__dirname + '../images/files')));

require("./baseRouter")(app);

module.exports = app;
