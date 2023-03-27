const mongoose = require("mongoose");
const marketingSchema = new mongoose.Schema(
    {

        campanignTitle: {
            type: String,
            required: true,
        },
        yourContent: {
            type: String,
            required: true,
        },
        targetCustomer: {
            allCustomers: {
                type: String,
                required: true,

            },
            maleOnly: {
                type: String,
                required: true,

            },
            femaleOnly: {
                type: String,
                required: true,

            }
        },
        sendVia: {
            email: {
                type: String,
                required: true,

            },
            sms: {
                type: String,
                required: true,


            },
            whatsApp: {
                type: String,
                required: true,

            }
        },
        addMedia: {
            type: String,
            required: true,

        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Marketing", marketingSchema);
