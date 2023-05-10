const productModel = require("../models/productModels");
module.exports = {
  createProduct: async (req, res) => {
    imageArray = []
    videoArray = []
    req?.files && req.files.map((img => {
      console.log("img.originalname", img.originalname);
      if (`'${img.originalname}'`.includes('.jpg', '.png', '.jpeg','.webp')) { // cap JPG
        console.log("img.originalname", img.originalname);
        imageArray.push(`${process.env.URLLIVE}/${img.filename}`)
      } else if (`'${img.originalname}'`.includes('.mp4')) {
        videoArray.push(`${process.env.URLLIVE}/${img.filename}`)
      }
    }
    ));
    try {
      let newproduct = new productModel({
        productImages: imageArray,
        productVideos: videoArray,
        productName: req.body.productName,
        discountPrice: req.body.discountPrice,
        actualPrice: req.body.actualPrice,
        description: req.body.description,
        stock: req.body.stock,
        category: req.body.category,
        stone: req.body.stone,
        colour: req.body.colour,
        style: req.body.style,
        for: req.body.for,
        gift: req.body.gift,
        personalised: req.body.personalised,
        latest: req.body.latest,
        collections: req.body.collections,
        viewedBy: req?.body?.viewedBy,
        noOfViews: req?.body?.noOfViews,
        noOfSales: req?.body?.noOfSales,
        productAge: req?.body?.productAge,
        referenceId: req.body.referenceId,
        barcode:req.body.barcode,
      })
      console.log("newproduct", newproduct);
      let createProduct = await newproduct.save();
      console.log("createProduct", createProduct);
      return res.status(200).send({
        message: "Product Created Successfully",
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
      let getOneProduct = await productModel.findOne({ _id: req.params._id });
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
          _id: req.body._id,
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