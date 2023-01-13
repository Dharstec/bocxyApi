const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const customerSchema = new mongoose.Schema(
    {
        customerId: {
            type: Number,
            required: true
        },
        customerName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        emailId: {
            type: String,
            required: true
        },
        customerAddress: {
            type: String,
            required: true
        },
        orderHistory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);

