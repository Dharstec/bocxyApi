const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const customerSchema = new mongoose.Schema(
    {
        // customerId: {
        //     type: Number,
        //     required: true
        // },
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
        password:{
            type:String,
            required:true
        },
        otp:{
            type:String
        },
        isOtpVerified:{
            type: String,
            default: '0'
        },
        wishlistProductDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        cartProductDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        orderHistory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);

