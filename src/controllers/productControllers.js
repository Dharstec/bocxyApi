const productModel = require("../models/productModels");
const inventoryModel = require("../models/inventoryModels");
const orderModel = require("../models/orderModels");
const customerModel = require("../models/customerModels");

module.exports = {
  createProduct: async (req, res) => {
    // imageArray = []
    // videoArray = []
    // req?.files && req.files.map((img => {
    //   console.log("img.originalname", img.originalname);
    //   if (`'${img.originalname}'`.includes('.jpg', '.png', '.jpeg')) { // cap JPG
    //     console.log("img.originalname", img.originalname, `'${img.originalname}'`.includes('.jpg', '.png', '.jpeg', '.webp'));
    //     imageArray.push(`${process.env.URLLIVE}/${img.filename}`)
    //   } else if (`'${img.originalname}'`.includes('.mp4')) {
    //     videoArray.push(`${process.env.URLLIVE}/${img.filename}`)
    //   }
    // }
    // ));
    try {
      let newproduct = new productModel({
        productImages: req.body.imageArray,
        productVideos: req.body.videoArray,
        productName: req.body.productName,
        discountPrice: req.body.discountPrice,
        actualPrice: req.body.actualPrice,
        description: req.body.description,
        category: req.body.category,
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
      console.log("newproduct", newproduct);
      let createProduct = await newproduct.save();
      console.log("createProduct", createProduct);
      // let inventory = new inventoryModel({
      //   productImages: req.body.imageArray,
      //   productVideos: req.body.videoArray,
      //   productName: req.body.productName,
      //   productId: createProduct._id,
      //   discountPrice: req.body.discountPrice,
      //   actualPrice: req.body.actualPrice,
      //   description: req.body.description,
      //   category: req.body.category,
      //   quantity: 0,
      //   brand: req.body.brand,
      //   formulation: req.body.formulation,
      //   avgCustomerRating: req.body.avgCustomerRating,
      //   collections: req.body.collections,
      //   gift: req.body.gift,
      //   personalised: req.body.personalised,
      //   latest: req.body.latest,
      //   viewedBy: req?.body?.viewedBy,
      //   noOfViews: req?.body?.noOfViews,
      //   noOfSales: req?.body?.noOfSales,
      //   productAge: req?.body?.productAge,
      //   referenceId: req.body.referenceId,
      //   barcode: req.body.barcode,
      // })
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
  createProductImage: async (req, res) => {
    imageArray = []
    videoArray = []
    req.files.map((img) => {
      console.log("img.originalname", img.originalname);
      const fileExtension = img.originalname.split('.').pop().toLowerCase();
      if (['jpg', 'png', 'jpeg', 'webp'].includes(fileExtension)) {
        console.log("Image", `${process.env.URLLIVE}/${img.filename}`);
        imageArray.push(`${process.env.URLLIVE}/${img.filename}`);
      } else if (fileExtension === 'mp4') {
        console.log("Video", `${process.env.URLLIVE}/${img.filename}`);
        videoArray.push(`${process.env.URLLIVE}/${img.filename}`);
      } else {
        console.log("Unsupported file type:", img.originalname);
      }
    });
    try {
      return res.status(200).send({
        message: "Image Added Successfully",
        status: true,
        data: {
          imageArray: imageArray,
          videoArray: videoArray
        },
      });

    } catch (err) {
      console.log("error", err);
      return res.status(400).send({
        message: "Please Check Admin",
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
  getDashboard: async (req, res) => {
    try {

      let customer = await customerModel.find({});
      let order = await orderModel.find({});
      let datas = await Promise.all([customer, order]).then((values) => {
        return values
      });
      if (!datas) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "Get All product",
          status: true,
          data: [{ totalRecords: 0, title: 'Sales', icon: 'point_of_sale', rate: 0, ratio: 0 },
          { totalRecords: datas[1].length, title: 'Orders', icon: 'local_mall', rate: 0, ratio: 0 },
          { totalRecords: 0, title: 'Visitor', icon: 'person', rate: 0, ratio: 0 },
          { totalRecords: datas[0].length, title: 'Customers', icon: 'groups', rate: 0, ratio: 0 }]
        });
      }
    } catch (error) {
      console.log(error)
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