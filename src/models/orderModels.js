const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const orderSchema = new mongoose.Schema(
    {
        customerDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
        billingAddress: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        productDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        price: {
            type: Number,
            required: true
        },
        orderStatus: [{
            type: String,
            required: true
        }],

    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

