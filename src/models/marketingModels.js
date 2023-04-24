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
        targetCustomer:
            {
                type: Array,
                required: true,
            },
        // {
        //     allCustomers: {
        //         type: String,
        //         required: true,

        //     },
        //     maleOnly: {
        //         type: String,
        //         required: true,

        //     },
        //     femaleOnly: {
        //         type: String,
        //         required: true,

        //     }
        // },
        sendVia: {
            type: Array,
            required: true,
        },
        addMedia: {
            type: String,
            required: true,

        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Marketing", marketingSchema);
