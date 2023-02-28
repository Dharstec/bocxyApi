const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const orderSchema = new mongoose.Schema(
    {
        orderedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
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
            // type: String,
            // required: true
            doorNoAndStreet: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: Number, required: true },
            landmark: { type: String, required: true },
            country: { type: String, required: true },
        },
        orders:
            [{
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true

                },
                quantity: {
                    type: Number,
                    required: true

                },
            }],
        orderStatus: {
            type: String,
            required: true
        },
        //  modeOfPayment:{
        //             type: String,
        //             default: '0' 
        //         }
        //     Mode of payment:{
        //         Status: "pending or success "
        //         Method: "razorpay or cashondelivery
        //   }
        modeOfPayment: {
            type: Array,
            default: [{
                mode: {
                    type: String,
                    required: true
                },
                status: {
                    type: String,
                    default: 0
                },
                comment: {
                    type: String,
                    required: true
                },
                updateDate: {
                    type: Date,
                    default: Date.now
                }
            }]
        },
        // cod==>(status)=>succes
        // raz==>(status)=>pending===>succes
        // {
        //     type:Array,
        //     productId: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Product'
        //     },
        //     quantity: {
        //         type: Number,
        //         required: true
        //     },
        // },
        // orders:
        //     [
        //         {
        //                 productDetails:[ {
        //                     type: mongoose.Schema.Types.ObjectId,
        //                     ref: 'Product',
        //                 }],
        //                 quantity: {
        //                     type: Number,
        //                     required: true
        //                 },

        //             // order2:
        //             // {
        //             //     type: Array,
        //             //     productDetails: {
        //             //         type: mongoose.Schema.Types.ObjectId,
        //             //         ref: 'Product',
        //             //     },
        //             //     quantity: {
        //             //         type: Number,
        //             //         required: true
        //             //     },
        //             // },
        //             // order3:
        //             // {
        //             //     type: Array,
        //             //     productDetails: {
        //             //         type: mongoose.Schema.Types.ObjectId,
        //             //         ref: 'Product',
        //             //     },
        //             //     quantity: {
        //             //         type: Number,
        //             //         required: true
        //             //     },
        //             // },
        //         }

        //     ],
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

