const productModel = require("../models/productModels");

module.exports = {
  createProduct: async (req, res) => {
    try {
      let newproduct = new productModel({
        productName: req.body.productName,
        productImage: req.body.productImage,
        discountPrice: req.body.discountPrice,
        actualPrice: req.body.actualPrice,
        description: req.body.description,
        stock: req.body.stock,
        category: req.body.category,
        stone: req.body.stone,
        colour: req.body.colour,
        style: req.body.style,
      });
      console.log("newproduct", newproduct);
      let createProduct = await newproduct.save();
      console.log("createProduct", createProduct);
      return res.status(200).send({
        message: "Product Created Successfully",
        status: true,
        data: createProduct,
      });

    } catch (error) {
      console.log("error", error);
      return res.status(400).send({
        message: "Please Enter All Details",
        status: false,
      });
    }
  },
  getProduct: async (req, res) => {
    try {
      let getProduct = await productModel.find({});

      if (!getProduct) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "Get All product",
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
      let getOneProduct = await productModel.findOne({productId:req.params._id});
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
      let updateProduct = await productModel.findOneAndUpdate(
        {
          productId: req.body._id,
        },
        {
          $set: req.body,

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
      let deleteProduct = await productModel.findOneAndDelete(
        {
          productId: req.body._id,
        },
      );

      if (!deleteProduct) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
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