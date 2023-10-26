const mongoose = require("mongoose");
const filterSchema = new mongoose.Schema(
    {

        brands: {
            type: Array,
            required: true,
        },
        category: {
            type: Array,
            required: true,
        },
        formulation: {
            type: Array,
            required: true,
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("filter", filterSchema);
