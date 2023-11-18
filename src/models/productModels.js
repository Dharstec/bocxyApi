const mongoose = require("mongoose");
const {
    v4: uuidv4
} = require("uuid");
const productSchema = new mongoose.Schema({
    // productId:{
    //     type:String,
    //     required: true,
    //     default: uuidv4,
    // },
    //   type: Number,
    //   required:true
    superAdminId: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productImages: [{
        type: String,
        required: true,
    }],
    productVideos: [{
        type: String,
        required: true,
    }],
    discountPrice: {
        type: Number,
        required: true
    },
    actualPrice: {
        type: Number,
        required: true
    },
    gender: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    category: [{
        type: String,
        required: true
    }],
    brand: [{
        type: String,
        required: false
    }],
    formulation: [{
        type: String,
        required: false
    }],
    avgCustomerRating: [{
        type: String,
        required: false
    }],
    referenceId: {
        type: Number,
        required: true
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
    collections: [{
        type: String,
        // required: true
    }],
    comparedPrice: {
        type: Number
    },
    productDetails: {
        type: String
    },
    viewedBy: {
        customerId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        }],
    },
    subCategory: [{
        type: String,
        required: true
    }],
    type: [{
        type: String
    }],

    noOfViews: Number,
    noOfSales: Number,
    productAge: String,
    barcode: String
}, {
    timestamps: true
});
//refe id for product for our referece
module.exports = mongoose.model("Product", productSchema);