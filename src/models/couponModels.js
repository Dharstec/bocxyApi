const mongoose = require("mongoose");
var moment = require('moment');  
const couponSchema = new mongoose.Schema(
    {

        couponName: {
            type: String,
            // required: true,
        },
        totalQuantity: {
            type: Number,
            // required: true,
        },
        availedQuantity: {
            type: Number,
            // required: true,
        },
        createdBy: {
            type: String,
            // required: true
        },
       createdDate:{
        type:String
       },
        validDateTill: {
            type: String,
            // default:moment(new Date(Date.now())).format('MMMM Do YYYY, h:mm:ss a')
        },
        discountPercentage: {
            type: String,
            // required: true
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
