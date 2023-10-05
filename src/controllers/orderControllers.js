const orderModel = require("../models/orderModels");
const cusModel = require("../models/customerModels")
const inventoryModel = require("../models/inventoryModels")
const adminModel = require("../models/adminModels")
const { template } = require('handlebars');
const orderpdf = require("./documentPDFFiles")
const validation = require("./validation")

module.exports = {
  createOrder: async (req, res) => {
    try {
      let neworder = new orderModel(req.body)
      console.log("neworder", neworder);

      let validationError = await validation.orderQuantityValidation(neworder)
      console.log(validationError,"validationError")
      if(validationError.length > 0){
        return res.status(200).send({
          message: "Failed to create order. Selected Quantity is not available in this store.",
          status: true,
        });
      }else{
        // return res.status(200).send({
        //   message: "Order Created Successfully",
        //   status: true,
        //   data:[],
        // });
        console.log("ORDER CREATION STARTED")
        neworder.orders.forEach(async e=>{
          let getData= await inventoryModel.findOne({productId: e.productId, storeId:neworder.storeId})  
          .exec(async function (err, result) {
            if (err) {
                console.log("Error in getting data in admin model", err);
            }else{
              // console.log("getData",result)
              let minusQuantity =  result.quantity - e.quantity
             
                let updateQuantity = await inventoryModel.findOneAndUpdate(
                  {
                    productId: e.productId,
                    storeId:neworder.storeId
                  },
                  {
                    $set: {
                      quantity: minusQuantity
                    },
                  },
                  { new: true }
                );
                // console.log("updateQuantity",updateQuantity)
          }
            })
          })
          let createOrder = await neworder.save();
        // console.log("getData",getData)
      
        let updateCusCart = await cusModel.findOneAndUpdate(
          {
            email: req.body.customerEmailId,
          },
          {
            $unset: {
              cartProductDetails: []
            },
            $set: {
              isCartProductDetails: "0"
            },
          },
          { new: true }
        );
        // console.log(updateCusCart, "updateCusCart")
        // console.log("createOrder", createOrder);
        return res.status(200).send({
          message: "Order Created Successfully",
          status: true,
          data:createOrder,
        });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(400).send({
        message: "Please Enter  All Order Details",
        status: false,
      });
    }
  },

  //  getOrderStoreId: async function (ordersList){
  //   return new Promise(async (resolve, reject) => {
  //     let orderStoreId=[]
  //     let getAllStoreAdmin = await adminModel.find({ role_flag: "STORE_ADMIN" })
  //     console.log("getAllStoreAdmin",getAllStoreAdmin)
  //     if(getAllStoreAdmin.length){
  //       getAllStoreAdmin.forEach(async (e,i)=>{
  //         let getOneStoreData = await inventoryModel.find({ storeId: e._id })
  //         console.log("getOneStoreData",getOneStoreData)
  //         getOneStoreData.forEach(y=>{
  //           ordersList.forEach(async x=>{
  //             if( x.productId == y.productId && y.quantity >= x.quantity){
  //               orderStoreId.push(y)
  //               // console.log("storeId",orderStoreId)
  //             }else{
  //               orderStoreId.push('-'+y)
               
  //             }
  //           })
  //         })
  //         if(getAllStoreAdmin.length-1==i){
  //           resolve(orderStoreId);
  //           // console.log("storeId",orderStoreId)
  //         }
         
  //       })
  //     }
      
  //     // resolve(outputData);
  // });
  // },

  getAllOrder: (req, res) => {
    orderModel.find({storeId: req.params.storeId})
      .populate('orderedBy')
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

