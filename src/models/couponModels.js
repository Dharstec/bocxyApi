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
        createdBy: {
            type: String,
            required: true,
        },
        // availedQuantity: {
        //     type: Number,
        //     required: true,
        // },
        remaining: {
            type: Number,
            required: true,
        },
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
         type:Array,
         required:true
        },
        description:{
            type:String
        },
        limit:{
            type:Number
        },
        couponStatus:{
            type:Boolean
        }



    },
    { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
