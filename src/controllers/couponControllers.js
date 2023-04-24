const couponModels = require('../models/couponModels');
var moment = require('moment');  

var validDateTill= moment().add(10, 'days').calendar(); 
var createdDate= moment().format()
module.exports = {
    createCoupon: async (req, res) => {
      // let getCoupon = await couponModels.find({});
      // let remaining=0;
      // for(let item of getCoupon){
      //    amount += item.totalQuantity - item.availedQuantity;
      //   let res = amount+remaining 
      //   // return res
      // }
        try {
            let newcoupon = new couponModels({
                couponName:req.body.couponName,
                totalQuantity:req.body.totalQuantity,
                availedQuantity: req.body.availedQuantity,
                createdFor:req.body.createdFor,
                totalOrders:req.body.totalOrders,
                totalSales:req.body.totalSales,
                totalCommissions:req.body.totalCommissions,
                createdDate:createdDate,
                validDateTill:validDateTill,
                discountPercentage:req.body.discountPercentage,
                type:req.body.type,
                description:req.body.description,
                remaining:req.body.remaining
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
      deleteCoupon: async (req, res) => {
        console.log(req.params._id)
        try {
            let deleteCoupon = await couponModels.findByIdAndRemove(
                {
                    _id: req.params._id,
                },
            );
            console.log("deleteCoupon", deleteCoupon)

            if (!deleteCoupon) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                console.log("deleteCoupon", deleteCoupon);
                console.log("data", deleteCoupon);
                return res.status(200).send({
                    message: "Delete Coupon Successfully",
                    status: true,
                    data: deleteCoupon,
                });
            }
        } catch (error) {
            console.log("errrrrr", error);
            return res.status(400).send({
                message: "Something Went Wrong",
                status: false,
                error: error,
            });
        }
    },
    updateCoupon: async (req, res) => {
      try {
          let updateCoupon = await couponModels.findOneAndUpdate(
              {
                  _id: req.body._id,
              },
              {
                  $set: req.body,
              },
              { new: true }
          );

          if (!updateCoupon) {
              return res.status(400).send({
                  message: "No Record Found",
                  status: false,
              });
          } else {
              return res.status(200).send({
                  message: "Updated Marketing Successfully",
                  status: true,
                  data: updateCoupon,
              });
          }
      } catch (error) {
          console.log("errrrrr", error);
          return res.status(400).send({
              message: "Something Went Wrong",
              status: false,
              error: error,
          });
      }
  },

  findCoupon: async (req, res) => {
    console.log(req.params)
    try {
      let findId = await couponModels.findOne({ _id: req.params._id  })

        if (!findId) {
            return res.status(400).send({
                message: "No Record Found",
                status: false,
            });
        } else {
            return res.status(200).send({
                message: "Success",
                status: true,
                data: findId,
            });
        }
    } catch (error) {
        console.log("errrrrr", error);
        return res.status(400).send({
            message: "Something Went Wrong",
            status: false,
            error: error,
        });
    }
},

}