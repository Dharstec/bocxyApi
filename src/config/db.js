const mongoose = require("mongoose");

const db = "mongodb+srv://dharstec:dharstec123@cluster0.m03c45q.mongodb.net/product?retryWrites=true&w=majority"

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