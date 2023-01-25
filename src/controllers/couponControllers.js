const couponModels = require('../models/couponModels');
var moment = require('moment');  

var validDateTill= moment().add(10, 'days').calendar(); 
var createdDate= moment().format()
module.exports = {
    createCoupon: async (req, res) => {
        try {
            let newcoupon = new couponModels({
                couponName:req.body.couponName,
                totalQuantity:req.body.totalQuantity,
                availedQuantity: req.body.availedQuantity,
                createdBy:req.body.createdBy,
                createdDate:createdDate,
                validDateTill:validDateTill,
                discountPercentage:req.body.discountPercentage
            
            });
            console.log("newcoupon", newcoupon);
            let createCoupon = await newcoupon.save();
            console.log("createCoupon", createCoupon);
            return res.status(200).send({
                message: "Coupon Created Successfully",
                status: true,
                data: createCoupon
            })
        } catch (error) {
            console.log("errror", error)
            return res.status(400).send({
                message: "Please Enter All Coupon Details",
                status: false
            })
        }
    },
    getCoupon: async (req, res) => {
        try {
          let getCoupon = await couponModels.find({});
          if (!getCoupon) {
            return res.status(400).send({
              message: "No Record Found",
              status: false,
            });
          } else {
            return res.status(200).send({
              message: "Get All Coupon",
              status: true,
              data: getCoupon,
            });
          }
        } catch (error) {
          return res.status(400).send({
            message: "Something Went Wrong",
            status: false,
            error: error,
          });
        }
      },

}