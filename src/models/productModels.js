const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const productSchema = new mongoose.Schema(
    {
        productId: {
            type: Number,
          required:true
        },
        productName: {
            type: String,
            required: true,
        },
        productImage: {
            type: String,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: true
        },
        actualPrice: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        // category: [ "ring",]
        category: [
            {
                type: String,
                required: true
            }
        ],
        stone: [
            {
            type: String,
            required: true
        }
    ],
        colour: [
            {
            type: String,
            required: true
        }
    ],
        style: [{
            type: String,
            required: true
        }],
        for: [{
            type: String,
            required: true
        }],
        
        gift: {
            type: Boolean,
            required: true
        },
        personalised: {
            type: Boolean,
            required: true
        },
        latest: {
            type: Boolean,
            required: true
        },
        collections:[
            {
                type:String,
                required:true
            }
        ]
       
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

