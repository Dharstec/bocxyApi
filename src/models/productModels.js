const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        productImage: {
            type: String,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: true
        },
        actualPrice: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        stock: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        stone: {
            type: String,
            required: true
        },
        colour: {
            type: String,
            required: true
        },
        style: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

