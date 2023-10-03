const mongoose = require("mongoose");
const { string } = require("sharp/lib/is");
const { v4: uuidv4 } = require("uuid");
const adminSchema = new mongoose.Schema(
    {

        store_name: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        phone_no: {
            type: Number,
            required: false
        },
        co_ordinates: [{
            type: String,
            required: false
        }],
        otp: {
            type: Number
        },
        isOtpVerified: {
            type: Number,
            default: 0
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        super_admin_id: {
            type: String,
            required: false
        },
        role_flag: {
            type: String,
            required: false
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("bocxy_admins", adminSchema);