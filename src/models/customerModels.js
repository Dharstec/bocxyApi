const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const customerSchema = new mongoose.Schema(
    {
        
        customerName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        customerAddress: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        otp: {
            type: String
        },
        isOtpVerified: {
            type: String,
            default: '0'
        },
        wishlistProductIdDetails: [
            {
                type: String,
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            }
        ],
        cartProductDetails: {
            type: Array,
            productId: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            }],
            quantity: [{
                type: Number,
            }],
        },
        orderHistory: [
            {
                type: String,
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
            }
        ],
        // wishlistProductDetails:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Product',
        // },
        // cartProductDetails:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Product',
        // },
        // orderHistory: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Order',
        // },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);