const { populate } = require("../models/orderModels");
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
      path:'orders',
      populate:[
        {
          path:'order1',
          select:'productDetails'
        }
      ]
     })
      // .populate('orders.order1.productDetails')
      // .populate({path:'orders.order1.productDetails'})
      // .populate('order1')
      .exec((err, result) => {
        if (err) {
          console.log("err", err);
          return res.status(400).json({ err });
        }
        else {
          console.log("Get All Products", result)
          return res.status(200).json({ result });
        }
      });
  },

  getOneOrder: async (req, res) => {
    try {
      let getOneOrder = await orderModel.findOne({ orderId: req.body._id });
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
  }
}