const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.MONGOBDURL
mongoose.set('strictQuery', true);
mongoose.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, result) => {
        if (err) {
            console.log("Database Connection Error", err);
        }
        else {
            console.log("Database Connected");
        }
    }
);

