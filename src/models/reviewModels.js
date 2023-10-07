const mongoose = require("mongoose");
var moment = require('moment');
const reviewSchema = new mongoose.Schema(
    {

        reviewTitle: {
            type: String,
            required: false,
        },
        reviewDescription: {
            type: String,
            required: false,
        },
        storeId: {
            type: String,
            required: true,
        },
        orderId: {
            type: String,
            required: true
        },
        productId: {
            type: String,
            required: true
        },
        customerId: {
            type: String,
            required: true
        },
        ratings: {
            type: Number,
            required: true
        },


    },
    { timestamps: true }
);

module.exports = mongoose.model("reviews", reviewSchema);
