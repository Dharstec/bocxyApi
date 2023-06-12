const orderModel = require("../models/orderModels");
const cusModel = require("../models/customerModels")
const { template } = require('handlebars');
const orderpdf = require("./documentPDFFiles")

module.exports = {
  createOrder: async (req, res) => {
    try {

      let neworder = new orderModel(req.body)
      console.log("neworder", neworder);
      let createOrder = await neworder.save();
      let updateCusCart = await cusModel.findOneAndUpdate(
        {
          phoneNumber: req.body.customerPhoneNumber,
        },
        {
          $set: { cartProductDetails: [] },
        },
        { new: true }
      );
      console.log(updateCusCart, "updateCusCart")
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
      // .populate({
      //   path: 'orders',
      //   populate: {
      //     path: 'productId'
      //   }
      // })
      .populate('orders.productId')
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
          _id: req.body._id,
        },
        {
          $set: req.body,
          // orderStatus:req.body.orderStatus
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
          _id: req.body._id,
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
  updateOrderStatus: async (req, res) => {
    try {
      if (!req.body._id || !req.body.modeOfPayment) {
        return res.send({
          message: "Please enter a valid Order And Product details",
          status: 0
        });
      }
      let getOrder = await orderModel.findOne({
        _id: req.body._id
      })
      if (!getOrder) {
        return res.send({
          message: "Please enter a valid Order details",
          status: 0
        });
      }
      // modeOfPayment.mode
      let status = {
        status: req.body.modeOfPayment,
        comment: req.body.comment,
        updateDate: new Date()
      };
      getOrder = await orderModel
        .findOneAndUpdate({
          _id: req.body._id,
          "modeOfPayment.status": {
            $nin: [req.body.modeOfPayment]
          }
        }, {
          $push: {
            modeOfPayment: status
          }
        }, {
          new: true
        })
        .exec();
      if (!getOrder) {
        return res.send({
          message: "modeOfPayment update already ",
          status: 0
        })
      }
      return res.send({
        message: "modeOfPayment Update  and Order Details",
        status: 1,
        data: {
          order: getOrder
        }
      })

    } catch (error) {
      console.log("ERROR", error);
      return res.send({
        message: "Please enter a valid details",
        status: 0
      });
    }
  },
  sendOrderConfirmationEmail: async (req, res) => {
    try {
      let orderemail = await orderModel.findOne({ customerEmailId: req.body.customerEmailId })
      if (!orderemail) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      }
      else {
        reqBody = {
          customerName: req.body.customerName,
          customerPhoneNumber: req.body.customerPhoneNumber,
          customerEmailId: req.body.customerEmailId,
          customerAddress: req.body.customerAddress,
          orders: req.body.orders
        }
        let order = await orderpdf.orderPdf(reqBody)
        console.log("email order", order)
        return res.status(200).send({
          message: "Order Confirmation Email Send Successfully",
          status: true,
          data: order
        })
      }
    }
    catch (error) {
      console.log("sendOrderConfirmationEmail", error);
      return res.status(400).send({
        message: "Something Went Wrong",
        status: false,
        error: error
      })
    }
  }

}

