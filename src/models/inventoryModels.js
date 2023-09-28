const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const inventorySchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        productId: {
            type: String,
            required: false,
        },
        quantity: {
            type: Number,
            required: true,
        },
        userId: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: [
            {
                type: String,
                required: true
            }
        ],
        brand: [
            {
                type: String,
                required: false
            }
        ],
        formulation: [
            {
                type: String,
                required: false
            }
        ],
        avgCustomerRating: [{
            type: String,
            required: false
        }],
        referenceId:{
            type:Number,
            required:true
        },
        gift: {
            type: Boolean,
            // required: true
        },
        personalised: {
            type: Boolean,
            // required: true
        },
        latest: {
            type: Boolean,
            // required: true
        },
        collections: [
            {
                type: String,
                // required: true
            }
        ],
        viewedBy: {
            customerId: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Customer',
            }],
        },
        noOfViews: Number,
        noOfSales: Number,
        productAge: String,
        barcode: String
    },
    { timestamps: true }
);
//refe id for product for our referece 
module.exports = mongoose.model("inventory", inventorySchema);

