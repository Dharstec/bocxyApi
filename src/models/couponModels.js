const mongoose = require("mongoose");
var moment = require('moment');
const couponSchema = new mongoose.Schema(
    {

        couponName: {
            type: String,
            required: true,
        },
        totalQuantity: {
            type: Number,
            required: true,
        },
        availedQuantity: {
            type: Number,
            required: true,
        },
        // remaining: {
        //     default:0
        //     // type: Number,
        //     // required: true,
        // },
        // remainer qunatity in front end
        createdFor: {
            type: String,
            // required: true
        },
        totalOrders: {
            type: Number
        },
        totalSales: {
            type: Number
        },
        totalCommissions: {
            type: Number
        },
        createdDate: {
            type: String
        },
        validDateTill: {
            type: String,
            // default:moment(new Date(Date.now())).format('MMMM Do YYYY, h:mm:ss a')
        },
        discountPercentage: {
            type: String,
            // required: true
        },
        type:{
         type:String,
         required:true
        },
        description:{
            type:String
        }


    },
    { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
