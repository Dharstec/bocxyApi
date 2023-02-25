const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const customerSchema = new mongoose.Schema(
    {

        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        gender: {
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
            // type: String,
            // required: true
            doorNoAndStreet: String,
            city: String,
            state: String,
            pincode: Number,
            landmark: String,
            country: String
        },
        password: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: String,
            required: true,
            trim: true,
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
        cartProductDetails: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
            },
        }],
        orderHistory: [
            {
                type: String,
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
            }
        ],

        productsViewed: {
            productId: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            }],
        },
        address: [{
            doorNoAndStreet:String,
            city: String,
            state: String,
            pincode: Number,
            landmark: String,
            country: String
        }]

    },
    { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);