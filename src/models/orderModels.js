const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const orderSchema = new mongoose.Schema(
    {
        orderedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
        giftWrap: {
            type: Boolean,
            required: true
        },
        customerName: {
            type: String,
            required: true,
        },
        customerEmailId: {
            type: String,
            required: true
        },
        customerPhoneNumber: {
            type: Number,
            required: true
        },
        customerAddress: {
            type: String,
            required: true
        },
        orders:
            [
                {
                    order1:
                    {
                        type: Array,
                        productDetails: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'Product',
                        },
                        quantity: {
                            type: Number,
                            required: true
                        },
                    },

                    order2:
                    {
                        type: Array,
                        productDetails: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'Product',
                        },
                        quantity: {
                            type: Number,
                            required: true
                        },
                    },
                    order3:
                    {
                        type: Array,
                        productDetails: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'Product',
                        },
                        quantity: {
                            type: Number,
                            required: true
                        },
                    },
                }],

        orderStatus: [{
            type: String,
            required: true
        }]

    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);




// orders: [
//     {
//         order1: [
//             {
//                 produtDetails: '1234',
//                 qunatity: 12334
//             }

//         ],
//         order2: [
//             {
//                 produtDetails: '1234',
//                 qunatity: 12334
//             }

//         ],
//         order3: [
//             {
//                 produtDetails: '1234',
//                 qunatity: 12334
//             }

//         ],

//     }

// ]