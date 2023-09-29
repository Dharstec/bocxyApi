const productModel = require("../models/productModels");
const inventoryModel = require("../models/inventoryModels");
const orderModel = require("../models/orderModels");
const customerModel = require("../models/customerModels");

module.exports = {
  createinventoryProduct: async (req, res) => {
    try {
      inventoryModel.find({ productId: req.body.productId,storeId:req.body.storeId})
            .exec(async function (err, result) {
                if (err) {
                    console.log("Error in getting data in inventory model", err);
                }
                else{
                  if(result.length>0){
                    return res.status(200).send({
                      message: "Inventory Product is already existed",
                      status: false,
                    });
                  }else{
                    try{
                      let newproduct = new inventoryModel({
                        superAdminId:req.body.superAdminId,
                        productImages: req.body.imageArray,
                        productVideos: req.body.videoArray,
                        productName: req.body.productName,
                        discountPrice: req.body.discountPrice,
                        actualPrice: req.body.actualPrice,
                        description: req.body.description,
                        category: req.body.category,
                        productId: req.body.productId,
                        quantity: req.body.quantity,
                        storeId: req.body.storeId,
                        brand: req.body.brand,
                        formulation: req.body.formulation,
                        avgCustomerRating: req.body.avgCustomerRating,
                        collections: req.body.collections,
                        gift: req.body.gift,
                        personalised: req.body.personalised,
                        latest: req.body.latest,
                        viewedBy: req?.body?.viewedBy,
                        noOfViews: req?.body?.noOfViews,
                        noOfSales: req?.body?.noOfSales,
                        productAge: req?.body?.productAge,
                        referenceId: req.body.referenceId,
                        barcode: req.body.barcode,
                      })
                      let createProduct = await newproduct.save();
                      console.log("createProduct", createProduct);
                      return res.status(200).send({
                        message: "Inventory Product Created Successfully",
                        status: true,
                        data: createProduct,
                      });
                    } catch (err) {
                      console.log("error", err);
                      return res.status(400).send({
                        message: "Please Enter All Details",
                        status: false,
                      });
                    }
                   
                  
                }
              }
            })
     

    } catch (err) {
      console.log("error", err);
      return res.status(400).send({
        message: "Please Enter All Details",
        status: false,
      });
    }
  },

  getinventoryProduct: async (req, res) => {
    try {
      let getProduct = await inventoryModel.find({ storeId: req.params.storeId });

      if (!getProduct) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "Get All inventory product",
          status: true,
          data: getProduct,
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
  getOneProduct: async (req, res) => {
    try {
      let getOneProduct = await inventoryModel.findOne({ _id: req.params._id });
      if (!getOneProduct) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "Get One product",
          status: true,
          data: getOneProduct,
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
  updateProduct: async (req, res) => {
    try {
      let updateProduct = await inventoryModel.findOneAndUpdate(
        {
          _id: req.body._id,
        },
        {
          $set:{
            quantity:req.body.quantity
          } ,
        },
        { new: true }
      );

      if (!updateProduct) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "Update  Product Successfully",
          status: true,
          data: updateProduct,
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
  deleteProduct: async (req, res) => {
    try {
      let deleteProduct = await inventoryModel.findOneAndDelete(
        {
          _id: req.params._id  // _id:req.body._id is not working in frontend
        },
      );
      console.log("deleteProduct-1", deleteProduct._id)

      if (!deleteProduct) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        console.log("deleteProduct", deleteProduct);
        console.log("data", deleteProduct);
        return res.status(200).send({
          message: "Delete Product Successfully",
          status: true,
          data: deleteProduct,
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