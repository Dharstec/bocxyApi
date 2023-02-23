const orderModel = require("../models/orderModels");

module.exports = {
  createOrder: async (req, res) => {
    try {
      let neworder = new orderModel(req.body)
      console.log("neworder", neworder);
      let createOrder = await neworder.save();
      console.log("createOrder", createOrder);
      return res.status(200).send({
        message: "Order Created Successfully",
        status: true,
        data: createOrder,
      });

    } catch (error) {
      console.log("error", error);
      return res.status(400).send({
        message: "Please Enter  All Order Details",
        status: false,
      });
    }
  },
  getAllOrder: (req, res) => {
    orderModel.find({})
      .populate('orderedBy')
      .populate({
        path: 'orders',
        populate: {
          path: 'productId'
        }
      })
      // .populate('orders.productId')
      .exec((err, result) => {
        if (err) {
          console.log("err", err);
          return res.status(400).json({ err });
        }
        else {
          // console.log("Get All Order", result)
          return res.status(200).json(
            {
              message: " Get All Orders",
              data: result
            }
          );
        }
      });
  },

  getOneOrder: async (req, res) => {
    try {
      let getOneOrder = await orderModel.findOne({ _id: req.body._id })
        .populate('orderedBy')
        // .populate({
        //   path:'orders',
        //   populate:{
        //     path:'productId'
        //   }
        // })
        .populate('orders.productId');
      if (!getOneOrder) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "Get One Order",
          status: true,
          data: getOneOrder,
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
  updateOrder: async (req, res) => {
    try {
      let updateOrder = await orderModel.findOneAndUpdate(
        {
          orderId: req.body._id,
        },
        {
          $set: req.body,

        },
        { new: true }
      );

      if (!updateOrder) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "Update Order Successfully",
          status: true,
          data: updateOrder,
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
  deleteOrder: async (req, res) => {
    try {
      let deleteOrder = await orderModel.findOneAndDelete(
        {
          orderId: req.body._id,
        },
      );

      if (!deleteOrder) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "Delete Order Successfully",
          status: true,
          data: deleteOrder,
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
  // updateOrderStatus: async (req, res) => {
  //   //     try {
  //   //       let updatestatus=await orderModel.findOneAndUpdate({_id:req.body._id},
  //   //         {$set:{modeOfPayment:'1'}},{ new: true });
  //   //         if(!updatestatus){
  //   //           return res.send({
  //   //             message:"order status pending",
  //   //             status:0
  //   //           })
  //   //         }
  //   //         else if(updatestatus.modeOfPayment=='1'){
  //   // return res.status(200).send({
  //   //   message: "order status success",
  //   //   status:1
  //   // })

  //   //         }
  //   //     } catch (error) {
  //   //       return res.status(400).send({
  //   //         message: "Something update status orders Wrong",
  //   //         status: false,
  //   //         error: error,
  //   //       });
  //   //     }
  //   //   }
  //   try {
  //     if (!req.body._id || !req.body.orderStatus) {
  //       return res.send({
  //         message: "Please enter a valid Order And Product details",
  //         status: 0
  //       });
  //     }
  //     let getOrder = await orderModel.findOne({
  //       _id: req.body._id
  //     })
  //     if (!getOrder) {
  //       return res.send({
  //         message: "Please enter a valid Order details",
  //         status: 0
  //       });
  //     }
  //     let status = {
  //       status: req.body.orderStatus,
  //       comment: req.body.comment,
  //       updateDate: new Date()
  //     };
  //     getOrder = await orderModel
  //     .findOneAndUpdate({
  //         _id: req.body._id,
  //         "orderStatus.status": {
  //             $nin: [req.body.orderStatus]
  //         }
  //     }, {
  //         $push: {
  //             orderStatus: status
  //         }
  //     }, {
  //         new: true
  //     })
  //     .exec();
  //     if (!getOrder) {
  //       return res.send({
  //         message: "order status update already ",
  //         status: 0
  //       })
  //     }
  //     return res.send({
  //       message: "Order Status Update  and Order Details",
  //       status: 1,
  //       data: {
  //         order: getOrder
  //       }
  //     })

  //   } catch (error) {
  //     console.log("ERROR", error);
  //     return res.send({
  //       message: "Please enter a valid details",
  //       status: 0
  //     });
  //   }
  // }

}
